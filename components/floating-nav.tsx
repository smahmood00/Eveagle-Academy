"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/AuthContext"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const courseItems = [
    { name: "Coding Basics", href: "/courses/coding-basics" },
    { name: "AI for Kids", href: "/courses/ai-for-kids" },
    { name: "Game Development", href: "/courses/game-development" },
    { name: "Robotics", href: "/courses/robotics" },
    { name: "Web Design", href: "/courses/web-design" },
  ]

  const navItems = [
    { name: "Summer Courses!", href: "/summer-courses", highlight: true },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    ...(isAuthenticated ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      
      // Clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('userEmail')
      
      // Update auth context
      logout()

      // Call logout API
      await axios.post('/api/auth/logout', {}, {
        withCredentials: true
      })

      // Redirect to home page
      router.replace('/')
      
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect to home page even if there's an error
      router.replace('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.div
        className={`fixed top-4 inset-x-2 sm:top-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[100] ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative px-3 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>

          {isMobile ? (
            <div className="relative flex items-center justify-between">
              <Link href="/" className="font-bold text-base" onClick={handleNavClick}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Eveagle</span>
                <span className="text-white">Academy</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              <Link href="/" className="font-bold text-lg mr-4" onClick={handleNavClick}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Eveagle</span>
                <span className="text-white">Academy</span>
              </Link>

              {/* Desktop Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    item.highlight
                      ? "text-pink-400 hover:text-pink-300"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                  asChild
                >
                  <Link href="/parent-login">Login</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-x-2 top-24 bottom-4 z-[90] rounded-2xl bg-zinc-900/95 backdrop-blur-md border border-zinc-800/50 ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full py-6">
            <div className="flex-1 overflow-y-auto px-4">
              {navItems.map((item) => (
                <div key={item.name} className="mb-2">
                  <Link
                    href={item.href}
                    className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                      item.highlight
                        ? "text-pink-400 hover:text-pink-300 hover:bg-zinc-800/50"
                        : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                    }`}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="px-4 pt-4 border-t border-zinc-800">
              {isAuthenticated ? (
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
                  asChild
                >
                  <Link href="/parent-login" onClick={handleNavClick}>Login</Link>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
