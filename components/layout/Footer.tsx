import Link from "next/link"
import { Facebook, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import { getPublishedCourses } from "@/lib/actions/course.actions"

export async function Footer() {
  const courses = await getPublishedCourses();

  return (
    <footer className="border-t border-zinc-800 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link href="/" className="font-bold text-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Eveagle</span>
              <span className="text-white">Academy</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Empowering young minds through innovative technology education. Join us in shaping the future of learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Summer Courses</h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course._id?.toString()}>
                  <Link href={`/courses/${course.slug}`} className="text-zinc-400 hover:text-white transition-colors">
                    {course.title}
                </Link>
              </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:eveagleacademy@gmail.com" className="hover:text-white transition-colors">
                  eveagleacademy@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 mt-1" />
                <address className="not-italic">
                  Hong Kong
                </address>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 border border-transparent transition-all"
              >
                <Facebook className="w-5 h-5 text-zinc-400 hover:text-white" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 border border-transparent transition-all"
              >
                <Twitter className="w-5 h-5 text-zinc-400 hover:text-white" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 border border-transparent transition-all"
              >
                <Linkedin className="w-5 h-5 text-zinc-400 hover:text-white" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Eveagle Academy. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-sm text-zinc-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-zinc-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 