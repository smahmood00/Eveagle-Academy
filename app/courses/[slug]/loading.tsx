export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 w-3/4 bg-zinc-800 rounded-lg animate-pulse mx-auto mb-8"></div>
            
            {/* Course Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-6 bg-zinc-800 rounded-full mx-auto mb-2"></div>
                  <div className="h-4 w-20 bg-zinc-800 rounded-lg mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Overview Section */}
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-purple-500/20">
              <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="h-4 w-3/4 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="h-4 w-5/6 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-purple-500/20">
              <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mb-8"></div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-zinc-900/70 rounded-xl p-6 border border-purple-500/20">
                    <div className="h-6 w-3/4 bg-zinc-800 rounded-lg animate-pulse mb-4"></div>
                    <div className="h-4 w-1/2 bg-zinc-800 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 