export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
      <div className="container px-4 sm:px-6">
        {/* Header Skeleton */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mb-4"></div>
          <div className="h-4 w-64 bg-zinc-800 rounded-lg animate-pulse"></div>
        </div>

        {/* Courses Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
              {/* Image Skeleton */}
              <div className="relative w-full aspect-video sm:aspect-[4/3] mb-4 sm:mb-6 rounded-lg sm:rounded-xl overflow-hidden bg-zinc-800 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-zinc-800 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 