import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { accessToken } = session;

  const body = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const response = await res.json();

  if (res.ok) {
    return NextResponse.json({
      message: 'Event created successfully',
      response,
    });
  } else {
    return NextResponse.json(
      { message: 'Error creating event', error: response.message },
      { status: res.status }
    );
  }
}
