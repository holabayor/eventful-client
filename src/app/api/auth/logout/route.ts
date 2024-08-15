import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (res.ok) {
    return NextResponse.json({ message: 'Logout successful', data });
  } else {
    return NextResponse.json(
      { message: data.message, error: data.error },
      { status: res.status }
    );
  }
}
