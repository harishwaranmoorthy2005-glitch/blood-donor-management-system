import { sendResponse } from '../utils/response.js';






const isValidEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;
  if (!email || !isValidEmail(email)) {
    return sendResponse(res, 400, false, 'Please provide a valid email address');
  }
  req.body.email = email.trim().toLowerCase();
  next();
};

export const validateVerifyOtp = (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !isValidEmail(email)) {
    return sendResponse(res, 400, false, 'Please provide a valid email address');
  }
  if (!otp || !/^\d{6}$/.test(otp)) {
    return sendResponse(res, 400, false, 'OTP must be a 6-digit code');
  }
  req.body.email = email.trim().toLowerCase();
  next();
};

export const validateResendOtp = (req, res, next) => {
  const { email } = req.body;
  if (!email || !isValidEmail(email)) {
    return sendResponse(res, 400, false, 'Please provide a valid email address');
  }
  req.body.email = email.trim().toLowerCase();
  next();
};

export const validateResetPassword = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !isValidEmail(email)) {
    return sendResponse(res, 400, false, 'Please provide a valid email address');
  }
  if (!password || password.length < 8) {
    return sendResponse(res, 400, false, 'Password must be at least 8 characters long');
  }
  if (password !== confirmPassword) {
    return sendResponse(res, 400, false, 'Passwords do not match');
  }
  req.body.email = email.trim().toLowerCase();
  next();
};
