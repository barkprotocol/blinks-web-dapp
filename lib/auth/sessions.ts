import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.JWT_SECRET_KEY
if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not set')
}

const key = new TextEncoder().encode(secretKey)

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, key)
    return payload as { userId: string }
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export function getTokenFromCookies(): string | undefined {
  return cookies().get('token')?.value
}

export async function signToken(payload: { userId: string }): Promise<string> {
  const { SignJWT } = await import('jose')
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key)

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  })

  return token
}