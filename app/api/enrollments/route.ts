import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth/verify';
import { connectToDB } from '@/lib/db/connect';
import { Enrollment } from '@/lib/db/models/enrollment';
import { Types } from 'mongoose';

export async function GET(request: Request) {
  try {
    const userId = await verifyAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();

    // Get all enrollments for the user and their children
    const enrollments = await Enrollment.find({
      $or: [
        { studentId: new Types.ObjectId(userId), studentType: 'User' },
        { studentId: { $in: await getChildrenIds(userId) }, studentType: 'Child' }
      ]
    }).populate('courseId');

    // Separate enrollments by type
    const myCourses = enrollments.filter(e => e.studentType === 'User');
    const childrenCourses = enrollments.filter(e => e.studentType === 'Child');

    return NextResponse.json({
      myCourses,
      childrenCourses
    });
  } catch (error: any) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}

async function getChildrenIds(userId: string) {
  // Import Child model here to avoid circular dependencies
  const { Child } = await import('@/lib/db/models/child');
  const children = await Child.find({ parent: new Types.ObjectId(userId) });
  return children.map(child => child._id);
} 