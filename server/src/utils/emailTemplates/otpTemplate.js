import { buildBaseEmail, escapeHtml } from './baseTemplate.js';

export const generateOTPTemplate = ({ name, otp, expiryMinutes = 10 }) => {
  const safeName = escapeHtml(name || 'there');
  const safeOtp = escapeHtml(otp);

  return buildBaseEmail({
    title: 'Password Reset OTP',
    preheader: 'Use this one-time password to reset your account password.',
    content: `
      <p style="margin:0 0 12px 0;font-size:16px;color:#111827;">Hello ${safeName},</p>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#6B7280;">We received a request to reset your password. Use the secure one-time password below to continue safely.</p>
      <div style="background:#111827;border:1px solid #1F2937;border-radius:20px;padding:24px 20px;text-align:center;margin:16px 0 0 0;">
        <p style="margin:0 0 10px 0;font-size:13px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#FCA5A5;">Security Code</p>
        <div style="font-size:36px;letter-spacing:8px;font-weight:800;color:#FECACA;line-height:1.2;">${safeOtp}</div>
      </div>
      <p style="margin:12px 0 0 0;font-size:15px;line-height:1.7;color:#6B7280;">This code expires in <strong>${expiryMinutes} minutes</strong>.</p>
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:14px;padding:14px 16px;margin:16px 0 0 0;">
        <p style="margin:0;font-size:13px;color:#DC2626;font-weight:700;">Security warning</p>
        <p style="margin:6px 0 0 0;font-size:13px;color:#6B7280;">Do not share this OTP with anyone. If you did not request this email, please ignore it and keep your account secure.</p>
      </div>
    `
  });
};
