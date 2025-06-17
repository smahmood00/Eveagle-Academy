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

  const CourseCard = ({ course }: { course: ICourse }) => {
    if (!course) {
      return null;
    }

    return (
      <div className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
        <div className="relative flex flex-col h-full bg-zinc-900/90 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 ring-1 ring-purple-500/20">
          {/* Card Image */}
          <div className="relative w-full aspect-video sm:aspect-[3/2] overflow-hidden">
            <img
              src={course.cardImage || '/placeholder-course.jpg'}
              alt={course.title || 'Course Image'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
          </div>

          {/* Card Content */}
          <div className="flex flex-col flex-grow p-4 sm:p-6">
            {/* Badges Container */}
            <div className="space-y-2 mb-3">
              {/* Badges Row 1 */}
              <div className="flex flex-wrap gap-2">
                {course.ageGroup && (
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
                    {course.ageGroup}
                  </span>
                )}
                {course.totalHours && (
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs">
                    {course.totalHours} Hours
                  </span>
                )}
              </div>
           
              {/* Badges Row 2 */}
              <div className="flex flex-wrap gap-2">
                {course.totalClasses && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
                    {course.totalClasses} Classes
                  </span>
                )}
                {course.toolUsed && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                    {course.toolUsed}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {course.title || 'Untitled Course'}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-400 mb-4 sm:mb-6 line-clamp-3 flex-grow">
              {course.overviewDescription || 'No description available'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
        <div className="container px-4 sm:px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-zinc-400">Loading your courses...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
        <div className="container px-4 sm:px-6 text-center">
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
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
      <div className="container px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* My Courses Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            My Courses
          </h2>
          {!data?.myCourses?.length ? (
            <div className="text-center py-8 sm:py-12 bg-zinc-900/50 rounded-xl sm:rounded-2xl border border-purple-500/20">
              <p className="text-zinc-400">You haven't enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.myCourses
                .filter(enrollment => enrollment.courseId && ['active', 'completed'].includes(enrollment.status))
                .map((enrollment) => (
                  <CourseCard key={enrollment._id} course={enrollment.courseId} />
                ))}
            </div>
          )}
        </section>

        {/* Children's Courses Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Children's Courses
          </h2>
          {!data?.childrenCourses?.length ? (
            <div className="text-center py-8 sm:py-12 bg-zinc-900/50 rounded-xl sm:rounded-2xl border border-purple-500/20">
              <p className="text-zinc-400">No courses enrolled for children yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.childrenCourses
                .filter(enrollment => enrollment.courseId && ['active', 'completed'].includes(enrollment.status))
                .map((enrollment) => (
                  <CourseCard key={enrollment._id} course={enrollment.courseId} />
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
} 