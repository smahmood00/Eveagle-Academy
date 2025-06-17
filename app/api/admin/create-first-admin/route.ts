import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db/connect';
import { Admin } from '@/lib/db/models/admin';

const ADMIN_SECRET = process.env.ADMIN_CREATE_SECRET || 'your-admin-secret';

export async function POST(request: Request) {
  try {
    const { username, email, password, secretKey } = await request.json();

    // Validate secret key
    if (secretKey !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if any admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const admin = new Admin({
      username,
      email,
      password
    });

    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully'
    });
  } catch (error: any) {
    console.error('Error creating admin:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 