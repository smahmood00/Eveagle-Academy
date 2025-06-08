import { getPublishedCourses } from "@/lib/actions/course.actions";
import { ICourse } from "@/lib/db/models/course";
import Link from "next/link";

export default async function SummerCoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-20">
      <section className="relative pt-20">
        <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-3xl" />

        <div className="container relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Summer Courses 2025
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Dive into the world of technology with our exciting summer courses designed for young minds. 
              From coding to AI, explore and learn with hands-on projects.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {courses.map((course: Partial<ICourse>) => (
              <div 
                key={course._id?.toString()} 
                className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[3/4] bg-zinc-900/90 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 ring-1 ring-purple-500/20">
                  {/* Card Image */}
                  <div className="relative w-full h-[190px] overflow-hidden">
                    <img
                      src={course.cardImage || '/placeholder-course.jpg'}
                      alt={course.title || 'Course Image'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Badges Row 1 */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
                        {course.ageGroup}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs">
                        {course.totalHours} Hours
                      </span>
                    </div>
                   
                    {/* Badges Row 2 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
                        {course.totalClasses} Classes
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                        {course.toolUsed}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 mb-6 line-clamp-3">
                      {course.overviewDescription}
                    </p>

                    {/* Learn More Button */}
                    <Link
                      href={`/courses/${course.slug}`}
                      className="block w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-center rounded-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 