import User from '../models/User.js';
import Donor from '../models/Donor.js';
import EmergencyRequest from '../models/EmergencyRequest.js';
import { sendResponse } from '../utils/response.js';

export const buildPublicStatsPayload = ({ totalUsers, totalDonors, bloodRequests, emergencyRequests }) => ({
  totalUsers,
  totalDonors,
  bloodRequests,
  emergencyRequests
});

export const getPublicStats = async (req, res) => {
  try {
    const [totalUsers, totalDonors, bloodRequests, emergencyRequests] = await Promise.all([
      User.countDocuments({ role: { $ne: 'admin' } }),
      Donor.countDocuments(),
      EmergencyRequest.countDocuments({ status: { $in: ['pending', 'active'] } }),
      EmergencyRequest.countDocuments({ status: 'active' })
    ]);

    return sendResponse(res, 200, true, 'Landing statistics fetched', buildPublicStatsPayload({
      totalUsers,
      totalDonors,
      bloodRequests,
      emergencyRequests
    }));
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
