import { getSession } from 'next-auth/react';

interface ApiRequestOptions extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  requiresAuth?: boolean;
}

export const apiRequest = async (
  endpoint: string,
  options: ApiRequestOptions
) => {
  const { method, requiresAuth = false, body } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  if (requiresAuth) {
    const session = await getSession();

    if (!session || !session.accessToken) {
      throw new Error('Unauthorized: No valid session or access token found.');
    }

    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api${endpoint}`,
      fetchOptions
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong.');
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred.'
    );
  }
};
