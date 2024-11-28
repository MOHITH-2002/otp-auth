'use client'

import React, { useState, useEffect } from 'react'

interface CaptchaProps {
  onChange: (value: string) => void
}

export function Captcha({ onChange }: CaptchaProps) {
  const [captcha, setCaptcha] = useState('')
  const [userInput, setUserInput] = useState('')

  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString().slice(2, 8)
    setCaptcha(newCaptcha)
    onChange('')
    setUserInput('')
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(value)
    onChange(value)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div 
          className="bg-gray-200 p-4 text-2xl font-mono tracking-widest text-gray-700"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          {captcha}
        </div>
        <button 
          type="button"
          onClick={generateCaptcha}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          ↻
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter CAPTCHA"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

