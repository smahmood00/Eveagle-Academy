import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(request: Request) {
  try {
    // Get the token from cookies
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({
        isAuthenticated: false,
        email: null
      });
    }

    // Verify the token
    const payload = verifyToken(token);
    
    return NextResponse.json({
      isAuthenticated: true,
      email: payload.email
    });

  } catch (error) {
    return NextResponse.json({
      isAuthenticated: false,
      email: null
    });
  }
} 