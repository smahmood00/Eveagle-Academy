"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { FloatingNav } from "@/components/floating-nav";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
         <FloatingNav />
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Dashboard
          </h1>
          <p className="mt-4 text-zinc-400">
            Welcome to your dashboard! This is where you'll manage your account and view your progress.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
} 