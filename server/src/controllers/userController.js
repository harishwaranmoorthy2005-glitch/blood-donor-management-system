import Donor from '../models/Donor.js';
import User from '../models/User.js';
import { sendResponse } from '../utils/response.js';

export const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.dateOfBirth === '') {
      updates.dateOfBirth = null;
    }
    if (updates.dob === '') {
      updates.dob = null;
    }
    if (updates.dob && !updates.dateOfBirth) {
      updates.dateOfBirth = updates.dob;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return sendResponse(res, 404, false, 'User not found');

    await Donor.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          user: req.user._id,
          name: updates.name || user.name,
          bloodGroup: updates.bloodGroup || user.bloodGroup,
          department: updates.department || user.department,
          year: updates.year || user.year,
          city: updates.city || user.city,
          phone: updates.phone || user.phone,
          dateOfBirth: user.dateOfBirth,
          availability: updates.availability ?? user.availability,
          lastDonationDate: updates.lastDonationDate || user.lastDonationDate,
          profileImage: updates.profileImage || user.profileImage
        }
      },
      { upsert: true, new: true }
    );

    return sendResponse(res, 200, true, 'Profile updated', { user });
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

