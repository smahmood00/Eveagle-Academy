import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Twitter, Facebook, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { CourseCarousel } from "@/components/courses/CourseCarousel"
import { getPublishedCourses } from "@/lib/actions/course.actions"
import { PromptingIsAllYouNeed } from "@/components/prompting/prompting"

export default async function Portfolio() {
  const courses = await getPublishedCourses();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 sm:pt-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="relative z-10">Empowering Young Minds Through Technology</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Welcome to</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Eveagle Academy
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-[600px]">
              Discover a world of innovative tech education designed for young minds. From coding to robotics, 
              we make learning technology fun and engaging.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 border-0" asChild>
                <Link href="/summer-courses">
                  <span className="relative z-10 flex items-center">
                    Explore Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
                asChild
              >
                <Link href="#contact">
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">1000+</h3>
                <p className="text-sm text-zinc-400">Students</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">15+</h3>
                <p className="text-sm text-zinc-400">Courses</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">20+</h3>
                <p className="text-sm text-zinc-400">Instructors</p>
              </div>
            </div> */}
          </div>

          <div className="flex justify-center">
            <CreativeHero />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
        
      </section>
            {/* Skills Section */}
            <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Learn the Hot Skills of Today" subtitle="Prompt Engineering" />
          
          <div className="mt-16 h-[200px] sm:h-[400px] md:h-[450px] relative w-full max-w-4xl mx-auto">
            <PromptingIsAllYouNeed />
          </div>
        </div>
      </section>

      {/* Summer Courses Section */}
      <section id="courses" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading 
            title="Summer Courses 2025" 
            subtitle="Explore our exciting tech courses for young minds" 
          />

          <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
            <CourseCarousel courses={courses} />
          </div>

          {/* <div className=" text-center">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Why Choose Eveagle Academy?" subtitle="What sets us apart" />
          
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Student Testimonials" subtitle="What our students say about us" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Sarah Chen</h4>
                  <p className="text-sm text-zinc-400">AI & Web Development Student</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                "The AI course was incredible! I learned how to build websites and use AI tools effectively. The instructors made complex concepts easy to understand. Now I'm creating my own AI-powered projects!"
              </p>
              <div className="mt-6 flex items-center gap-1">
                {"★".repeat(5).split("").map((star, i) => (
                  <span key={i} className="text-yellow-500">
                    {star}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Alex Thompson</h4>
                  <p className="text-sm text-zinc-400">Game Development Student</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                "The game development course exceeded my expectations. The hands-on projects were fun and challenging. I've already published my first game, and I can't wait to create more!"
              </p>
              <div className="mt-6 flex items-center gap-1">
                {"★".repeat(5).split("").map((star, i) => (
                  <span key={i} className="text-yellow-500">
                    {star}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Maya Patel</h4>
                  <p className="text-sm text-zinc-400">Robotics Student</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                "The robotics course was amazing! We built real robots and learned programming. The teachers were super helpful and made every class exciting. I'm now participating in robotics competitions!"
              </p>
              <div className="mt-6 flex items-center gap-1">
                {"★".repeat(5).split("").map((star, i) => (
                  <span key={i} className="text-yellow-500">
                    {star}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">hello@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium">linkedin.com/in/shinekyawkyawaung</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <div className="font-medium">github.com/shinekyawkyawaung</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
