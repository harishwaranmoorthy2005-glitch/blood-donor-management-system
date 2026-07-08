import mongoose from 'mongoose';

const emergencyRequestSchema = new mongoose.Schema(
  {
    hospital: { type: String, required: true },
    patient: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, uppercase: true, index: true },
    units: { type: Number, required: true, min: 1 },
    location: { type: String, required: true },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'high' },
    status: { type: String, enum: ['pending', 'active', 'fulfilled'], default: 'pending', index: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchedDonors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }],
    history: [{ message: String, createdAt: { type: Date, default: Date.now } }]
  },
  { timestamps: true }
);

const EmergencyRequest = mongoose.model('EmergencyRequest', emergencyRequestSchema);
export default EmergencyRequest;
