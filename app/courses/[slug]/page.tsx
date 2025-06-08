import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ICourse } from "@/lib/db/models/course";
import { Clock, Book, Wrench, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // Ensure params is resolved
  const resolvedParams = await Promise.resolve(params);
  const course = await getCourseBySlug(resolvedParams.slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: course.title,
    description: course.overviewDescription,
  };
}

export default async function CourseDetailPage(
  { params }: Props
) {
  // Ensure params is resolved
  const resolvedParams = await Promise.resolve(params);
  const course = await getCourseBySlug(resolvedParams.slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              {course.title}
            </h1>
            
            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-zinc-900/80 p-4 rounded-xl border border-purple-500/20">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">Duration</p>
                <p className="text-lg font-semibold">{course.totalHours} Hours</p>
              </div>
              <div className="bg-zinc-900/80 p-4 rounded-xl border border-purple-500/20">
                <Book className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">Classes</p>
                <p className="text-lg font-semibold">{course.totalClasses} Classes</p>
              </div>
              <div className="bg-zinc-900/80 p-4 rounded-xl border border-purple-500/20">
                <Wrench className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">Tool Used</p>
                <p className="text-lg font-semibold">{course.toolUsed}</p>
              </div>
              <div className="bg-zinc-900/80 p-4 rounded-xl border border-purple-500/20">
                <div className="text-2xl mx-auto mb-2 w-fit">👥</div>
                <p className="text-sm text-zinc-400">Age Group</p>
                <p className="text-lg font-semibold">{course.ageGroup}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Overview Media */}
              {course.overviewMedia && (
                <div className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-purple-500/20">
                  {course.overviewMedia.type === 'video' ? (
                    <video 
                      src={course.overviewMedia.url}
                      className="w-full aspect-video"
                      controls
                      poster={course.coverImage}
                    />
                  ) : (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={course.overviewMedia.url}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Overview Description */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Course Overview
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  {course.overviewDescription}
                </p>
                <div className="pt-4">
                  <Link
                    href={`/checkout/${course.slug}`}
                    className="block w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] text-lg text-center"
                  >
                    Enroll Now - HKD {course.price} 
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Course Curriculum */}
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Course Curriculum
              </h2>
              <div className="space-y-6">
                {course.lessons?.map((lesson, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900/70 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 bg-purple-500/20 rounded-md text-purple-300 text-sm font-medium">
                            Lesson {lesson.lessonNumber}
                          </span>
                          <span className="px-2.5 py-1 bg-pink-500/20 rounded-md text-pink-300 text-sm">
                            {lesson.hours} hours
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-purple-300">
                          {lesson.title}
                        </h3>
                        <p className="text-zinc-400 mb-4">{lesson.description}</p>
                        
                        {/* Lesson Outcomes */}
                        <div className="space-y-2">
                          {lesson.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-zinc-300">{outcome}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Learning Outcomes */}
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Key Learning Outcomes
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.keyLearningOutcomes?.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 bg-zinc-900/30 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-zinc-300">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-zinc-300 mb-6">Join our course today and start your learning journey!</p>
              <Link
                href={`/checkout/${course.slug}`}
                className="block w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] text-lg text-center"
              >
                Enroll Now - HKD {course.price}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 