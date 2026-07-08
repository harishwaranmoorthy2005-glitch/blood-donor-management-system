import express from 'express';
import { createEmergencyRequest, getEmergencyRequests, updateEmergencyRequest, deleteEmergencyRequest } from '../controllers/emergencyController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', protect, createEmergencyRequest);
router.get('/', protect, getEmergencyRequests);
router.put('/:id', protect, updateEmergencyRequest);
router.patch('/:id', protect, updateEmergencyRequest);
router.delete('/:id', protect, deleteEmergencyRequest);

export default router;
