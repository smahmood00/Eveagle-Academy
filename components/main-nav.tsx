"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function MainNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
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
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative px-4 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>

          {isMobile ? (
            <div className="relative flex items-center justify-between">
              <Link href="/" className="font-bold text-lg">
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
              <Link href="/" className="font-bold text-lg mr-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Eveagle</span>
                <span className="text-white">Academy</span>
              </Link>
              
              {/* Courses Dropdown */}
              <div className="relative group">
                <button className="px-3 py-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                  Courses
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    {courseItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors"
                        onClick={handleNavClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regular Nav Items */}
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

              <Button
                size="sm"
                variant="ghost"
                className="ml-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                asChild
              >
                <Link href="/parent-login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            {/* Mobile Courses Section */}
            <div className="w-full px-8 mb-6">
              <h3 className="text-zinc-400 text-sm font-medium mb-2">Courses</h3>
              {courseItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-xl font-medium text-white hover:text-purple-400 transition-colors"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Nav Items */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-8 py-4 text-2xl font-medium transition-colors ${
                  item.highlight
                    ? "text-pink-400 hover:text-pink-300"
                    : "text-white hover:text-purple-400"
                }`}
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
            
            <Button
              className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
              asChild
            >
              <Link href="/parent-login" onClick={handleNavClick}>Login</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
} 