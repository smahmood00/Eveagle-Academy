'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('Invalid payment session');
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
        <div className="container px-4 sm:px-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-sm sm:text-base text-zinc-400">Processing your payment...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
        <div className="container px-4 sm:px-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl mb-4 text-red-500">❌</div>
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Payment Error</h1>
            <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8">{error}</p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
      <div className="container px-4 sm:px-6 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md bg-zinc-900/50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-purple-500/20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/20 mb-4 sm:mb-6">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            
            <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8">
              Thank you for your purchase. Your course is now ready for you to start learning.
            </p>

            <Link 
              href="/dashboard"
              className="block w-full px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 