const PRIMARY = '#DC2626';
const SECONDARY = '#EF4444';
const ACCENT = '#F97316';
const BACKGROUND = '#F9FAFB';
const CARD = '#FFFFFF';
const TEXT = '#111827';
const MUTED = '#6B7280';

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const renderLayout = ({ title, preheader, content, actionUrl }) => {
  const appUrl = process.env.CLIENT_URL || 'https://blood-donor.example.com';

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light only" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:${BACKGROUND};font-family:Arial,Helvetica,sans-serif;color:${TEXT};">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;">${escapeHtml(preheader)}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${BACKGROUND};padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;margin:0 auto;">
              <tr>
                <td style="padding:24px 16px 16px;">
                  <div style="background:${CARD};border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);border:1px solid #F3F4F6;">
                    <div style="background:linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 45%, ${ACCENT} 100%);padding:28px 24px;text-align:center;">
                      <div style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,0.18);color:#fff;font-size:24px;font-weight:700;letter-spacing:0.5px;">BD</div>
                      <h1 style="margin:12px 0 6px;color:#fff;font-size:28px;line-height:1.2;font-weight:700;">Blood Donor Management System</h1>
                      <p style="margin:0;color:rgba(255,255,255,0.92);font-size:14px;">Secure, compassionate, and reliable donor coordination</p>
                    </div>
                    <div style="padding:32px 24px 24px;">
                      ${content}
                      ${actionUrl ? `<div style="text-align:center;margin-top:28px;"><a href="${escapeHtml(actionUrl)}" style="display:inline-block;background:linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%);color:#fff;text-decoration:none;padding:13px 24px;border-radius:999px;font-weight:700;font-size:15px;">Continue</a></div>` : ''}
                    </div>
                    <div style="padding:0 24px 24px;">
                      <div style="max-width:420px;margin:0 auto 12px;text-align:center;">
                        <div style="display:inline-block;width:100%;max-width:220px;height:1px;background:#E5E7EB;margin:0 auto 12px;"></div>
                        <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">This message was sent from the Blood Donor Management System.</p>
                      </div>
                      <div style="border-top:1px solid #E5E7EB;padding-top:16px;color:${MUTED};font-size:12px;line-height:1.7;text-align:center;">
                        <p style="margin:0;">Need help? Contact <a href="mailto:blood.donor2026@gmail.com" style="color:${PRIMARY};text-decoration:none;">blood.donor2026@gmail.com</a></p>
                        <p style="margin:8px 0 0;">This is an automated email. Please do not reply.</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};

export const generateOTPTemplate = ({ name, otp, expiryMinutes = 10 }) => {
  const safeName = escapeHtml(name || 'there');
  const safeOtp = escapeHtml(otp);
  return renderLayout({
    title: 'Password Reset OTP',
    preheader: 'Use this one-time password to reset your account password.',
    content: `
      <p style="margin:0 0 12px;font-size:16px;color:${TEXT};">Hello ${safeName},</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:${MUTED};">We received a request to reset your password for your Blood Donor Management System account. Use the secure one-time password below to continue.</p>
      <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:18px;padding:20px 24px;text-align:center;margin:20px 0;">
        <p style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${ACCENT};">One-Time Password</p>
        <div style="font-size:36px;letter-spacing:8px;font-weight:800;color:${PRIMARY};line-height:1.2;">${safeOtp}</div>
      </div>
      <p style="margin:0 0 10px;font-size:15px;line-height:1.7;color:${MUTED};">This code expires in <strong>${expiryMinutes} minutes</strong>.</p>
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:14px;padding:14px 16px;margin-top:16px;">
        <p style="margin:0;font-size:13px;color:${PRIMARY};font-weight:700;">Security warning</p>
        <p style="margin:6px 0 0;font-size:13px;color:${MUTED};">Do not share this OTP with anyone. If you did not request this email, please ignore it and keep your account secure.</p>
      </div>
    `,
    actionUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/forgot-password` : undefined
  });
};

export const generateWelcomeTemplate = ({ name, email }) => {
  const safeName = escapeHtml(name || 'there');
  const safeEmail = escapeHtml(email || 'your account');
  return renderLayout({
    title: 'Welcome to Blood Donor Management System',
    preheader: 'Welcome aboard. Your donor account is ready.',
    content: `
      <p style="margin:0 0 12px;font-size:16px;color:${TEXT};">Hello ${safeName},</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:${MUTED};">Welcome to Blood Donor Management System. Your account has been created successfully, and you can now sign in to manage donors, emergencies, and notifications from one secure dashboard.</p>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:18px;padding:18px 20px;margin:20px 0;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${ACCENT};">Account Details</p>
        <p style="margin:0;font-size:14px;color:${TEXT};"><strong>Email:</strong> ${safeEmail}</p>
      </div>
      <p style="margin:0 0 10px;font-size:15px;line-height:1.7;color:${MUTED};">Start exploring the platform and help save lives by staying connected with the donor community.</p>
    `,
    actionUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/login` : undefined
  });
};

export const generatePasswordResetTemplate = ({ name }) => {
  const safeName = escapeHtml(name || 'there');
  return renderLayout({
    title: 'Password Reset Successful',
    preheader: 'Your password was updated successfully.',
    content: `
      <p style="margin:0 0 12px;font-size:16px;color:${TEXT};">Hello ${safeName},</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:${MUTED};">Your password has been updated successfully. You can now sign in with your new password and continue using Blood Donor Management System.</p>
      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:18px;padding:18px 20px;margin:20px 0;">
        <p style="margin:0;font-size:14px;color:#065F46;font-weight:700;">✅ Password reset completed</p>
        <p style="margin:6px 0 0;font-size:14px;color:${MUTED};">If you did not make this change, please contact support immediately.</p>
      </div>
    `,
    actionUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/login` : undefined
  });
};
