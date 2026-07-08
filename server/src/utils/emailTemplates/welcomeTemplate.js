import { buildBaseEmail, escapeHtml } from './baseTemplate.js';

export const generateWelcomeTemplate = ({ name, email }) => {
  const safeName = escapeHtml(name || 'there');
  const safeEmail = escapeHtml(email || 'your account');

  return buildBaseEmail({
    title: 'Welcome to Blood Donor Management System',
    preheader: 'Welcome aboard. Your donor account is ready.',
    content: `
      <p style="margin:0 0 12px 0;font-size:16px;color:#111827;">Hello ${safeName},</p>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#6B7280;">Welcome to Blood Donor Management System. Your account is ready, and you can now sign in to manage donor requests, emergencies, and notifications from one secure dashboard.</p>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:18px;padding:16px 18px;margin:16px 0 0 0;">
        <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#EF4444;">Account details</p>
        <p style="margin:0;font-size:14px;color:#111827;"><strong>Email:</strong> ${safeEmail}</p>
      </div>
      <p style="margin:12px 0 0 0;font-size:15px;line-height:1.7;color:#6B7280;">Every donation can save a life. We’re glad to have you with us.</p>
    `
  });
};
