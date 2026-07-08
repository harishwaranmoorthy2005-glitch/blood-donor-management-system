import { buildBaseEmail, escapeHtml } from './baseTemplate.js';

export const generateEmailVerificationTemplate = ({ name, verificationUrl }) => {
  const safeName = escapeHtml(name || 'there');
  const safeVerificationUrl = escapeHtml(verificationUrl || '');

  return buildBaseEmail({
    title: 'Verify Your Email',
    preheader: 'Complete your email verification to secure your account.',
    content: `
      <p style="margin:0 0 12px 0;font-size:16px;color:#111827;">Hello ${safeName},</p>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#6B7280;">Thank you for joining Blood Donor Management System. Please verify your email address to activate your account and keep your donor profile secure.</p>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:18px;padding:16px 18px;margin:16px 0 0 0;">
        <p style="margin:0;font-size:14px;color:#111827;">Use the verification link provided in this message to activate your account and continue.</p>
      </div>
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:14px;padding:14px 16px;margin:16px 0 0 0;">
        <p style="margin:0;font-size:13px;color:#DC2626;font-weight:700;">Security note</p>
        <p style="margin:6px 0 0 0;font-size:13px;color:#6B7280;">If you did not create this account, you can safely ignore this email.</p>
      </div>
    `
  });
};
