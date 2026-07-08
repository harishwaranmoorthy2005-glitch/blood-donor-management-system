import express from 'express';
import { sendMail } from '../services/emailService.js';

const router = express.Router();

router.get('/email', async (req, res) => {
  try {
    const sent = await sendMail({
      to: 'blood.donor2026@gmail.com',
      subject: 'Debug Email Test',
      html: '<h1>Debug Email Test</h1><p>This is a direct Nodemailer test.</p>'
    });

    res.json({ success: sent, message: sent ? 'Direct email test completed' : 'Direct email test failed' });
  } catch (error) {
    console.error('[debug] direct email test failed', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
