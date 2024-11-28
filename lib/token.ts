"use server"

import VerificationToken from './database/model/verification-model';

// Function to generate a 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit number
};


const deleteExpiredTokens = async () => {
  try {
    const now = new Date();
    await VerificationToken.deleteMany({ expires: { $lt: now } });
    console.log('Expired tokens deleted successfully');
  } catch (error) {
    console.error('Error deleting expired tokens:', error);
  }
};

export const generateVerificationToken = async (email: string) => {
  try {
    // Cleanup expired tokens
    // await deleteExpiredTokens();

    const otp = generateOTP();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // Set expiry to 5 minutes

    const existingToken = await VerificationToken.findOne({ email });

    if (existingToken) {
      await VerificationToken.deleteOne({ email: existingToken.email });
    }

    const verificationToken = await VerificationToken.create({
      email,
      token: otp,
      expires,
    });
    
    
    return verificationToken;
  } catch (error) {
    console.error('Error generating verification token:', error);
    throw new Error('Failed to generate verification token');
  }
};
