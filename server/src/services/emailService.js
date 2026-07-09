// mailService.js
import axios from "axios";

import {
  generateOTPTemplate,
  generatePasswordChangedTemplate,
  generateWelcomeTemplate,
  generateLoginSuccessTemplate,
  generateEmailVerificationTemplate,
} from "../utils/emailTemplates/index.js";

const API_URL = "https://api.brevo.com/v3/smtp/email";

const apiKey = process.env.BREVO_API_KEY;

const sender = {
  name: process.env.BREVO_SENDER_NAME || "Blood Donor Management System",
  email: process.env.BREVO_SENDER_EMAIL || "blood.donor2026@gmail.com",
};

export const sendMail = async ({ to, subject, html }) => {
  try {
    const res = await axios.post(
      API_URL,
      {
        sender,
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Email sent:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Brevo API Error");
    console.error(err.response?.data || err.message);
    throw err;
  }
};

export const sendPasswordResetOtp = ({to,name,otp,expiryMinutes=10}) =>
  sendMail({
    to,
    subject:"Password Reset OTP",
    html:generateOTPTemplate({name,otp,expiryMinutes})
  });

export const sendPasswordResetSuccess = ({to,name,changedAt}) =>
  sendMail({
    to,
    subject:"Password Changed Successfully",
    html:generatePasswordChangedTemplate({name,changedAt})
  });

export const sendWelcomeEmail = ({to,name,email}) =>
  sendMail({
    to,
    subject:"Welcome to Blood Donor Management System",
    html:generateWelcomeTemplate({name,email})
  });

export const sendVerificationEmail = ({to,name,verificationUrl}) =>
  sendMail({
    to,
    subject:"Verify Your Email",
    html:generateEmailVerificationTemplate({name,verificationUrl})
  });

export const sendLoginSuccessEmail = ({to,name,loginTime,browser,device}) =>
  sendMail({
    to,
    subject:"Login Successful",
    html:generateLoginSuccessTemplate({name,loginTime,browser,device})
  });
