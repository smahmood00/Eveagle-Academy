import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Twitter, Facebook, MapPin, Book, Wrench, MessageCircle } from "lucide-react"

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
      <section className="relative min-h-screen pt-24 sm:pt-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob-slow"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob-slow animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob-slow animation-delay-4000"></div>
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
              Discover a world of innovative tech education designed for young minds. From coding to digital literacy, 
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
                className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 border-0"
                asChild
              >
                <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center">
                    Contact Us <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="ml-2 h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.896 6.991c-.003 5.455-4.438 9.89-9.893 9.89m8.413-18.304A11.815 11.815 0 0 0 12.05 0C5.495 0 .057 5.437.053 12.092c0 2.13.557 4.213 1.615 6.044L.057 24l6.064-1.607a11.888 11.888 0 0 0 5.929 1.515h.005c6.554 0 11.993-5.437 11.997-12.092a11.86 11.86 0 0 0-3.497-8.382"/></svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
          <SectionHeading title="Learn The Hot Skills Of Today" subtitle="Prompt Engineering" />
          
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
      {/* <section id="testimonials" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Student Testimonials" subtitle="What our students say about us" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            {/* Testimonial 1 */}
            {/* <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
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
            </div> */}

            {/* Testimonial 2 */}
            {/* <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
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
            </div> */}

            {/* Testimonial 3 */}
            {/* <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
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
            </div> */}
          {/* </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section id="cta" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Ready to Begin Your Tech Journey?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join Eveagle Academy and give your child the skills they need to thrive in the digital age. Our expert-led courses make learning technology fun and engaging.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 relative overflow-hidden group"
                asChild
              >
                <Link href="/summer-courses">
                  <span className="relative z-10 flex items-center">
                    Explore Summer Courses <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
              
              <Button 
                className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 border-0 w-full sm:w-auto px-8 py-6 text-lg flex items-center gap-2"
                asChild
              >
                <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center">
                    Contact Us <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="ml-2 h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.896 6.991c-.003 5.455-4.438 9.89-9.893 9.89m8.413-18.304A11.815 11.815 0 0 0 12.05 0C5.495 0 .057 5.437.053 12.092c0 2.13.557 4.213 1.615 6.044L.057 24l6.064-1.607a11.888 11.888 0 0 0 5.929 1.515h.005c6.554 0 11.993-5.437 11.997-12.092a11.86 11.86 0 0 0-3.497-8.382"/></svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                  <Book className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-zinc-400">Learn from industry professionals who are passionate about teaching.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                  <Wrench className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hands-on Projects</h3>
                <p className="text-zinc-400">Build real projects that showcase your child's skills and creativity.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                <p className="text-zinc-400">Online classes to fit your schedule.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
