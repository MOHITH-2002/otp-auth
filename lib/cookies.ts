import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'user_session'

export function setSessionCookie(userId: string) {
  cookies().set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 1 week
    path: '/',
  })
}

export function getSessionCookie() {
  return cookies().get(SESSION_COOKIE_NAME)?.value
}

export function removeSessionCookie() {
  cookies().delete(SESSION_COOKIE_NAME)
}

