const BRAND_COLORS = {
  primary: '#DC2626',
  secondary: '#EF4444',
  accent: '#FF6B35',
  background: '#F4F5F7',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB'
};

export const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const buildBaseEmail = ({ title, preheader, content }) => {
  const supportEmail = process.env.SUPPORT_EMAIL || 'blood.donor2026@gmail.com';
  const safeTitle = escapeHtml(title || 'Blood Donor Management System');
  const safePreheader = escapeHtml(preheader || '');
  const heroTitle = safeTitle || 'Blood Donor Management System';
  const previewText = safePreheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;">${safePreheader}</div>` : '';

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light only" />
      <title>${heroTitle}</title>
    </head>
    <body style="margin:0;padding:0;background:${BRAND_COLORS.background};font-family:Arial,Helvetica,sans-serif;color:${BRAND_COLORS.text};">
      ${previewText}
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${BRAND_COLORS.background};margin:0;padding:0;border-collapse:collapse;">
        <tr>
          <td align="center" style="padding:24px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;margin:0 auto;border-collapse:collapse;">
              <tr>
                <td align="center" style="background:${BRAND_COLORS.card};border:1px solid ${BRAND_COLORS.border};border-radius:24px;overflow:hidden;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
                    <tr>
                      <td align="center" style="background:linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 44%, ${BRAND_COLORS.accent} 100%);padding:36px 24px;">
                        <div style="max-width:520px;margin:0 auto;text-align:center;">
                          <h1 style="margin:0 0 8px;color:#ffffff;font-size:28px;line-height:1.2;font-weight:700;">${heroTitle}</h1>
                          <p style="margin:0;color:rgba(255,255,255,0.92);font-size:15px;line-height:1.6;">Secure, compassionate, and reliable donor coordination</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:24px 24px 8px;">
                        ${content || ''}
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:0 24px 24px;">
                        <div style="display:block;text-align:center;margin:0 auto;width:100%;max-width:420px;">
                          <p style="margin:0 0 8px 0;text-align:center;font-size:12px;line-height:1.8;color:${BRAND_COLORS.muted};">This message was sent from the<br />Blood Donor Management System.</p>
                          <p style="margin:0 0 8px 0;text-align:center;font-size:12px;line-height:1.8;color:${BRAND_COLORS.muted};">Need help?</p>
                          <p style="margin:0 0 8px 0;text-align:center;font-size:12px;line-height:1.8;color:${BRAND_COLORS.muted};"><a href="mailto:${supportEmail}" style="color:${BRAND_COLORS.primary};text-decoration:none;">${supportEmail}</a></p>
                          <p style="margin:0;text-align:center;font-size:12px;line-height:1.8;color:${BRAND_COLORS.muted};">This is an automated email.<br />Please do not reply.</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};
