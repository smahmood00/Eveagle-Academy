import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db/connect';
import { Child } from '@/lib/db/models/child';
import { User } from '@/lib/db/models/user';
import { verifyAuth } from '@/lib/auth/verify';

// Get all children for the authenticated user
export async function GET(request: Request) {
  try {
    const userId = await verifyAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();
    
    const children = await Child.find({ parent: userId })
      .sort({ createdAt: -1 });
    
    return NextResponse.json(children);
  } catch (error: any) {
    console.error('Error fetching children:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching children' },
      { status: 500 }
    );
  }
}

// Add a new child
export async function POST(request: Request) {
  try {
    const userId = await verifyAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();
    
    const { firstName, lastName, age } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !age) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new child
    const child = await Child.create({
      firstName,
      lastName,
      age,
      parent: userId
    });

    // Add child to user's children array
    await User.findByIdAndUpdate(userId, {
      $push: { children: child._id }
    });

    return NextResponse.json(child, { status: 201 });
  } catch (error: any) {
    console.error('Error creating child:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating child' },
      { status: 500 }
    );
  }
} 