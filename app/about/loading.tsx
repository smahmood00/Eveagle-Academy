export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-3/4 bg-zinc-800 rounded-lg animate-pulse mx-auto mb-6"></div>
            <div className="h-4 w-2/3 bg-zinc-800 rounded-lg animate-pulse mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="prose prose-invert mx-auto">
            {/* Mission Section Skeleton */}
            <div className="bg-zinc-900/50 rounded-2xl p-8 mb-12 border border-purple-500/20">
              <div className="space-y-4">
                <div className="h-4 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="h-4 w-5/6 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="h-4 w-4/5 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-16">
              {/* Why Choose Us Section Skeleton */}
              <div>
                <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mb-6"></div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-zinc-900/50 rounded-xl p-6 border border-purple-500/20">
                      <div className="h-6 w-3/4 bg-zinc-800 rounded-lg animate-pulse mb-4"></div>
                      <div className="h-4 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision Section Skeleton */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 text-center">
                <div className="h-8 w-64 bg-zinc-800 rounded-lg animate-pulse mx-auto mb-4"></div>
                <div className="h-4 w-3/4 bg-zinc-800 rounded-lg animate-pulse mx-auto mb-8"></div>
                <div className="h-10 w-40 bg-zinc-800 rounded-lg animate-pulse mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 