import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db/connect';
import { User } from '@/lib/db/models/user';
import { OTP } from '@/lib/db/models/otp';
import { sendOTPEmail } from '@/lib/email/sendEmail';

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    console.log("Generated OTP for", email, ":", otp); // For debugging

    // Validate OTP format
    if (!/^\d{4}$/.test(otp)) {
      throw new Error('Invalid OTP format');
    }

    // Save OTP
    await OTP.create({
      email,
      otp: await bcrypt.hash(otp, 8)
    });

    // Send OTP via email
    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
      success: true,
      message: 'OTP sent successfully',
      isExistingUser: await User.exists({ email })
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Internal server error',
        error: error.stack
      },
      { status: 500 }
    );
  }
} 