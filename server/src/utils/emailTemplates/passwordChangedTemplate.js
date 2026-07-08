import { buildBaseEmail, escapeHtml } from './baseTemplate.js';

export const generatePasswordChangedTemplate = ({ name, changedAt }) => {
  const safeName = escapeHtml(name || 'there');
  const safeChangedAt = escapeHtml(changedAt || 'recently');

  return buildBaseEmail({
    title: 'Password Changed Successfully',
    preheader: 'Your password was changed successfully.',
    content: `
      <p style="margin:0 0 12px 0;font-size:16px;color:#111827;">Hello ${safeName},</p>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#6B7280;">Your password was updated successfully on <strong>${safeChangedAt}</strong>. You can continue using your account with the new password.</p>
      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:18px;padding:16px 18px;margin:16px 0 0 0;">
        <p style="margin:0;font-size:14px;color:#065F46;font-weight:700;">✅ Password changed successfully</p>
        <p style="margin:6px 0 0 0;font-size:14px;color:#6B7280;">If you did not make this change, please contact support immediately.</p>
      </div>
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:14px;padding:14px 16px;margin:16px 0 0 0;">
        <p style="margin:0;font-size:13px;color:#DC2626;font-weight:700;">Security note</p>
        <p style="margin:6px 0 0 0;font-size:13px;color:#6B7280;">For your safety, we recommend using a strong and unique password and keeping it private.</p>
      </div>
    `
  });
};
