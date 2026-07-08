import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBaseEmail } from './baseTemplate.js';
import { generateWelcomeTemplate } from './welcomeTemplate.js';
import { generateLoginSuccessTemplate } from './loginSuccessTemplate.js';
import { generateOTPTemplate } from './otpTemplate.js';
import { generatePasswordChangedTemplate } from './passwordChangedTemplate.js';
import { generateEmailVerificationTemplate } from './emailVerificationTemplate.js';

test('buildBaseEmail renders the shared informational layout without any button', () => {
  const html = buildBaseEmail({
    title: 'Test',
    preheader: 'Preview',
    content: '<p>Body</p>'
  });

  assert.match(html, /Test/);
  assert.match(html, /Preview/);
  assert.doesNotMatch(html, /display:inline-block;background:linear-gradient/);
  assert.doesNotMatch(html, /Go to Dashboard/);
  assert.doesNotMatch(html, /Reset Password/);
});

test('welcome template keeps its content and uses the shared layout', () => {
  const html = generateWelcomeTemplate({ name: 'Ada', email: 'ada@example.com' });
  assert.match(html, /Welcome to Blood Donor Management System/);
  assert.match(html, /Account details/);
  assert.doesNotMatch(html, /Reset Password/);
});

test('shared base email uses a centered footer without any CTA button', () => {
  const html = buildBaseEmail({ title: 'Test', preheader: 'Preview', content: '<p>Body</p>' });
  assert.match(html, /display:block;text-align:center;margin:0 auto;width:100%;/);
  assert.match(html, /This message was sent from the/);
  assert.match(html, /blood\.donor2026@gmail\.com/);
  assert.doesNotMatch(html, /display:inline-block;background:linear-gradient/);
});

test('login success template uses no CTA button and includes security details', () => {
  const html = generateLoginSuccessTemplate({ name: 'Ada', loginTime: 'Now', browser: 'Chrome', device: 'Desktop' });
  assert.match(html, /Login Successful/);
  assert.match(html, /Security warning/);
  assert.doesNotMatch(html, /display:inline-block;background:linear-gradient/);
  assert.doesNotMatch(html, /Reset Password/);
});

test('otp template keeps its OTP content and no button', () => {
  const html = generateOTPTemplate({ name: 'Ada', otp: '123456', expiryMinutes: 5 });
  assert.match(html, /Password Reset OTP/);
  assert.match(html, /Security Code/);
  assert.doesNotMatch(html, /Reset Password/);
  assert.doesNotMatch(html, /Login Now/);
});

test('password changed template keeps its success content and no button', () => {
  const html = generatePasswordChangedTemplate({ name: 'Ada', changedAt: 'Now' });
  assert.match(html, /Password Changed Successfully/);
  assert.match(html, /Password changed successfully/);
  assert.doesNotMatch(html, /Reset Password/);
  assert.doesNotMatch(html, /Login Now/);
});

test('email verification template keeps the verification message and no button', () => {
  const html = generateEmailVerificationTemplate({ name: 'Ada', verificationUrl: 'https://example.com/verify' });
  assert.match(html, /Verify Your Email/);
  assert.match(html, /verification link/);
  assert.doesNotMatch(html, /Verify Email/);
});
