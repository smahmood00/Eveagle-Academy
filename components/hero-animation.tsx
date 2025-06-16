"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number = 0
      y: number = 0
      size: number = 1
      speedX: number = 0
      speedY: number = 0
      color: string = 'hsl(200, 70%, 60%)'
      devicePixelRatio: number = 1

      constructor() {
        if (!canvas || !ctx) return
        this.devicePixelRatio = window.devicePixelRatio || 1
        this.x = (Math.random() * canvas.width) / this.devicePixelRatio
        this.y = (Math.random() * canvas.height) / this.devicePixelRatio
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width / this.devicePixelRatio || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > canvas.height / this.devicePixelRatio || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const particleCount = 25

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop with throttling
    let lastTime = 0
    const fps = 30 // Limit to 30 FPS
    const interval = 1000 / fps

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return
      
      const deltaTime = currentTime - lastTime

      if (deltaTime > interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        lastTime = currentTime - (deltaTime % interval)

        // Draw connections
        ctx.strokeStyle = "rgba(120, 180, 255, 0.1)"
        ctx.lineWidth = 1

        for (let i = 0; i < particlesArray.length; i++) {
          for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x
            const dy = particlesArray[i].y - particlesArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
              ctx.stroke()
            }
          }
        }

        // Update and draw particles
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update()
          particlesArray[i].draw()
        }
      }

      // Only request animation frame if component is mounted
      if (canvasRef.current) {
        requestAnimationFrame(animate)
      }
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </motion.div>
  )
}
