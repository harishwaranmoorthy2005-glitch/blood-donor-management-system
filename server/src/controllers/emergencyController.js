import EmergencyRequest from '../models/EmergencyRequest.js';
import Donor from '../models/Donor.js';
import { addNotificationJob } from '../jobs/notificationQueue.js';
import { sendResponse } from '../utils/response.js';

export const createEmergencyRequest = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      phoneNumber: req.body.phoneNumber ? String(req.body.phoneNumber).trim() : '',
      requestedBy: req.user._id
    };
    const request = await EmergencyRequest.create(payload);
    const matchedDonors = await Donor.find({ bloodGroup: request.bloodGroup.toUpperCase(), availability: true }).limit(10);
    request.matchedDonors = matchedDonors.map((d) => d._id);
    request.status = 'active';
    request.history.push({ message: `Matched ${matchedDonors.length} donors` });
    await request.save();

    for (const donor of matchedDonors) {
      await addNotificationJob({
        userId: donor.user,
        title: 'Emergency blood request',
        message: `A ${request.bloodGroup} blood request is needed at ${request.hospital}`,
        email: req.user.email,
        type: 'emergency'
      });
    }

    return sendResponse(res, 201, true, 'Emergency request created', request);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const getEmergencyRequests = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().populate('requestedBy', 'name email').populate('matchedDonors', 'name phone city');
    return sendResponse(res, 200, true, 'Requests fetched', requests);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const updateEmergencyRequest = async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);
    if (!request) return sendResponse(res, 404, false, 'Request not found');

    if (String(request.requestedBy) !== String(req.user._id)) {
      return sendResponse(res, 403, false, 'You can only update your own emergency request');
    }

    const updatePayload = { ...req.body };
    if (updatePayload.phoneNumber !== undefined) {
      updatePayload.phoneNumber = String(updatePayload.phoneNumber).trim();
    }
    if (updatePayload.bloodGroup !== undefined) {
      updatePayload.bloodGroup = String(updatePayload.bloodGroup).toUpperCase();
    }

    const updatedRequest = await EmergencyRequest.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    return sendResponse(res, 200, true, 'Request updated', updatedRequest);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

export const deleteEmergencyRequest = async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);
    if (!request) {
      return sendResponse(res, 404, false, 'Request not found');
    }

    if (String(request.requestedBy) !== String(req.user._id)) {
      return sendResponse(res, 403, false, 'You can only delete your own emergency request');
    }

    await request.deleteOne();
    return sendResponse(res, 200, true, 'Emergency request deleted');
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
