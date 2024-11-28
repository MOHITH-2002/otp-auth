'use client'
import { useState } from 'react'
import { createCanvas } from 'canvas'

export function generateCaptcha() {
  const canvas = createCanvas(150, 50)
  const ctx = canvas.getContext('2d')

  // Generate random string
  const captchaText = Math.random().toString(36).substring(2, 8).toUpperCase()

  // Set background
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set text style
  ctx.font = 'bold 30px Arial'
  ctx.fillStyle = '#333'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // Add noise
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
  }

  // Draw text
  ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2)

  return { image: canvas.toDataURL(), text: captchaText }
}

export default function CaptchaImage() {
  const [captcha] = useState(generateCaptcha())

  return (
    <div>
      <img src={captcha.image} alt="CAPTCHA" className="mb-2" />
      <input type="hidden" name="captchaText" value={captcha.text} />
    </div>
  )
}

