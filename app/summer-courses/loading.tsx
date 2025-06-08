export default function Loading() {
  return (
    <main className="min-h-screen py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="h-12 w-96 mx-auto bg-zinc-800 rounded-lg animate-pulse mb-4"></div>
          <div className="h-20 w-[500px] mx-auto bg-zinc-800 rounded-lg animate-pulse"></div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[600px] bg-zinc-900/90 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-[190px] bg-zinc-800"></div>
              <div className="p-6">
                <div className="flex gap-2 mb-2">
                  <div className="w-20 h-6 bg-zinc-800 rounded-full"></div>
                  <div className="w-24 h-6 bg-zinc-800 rounded-full"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="w-28 h-6 bg-zinc-800 rounded-full"></div>
                  <div className="w-24 h-6 bg-zinc-800 rounded-full"></div>
                </div>
                <div className="w-full h-8 bg-zinc-800 rounded-lg mb-3"></div>
                <div className="w-full h-20 bg-zinc-800 rounded-lg"></div>
                <div className="mt-6">
                  <div className="w-full h-10 bg-zinc-800 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 