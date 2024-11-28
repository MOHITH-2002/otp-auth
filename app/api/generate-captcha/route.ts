import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  const captchaText = crypto.randomBytes(3).toString('hex').toUpperCase()
  
  return NextResponse.json({ captchaText })
}

