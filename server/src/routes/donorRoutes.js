import express from 'express';
import { createDonor, deleteDonor, getDonors, updateDonor } from '../controllers/donorController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getDonors);
router.post('/', protect, createDonor);
router.put('/:id', protect, updateDonor);
router.delete('/:id', protect, adminOnly, deleteDonor);

export default router;
