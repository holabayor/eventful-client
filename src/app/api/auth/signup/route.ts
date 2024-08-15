import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) {
    return NextResponse.json({ message: 'Signup successful', data });
  } else {
    return NextResponse.json(
      { message: data.message, error: data.error },
      { status: res.status }
    );
  }
}
