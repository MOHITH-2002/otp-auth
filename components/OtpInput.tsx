'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Input } from '@/components/ui/input'

interface OtpInputProps {
  length: number
  onComplete: (otp: string) => void
}

export default function OtpInput({ length, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const setRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={setRef(index)}
          className="w-12 h-12 text-center text-2xl"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}

