import nodemailer from 'nodemailer';
import {
  generateOTPTemplate,
  generatePasswordChangedTemplate,
  generateWelcomeTemplate,
  generateLoginSuccessTemplate,
  generateEmailVerificationTemplate
} from '../utils/emailTemplates/index.js';

const smtpHost = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const defaultFrom = process.env.SMTP_FROM || 'Blood Donor Management System <blood.donor2026@gmail.com>';

console.log(`[emailService] Using SMTP host=${smtpHost} port=${smtpPort}`);

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined,
  requireTLS: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
    minVersion: 'TLSv1.2'
  }
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP transporter ready');
  } catch (error) {
    console.error('❌ SMTP Verify Error');
    console.error(error);
  }
};

verifyTransporter();

export const sendMail = async ({ to, subject, html, from = defaultFrom }) => {
  if (!to || !subject || !html) {
    throw new Error('Email destination, subject, and HTML body are required');
  }

  const mailOptions = {
    from,
    to,
    subject,
    html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('[emailService] Message sent:', info.messageId);
  return info;
};

export const sendPasswordResetOtp = async ({ to, name, otp, expiryMinutes = 10 }) => {
  const html = generateOTPTemplate({ name, otp, expiryMinutes });
  return sendMail({
    to,
    subject: 'Password Reset OTP',
    html
  });
};

export const sendPasswordResetSuccess = async ({ to, name, changedAt }) => {
  const html = generatePasswordChangedTemplate({ name, changedAt });
  return sendMail({
    to,
    subject: 'Password Changed Successfully',
    html
  });
};

export const sendWelcomeEmail = async ({ to, name, email }) => {
  const html = generateWelcomeTemplate({ name, email });
  return sendMail({
    to,
    subject: 'Welcome to Blood Donor Management System',
    html
  });
};

export const sendVerificationEmail = async ({ to, name, verificationUrl }) => {
  const html = generateEmailVerificationTemplate({ name, verificationUrl });
  return sendMail({
    to,
    subject: 'Verify Your Email',
    html
  });
};

export const sendLoginSuccessEmail = async ({ to, name, loginTime, browser, device }) => {
  const html = generateLoginSuccessTemplate({ name, loginTime, browser, device });
  return sendMail({
    to,
    subject: 'Login Successful',
    html
  });
};

console.log({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  user: smtpUser,
  passExists: !!smtpPass
});