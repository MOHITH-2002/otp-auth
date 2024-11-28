'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import OtpInput from '@/components/OtpInput'

export default function OTPPage(params: any) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleComplete = (value: string) => {
    setOtp(value)
  }
  console.log();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 6) {
      try {
        const response = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp:otp, userId:params.params.id }),
        })

        if (response.ok) {
          router.push('/dashboard')
        } else {
          setError('Invalid OTP. Please try again.')
        }
      } catch (error) {
        setError('An error occurred. Please try again.')
      }
    } else {
      setError('Please enter a valid 6-digit OTP')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          A 6-digit OTP has been sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <OtpInput length={6} onComplete={handleComplete} />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  )
}

