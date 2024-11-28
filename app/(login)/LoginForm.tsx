'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from './actions'

interface LoginFormProps {
  captchaText: string
}

export default function LoginForm({ captchaText }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await login(email, captcha, captchaText)
    if (result.success) {
      // console.log();
      
      router.push(result.user?.id)
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="captcha">CAPTCHA</Label>
        <div className="relative overflow-hidden rounded-md mb-2">
          <div 
            className="h-16 w-full"
            style={{
              background: 'linear-gradient(135deg, #ffcdd2 0%, #b2ebf2 100%)',
              position: 'relative'
            }}
          >
            {/* Wavy lines */}
            <svg
              width="100%"
              height="100%"
              className="absolute inset-0"
              style={{ opacity: 0.4 }}
            >
              <path
                d="M0 20 Q 20 40, 40 20 T 80 20 T 120 20 T 160 20 T 200 20"
                fill="none"
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.2"
                transform="translate(0, 0)"
              />
              <path
                d="M0 40 Q 20 60, 40 40 T 80 40 T 120 40 T 160 40 T 200 40"
                fill="none"
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.2"
                transform="translate(0, 0)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="font-mono text-2xl tracking-[0.25em] font-bold text-gray-800"
                style={{
                  letterSpacing: '0.25em',
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
                }}
              >
                {captchaText}
              </span>
            </div>
          </div>
        </div>
        <Input
          id="captcha"
          name="captcha"
          type="text"
          required
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className="mt-1"
          placeholder="Enter the CAPTCHA text"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}

