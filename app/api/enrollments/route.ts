import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth/verify';
import { connectToDB } from '@/lib/db/connect';
import { Enrollment } from '@/lib/db/models/enrollment';
import { Types } from 'mongoose';
import { User } from '@/lib/db/models/user';

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
        { studentId: new Types.ObjectId(userId), studentType: 'user' },
        { studentId: { $in: await getChildrenIds(userId) }, studentType: 'child' }
      ]
    }).populate('courseId');

    // Separate enrollments by type
    const myCourses = enrollments.filter(e => e.studentType === 'user');
    const childrenCourses = enrollments.filter(e => e.studentType === 'child');

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

// Helper function to get children IDs for a user
async function getChildrenIds(userId: string) {
  const user = await User.findById(userId);
  return user?.children || [];
} 