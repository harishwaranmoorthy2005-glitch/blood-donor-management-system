import Donor from '../models/Donor.js';
import User from '../models/User.js';
import redis from '../config/redis.js';
import { sendResponse } from '../utils/response.js';

export const createDonor = async (req, res) => {
  try {
    const user = req.user;
    const donor = await Donor.create({
      user: user._id,
      name: req.body.name || user.name,
      bloodGroup: req.body.bloodGroup,
      department: req.body.department || user.department,
      year: req.body.year || user.year,
      city: req.body.city || user.city,
      phone: req.body.phone || user.phone,
      availability: req.body.availability ?? true,
      lastDonationDate: req.body.lastDonationDate || user.lastDonationDate,
      profileImage: req.body.profileImage || user.profileImage
    });

    await User.findByIdAndUpdate(user._id, {
      bloodGroup: donor.bloodGroup,
      department: donor.department,
      year: donor.year,
      city: donor.city,
      phone: donor.phone,
      availability: donor.availability,
      lastDonationDate: donor.lastDonationDate,
      profileImage: donor.profileImage
    });

    await redis.del('donors:all');
    return sendResponse(res, 201, true, 'Donor created', donor);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, location, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const cacheKey = `donors:${bloodGroup || 'all'}:${location || 'all'}:${page}:${limit}`;
    const cached = await redis.get(cacheKey);

    if (cached) return sendResponse(res, 200, true, 'Donors fetched from cache', JSON.parse(cached));

    const filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup.toUpperCase();
    if (location) filter.city = new RegExp(location, 'i');

    const donors = await Donor.find(filter)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Donor.countDocuments(filter);
    const result = { donors, total, page: Number(page), pages: Math.ceil(total / Number(limit)) };

    await redis.set(cacheKey, JSON.stringify(result), 'EX', 120);
    return sendResponse(res, 200, true, 'Donors fetched', result);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return sendResponse(res, 404, false, 'Donor not found');
    await redis.del('donors:all');
    return sendResponse(res, 200, true, 'Donor updated', donor);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return sendResponse(res, 404, false, 'Donor not found');
    await redis.del('donors:all');
    return sendResponse(res, 200, true, 'Donor deleted');
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
