import 'dotenv/config.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false }
});

const info = await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: 'blood.donor2026@gmail.com',
  subject: 'Nodemailer debug',
  html: '<h1>Debug</h1>'
});

console.log(JSON.stringify({
  accepted: info.accepted,
  rejected: info.rejected,
  response: info.response,
  envelope: info.envelope,
  messageId: info.messageId
}, null, 2));
