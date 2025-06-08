import { connectToDB } from "@/lib/db/connect";
import Course, { ICourse } from "@/lib/db/models/course";

export async function getPublishedCourses(): Promise<ICourse[]> {
  try {
    await connectToDB();
    
    const courses = await Course.find({ isPublished: true })
      .select('title overviewDescription coverImage ageGroup totalHours slug cardImage totalClasses toolUsed')
      .sort({ createdAt: -1 });
    
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getCourseBySlug(slug: string): Promise<ICourse | null> {
  try {
    await connectToDB();
    
    const course = await Course.findOne({ 
      slug: slug,
      isPublished: true 
    });
    
    if (!course) {
      return null;
    }

    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
} 