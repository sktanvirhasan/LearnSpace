import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function GET(request: NextRequest) {
  const jwt = request.cookies.get('jwt')?.value;

  if (!jwt) {
    return NextResponse.json(
      { error: 'No token found' },
      { status: 401 }
    );
  }

  const strapiResponse = await fetch(`${STRAPI_URL}/api/users/me?populate=role`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await strapiResponse.json();

  if (!strapiResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: strapiResponse.status }
    );
  }

  return NextResponse.json({ user: data });
}