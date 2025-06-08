import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Eveagle Academy</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              We believe every child has the potential to <span className="text-purple-400 font-semibold">soar high</span> — to reach new heights of creativity, innovation, and success.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="prose prose-invert mx-auto">
            <div className="bg-zinc-900/50 rounded-2xl p-8 mb-12 border border-purple-500/20">
              <p className="text-lg leading-relaxed">
                In today's fast-paced world of technology, traditional schools are often struggling to keep up with the rapid advancements shaping our future. That's why we are committed to giving children a real taste of <span className="text-purple-400">today's technology</span> — the latest, the best, and the most exciting innovations in coding and artificial intelligence.
              </p>
            </div>

            <div className="space-y-16">
              {/* Mission Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Our Mission
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  Our mission is to inspire and equip young learners with cutting-edge skills in coding and AI, empowering them to become confident creators and problem-solvers. We provide hands-on, engaging experiences that spark curiosity and build a strong foundation for lifelong learning in a world that's evolving faster than ever.
                </p>
              </div>

              {/* Why Choose Us Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Why Choose Eveagle Academy?
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Stay Ahead of the Curve",
                      description: "While many traditional schools lag behind, we bring the forefront of technology directly to your child's fingertips."
                    },
                    {
                      title: "Innovative Curriculum",
                      description: "From foundational coding to advanced AI concepts, our programs are designed to challenge and excite young minds."
                    },
                    {
                      title: "Personalized Growth",
                      description: "We tailor learning paths to each child's unique interests and pace, nurturing creativity and confidence."
                    },
                    {
                      title: "Future-Ready Skills",
                      description: "Beyond coding, we cultivate critical thinking, collaboration, and adaptability — essential skills for tomorrow's leaders."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-zinc-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">{item.title}</h3>
                      <p className="text-zinc-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Our Vision
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  We envision a future where every child is empowered to harness technology to innovate, create, and lead. At Eveagle Academy, we're building a vibrant community of young learners who are ready to <span className="text-purple-400">soar high</span> and shape the world of tomorrow.
                </p>
              </div>

              {/* Values Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Our Values
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      title: "Innovation",
                      description: "Embracing the newest ideas and technologies."
                    },
                    {
                      title: "Inclusivity",
                      description: "Welcoming learners from all backgrounds."
                    },
                    {
                      title: "Growth",
                      description: "Encouraging curiosity, resilience, and continuous learning."
                    }
                  ].map((value, index) => (
                    <div key={index} className="bg-zinc-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">{value.title}</h3>
                      <p className="text-zinc-400">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Join Us and Soar High!</h2>
                <p className="text-lg text-zinc-300 mb-8">
                  Give your child the gift of the latest technology education and watch them soar high into a future filled with endless possibilities.
                </p>
                <Link href="/courses">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Explore Our Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 