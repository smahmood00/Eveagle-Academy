import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import { User } from '@/lib/db/models/user';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, firstName, lastName, phoneNumber } = await request.json();
    
    const user = await User.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      isVerified: true
    });

    const token = signToken({ 
      userId: user._id.toString(),
      email 
    });

    const response = NextResponse.json({
      success: true,
      token
    });

    // Set cookie in response
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;

  } catch (error: any) {
    console.error('Complete profile error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Error creating user' },
      { status: 500 }
    );
  }
} 