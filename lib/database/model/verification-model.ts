import mongoose, { Schema } from 'mongoose';

const tokenSchema = new Schema({
  email: { type: String, required: true }, // Email is required
  token: { type: String, unique: true, required: true }, // Unique 6-digit OTP
  expires: { type: Date, required: true }, // Expiration timestamp
});

// Create or use the existing VerificationToken model
const VerificationToken = mongoose.models.VerificationToken || mongoose.model('VerificationToken', tokenSchema);

export default VerificationToken;
