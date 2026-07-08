import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('[auth-debug] protect middleware authHeader', authHeader ? 'present' : 'missing');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, false, 'Not authorized');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[auth-debug] token verified', decoded);
    const user = await User.findById(decoded.id).select('-password');
    console.log('[auth-debug] protect found user', !!user, user?.email);

    if (!user) {
      return sendResponse(res, 401, false, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.warn('[auth-debug] protect token failed', error.message);
    return sendResponse(res, 401, false, 'Token failed');
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return sendResponse(res, 403, false, 'Admin access only');
  }
  next();
};
