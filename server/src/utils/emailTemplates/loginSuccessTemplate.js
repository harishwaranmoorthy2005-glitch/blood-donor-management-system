import { buildBaseEmail, escapeHtml } from './baseTemplate.js';

export const generateLoginSuccessTemplate = ({ name, loginTime, browser, device }) => {
  const safeName = escapeHtml(name || 'there');
  const safeLoginTime = escapeHtml(loginTime || 'recently');
  const safeBrowser = escapeHtml(browser || 'Unknown browser');
  const safeDevice = escapeHtml(device || 'Unknown device');

  return buildBaseEmail({
    title: 'Login Successful',
    preheader: 'A new sign-in was recorded for your account.',
    content: `
      <p style="margin:0 0 12px 0;font-size:16px;color:#111827;">Hello ${safeName},</p>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#6B7280;">We detected a successful sign-in to your Blood Donor Management System account.</p>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:18px;padding:16px 18px;margin:16px 0 0 0;">
        <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#EF4444;">Login details</p>
        <p style="margin:0 0 6px 0;font-size:14px;color:#111827;"><strong>Login Time:</strong> ${safeLoginTime}</p>
        <p style="margin:0 0 6px 0;font-size:14px;color:#111827;"><strong>Browser:</strong> ${safeBrowser}</p>
        <p style="margin:0;font-size:14px;color:#111827;"><strong>Device:</strong> ${safeDevice}</p>
      </div>
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:14px;padding:14px 16px;margin:16px 0 0 0;">
        <p style="margin:0;font-size:13px;color:#DC2626;font-weight:700;">Security warning</p>
        <p style="margin:6px 0 0 0;font-size:13px;color:#6B7280;">If this wasn’t you, please change your password immediately and contact support.</p>
      </div>
    `
  });
};
