import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
      <body className={inter.className}>
        <AuthProvider>
          <FloatingNav />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
