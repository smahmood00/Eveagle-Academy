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
        email: null,
        userId: null,
        message: 'No token found'
      });
    }

    // Verify the token
    const payload = verifyToken(token);
    
    // Since we've updated JWTPayload to require userId, if we get here we know we have a valid user
    return NextResponse.json({
      isAuthenticated: true,
      email: payload.email,
      userId: payload.userId
    });

  } catch (error) {
    // Token verification failed
    return NextResponse.json({
      isAuthenticated: false,
      email: null,
      userId: null,
      message: 'Invalid token'
    });
  }
} 