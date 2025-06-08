import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/Footer'

import { AuthProvider } from '@/contexts/AuthContext'
import { FloatingNav } from '@/components/floating-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eveagle Academy',
  description: 'Empowering Young Minds Through Technology Education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white`}>
        <AuthProvider>
          <FloatingNav />
          <main>{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
