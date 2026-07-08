import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: { type: String, default: '' },
    department: { type: String, default: '' },
    year: { type: String, default: '' },
    city: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    dateOfBirth: { type: Date, default: null },
    profileImage: { type: String, default: '' },
    googleId: { type: String, default: null },
    provider: { type: String, default: 'email' },
    availability: { type: Boolean, default: true },
    lastDonationDate: { type: Date, default: null },
    resetOTP: { type: String, default: null },
    resetOTPExpiry: { type: Date, default: null },
    otpResendCount: { type: Number, default: 0 },
    otpResendAt: { type: Date, default: null }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
