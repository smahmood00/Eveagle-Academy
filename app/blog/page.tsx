import { Newspaper } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full p-8 rounded-2xl bg-zinc-900/90 backdrop-blur-lg border border-zinc-800/50">
        {/* Gradient background effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-50"></div>
        
        <div className="relative flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
            <Newspaper className="w-8 h-8 text-purple-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Blog Coming Soon
            </span>
          </h1>
          
          <p className="text-zinc-400 text-lg max-w-lg">
            We're working on creating amazing content to share with you. Stay tuned for exciting articles about coding, technology, and education!
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          
          <p className="text-sm text-zinc-500">
            Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
} 