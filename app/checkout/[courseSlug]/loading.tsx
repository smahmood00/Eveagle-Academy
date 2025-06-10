export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
      <div className="container px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Course Info Skeleton */}
          <div className="bg-zinc-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20 mb-6 sm:mb-8">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Image Skeleton */}
              <div className="relative aspect-video sm:aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-zinc-800 animate-pulse"></div>
              
              {/* Course Info Skeleton */}
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-zinc-800 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-8 w-32 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Area Skeleton */}
          <div className="bg-zinc-900/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-500/20">
            <div className="space-y-6">
              <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 