import { NextRequest, NextResponse } from 'next/server';
import type { AuthResponse, RegisterCredentials } from '@/lib/types/auth';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function POST(request: NextRequest) {
  const body: RegisterCredentials = await request.json();

  const strapiResponse = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await strapiResponse.json();

  if (!strapiResponse.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Registration failed' },
      { status: strapiResponse.status }
    );
  }

  const { jwt, user }: AuthResponse = data;

  const response = NextResponse.json({ user });

  response.cookies.set('jwt', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}