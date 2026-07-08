import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true, uppercase: true, index: true },
    department: { type: String, default: '' },
    year: { type: String, default: '' },
    city: { type: String, default: '', index: true },
    phone: { type: String, required: true },
    availability: { type: Boolean, default: true, index: true },
    lastDonationDate: { type: Date, default: null },
    profileImage: { type: String, default: '' }
  },
  { timestamps: true }
);

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;
