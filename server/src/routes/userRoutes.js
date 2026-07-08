import express from 'express';
import { protect } from '../middlewares/auth.js';
import { updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);

export default router;
