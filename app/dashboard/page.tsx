"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book, Clock, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ICourse } from '@/lib/db/models/course';

interface EnrollmentWithCourse {
  _id: string;
  courseId: ICourse;
  status: string;
  enrollmentDate: string;
}

interface DashboardData {
  myCourses: EnrollmentWithCourse[];
  childrenCourses: EnrollmentWithCourse[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments');
      if (!response.ok) {
        throw new Error('Failed to fetch enrollments');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError('Failed to load your courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const CourseCard = ({ course }: { course: ICourse }) => (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
        <Image
          src={course.cardImage || '/placeholder-course.jpg'}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        {course.title}
      </h3>
      
      <p className="text-zinc-400 mb-4 line-clamp-2">
        {course.overviewDescription}
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
          <Clock className="w-4 h-4" />
          {course.totalHours} Hours
        </span>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
          <Book className="w-4 h-4" />
          {course.totalClasses} Classes
        </span>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm">
          <Wrench className="w-4 h-4" />
          {course.toolUsed}
        </span>
      </div>

      <Link
        href={`/courses/${course.slug}`}
        className="block w-full px-4 py-2 text-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 hover:scale-[1.02]"
      >
        Continue Learning
      </Link>
    </div>
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-purple-500/20 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-zinc-900/50 rounded-2xl p-6 h-[400px]"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-zinc-400 mb-8">{error}</p>
          <button
            onClick={fetchEnrollments}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* My Courses Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            My Courses
          </h2>
          {data?.myCourses.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-purple-500/20">
              <p className="text-zinc-400">You haven't enrolled in any courses yet.</p>
             
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.myCourses.map((enrollment) => (
                <CourseCard key={enrollment._id} course={enrollment.courseId} />
              ))}
            </div>
          )}
        </section>

        {/* Children's Courses Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Children's Courses
          </h2>
          {data?.childrenCourses.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-purple-500/20">
              <p className="text-zinc-400">No courses enrolled for children yet.</p>
            
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.childrenCourses.map((enrollment) => (
                <CourseCard key={enrollment._id} course={enrollment.courseId} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
} 