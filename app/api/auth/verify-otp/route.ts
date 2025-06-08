import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/user';
import { OTP } from '@/lib/db/models/otp';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email, otp } = await request.json();
    
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: 'OTP expired or not found' },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    const token = signToken({ 
      userId: user ? user._id.toString() : null,
      email 
    });

    const response = NextResponse.json({
      success: true,
      token,
      isExistingUser: !!user
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
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Error verifying OTP' },
      { status: 500 }
    );
  }
} 