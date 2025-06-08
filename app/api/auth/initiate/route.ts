import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { OTP } from '@/lib/db/models/otp';
import { User } from '@/lib/db/models/user';
import { connectToDB } from '@/lib/db/connect';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export async function POST(req: Request) {
  try {
    await connectToDB();
    
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('✅ Successfully connected to MongoDB!');
    
    const otp = generateOTP();
    console.log("📧 Processing email for:", email);
    console.log("🔢 Generated OTP:", otp);

    // Validate OTP format
    if (!/^\d{4}$/.test(otp)) {
      return NextResponse.json(
        { message: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    // Save OTP using Mongoose model
    await OTP.create({
      email,
      otp: await bcrypt.hash(otp, 8)
    });
    console.log('✅ OTP saved to database');

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Authentication OTP',
      text: `Your OTP is: ${otp}`
    });
    console.log('✅ OTP email sent successfully');

    // Check if user exists using User model
    const existingUser = await User.findOne({ email });
    console.log(`👤 User status: ${existingUser ? 'Existing user' : 'New user'}`);

    return NextResponse.json({
      message: 'OTP sent successfully',
      isExistingUser: !!existingUser
    });

  } catch (error: any) {
    console.error('❌ Error in initiateAuth:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  } 
} 