'use server';

import { connectToDb } from '@/lib/database/db';
import user from '@/lib/database/model/user';
import { sendVerificationEmail } from '@/lib/Email/mail';
import { generateVerificationToken } from '@/lib/token';
import { redirect } from 'next/navigation';

export async function login(email: string, captcha: string, expectedCaptcha: string) {
  try {
    // Connect to the database
    await connectToDb();

    if (!email || !captcha) {
      return { success: false, error: 'Email and CAPTCHA are required' };
    }

    
    if (captcha.toUpperCase() !== expectedCaptcha) {
      return { success: false, error: 'Invalid CAPTCHA' };
    }


    let existingUser = await user.findOne({ email });

    if (!existingUser) {
     
      existingUser = await user.create({ email });
    }

    
    const verificationToken = await generateVerificationToken(email);
    // console.log('Generated OTP:', verificationToken.token);

    
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    
    return { 
      success: true, 
      message: "Redirect to OTP", 
      user: { 
        email: existingUser.email, 
        id: existingUser._id 
      } 
    };
  } catch (error) {
    console.error('Error in login function:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}
