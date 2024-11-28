import { setSessionCookie } from '@/lib/cookies'
import { connectToDb } from '@/lib/database/db'
import VerificationToken from '@/lib/database/model/verification-model'
import user from '@/lib/database/model/user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { otp, userId } = await request.json()

    // Ensure we are connected to the database
    await connectToDb()

    // Check if the user exists
    const existingUser = await user.findById(userId)
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if the OTP exists and is valid
    const verificationToken = await VerificationToken.findOne({
      email: existingUser.email,
      token: otp,
    })

    if (!verificationToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      )
    }

    // Check if the OTP has expired
    if (new Date() > verificationToken.expires) {
      return NextResponse.json(
        { success: false, error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // OTP is valid; delete it from the database
    await VerificationToken.deleteOne({ _id: verificationToken._id })

    // Set the session cookie for the user
    setSessionCookie(userId)

    // Redirect to the dashboard
    return NextResponse.json({ success: true, redirect: '/dashboard' })
  } catch (error) {
    console.error('Error validating OTP:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred during OTP validation' },
      { status: 500 }
    )
  }
}
