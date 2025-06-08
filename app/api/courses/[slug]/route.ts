import { NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/actions/course.actions';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const course = await getCourseBySlug(params.slug);
    
    if (!course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 