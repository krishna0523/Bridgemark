import { useEffect, useRef } from 'react'

export default function ParticleNetwork({ isMobile = false }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null })
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  // Brand colors
  const colors = ['#7B3FF2', '#2B9FFF', '#22D3EE']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []

      if (isMobile) {
        // Mobile: Create bridge formation
        const particleCount = 16
        const centerX = canvas.width / 2
        const startY = canvas.height * 0.62
        const arcWidth = canvas.width * 0.75
        const arcHeight = 80

        for (let i = 0; i < particleCount; i++) {
          const progress = i / (particleCount - 1)
          const x = centerX - arcWidth / 2 + progress * arcWidth
          // Parabolic arc equation
          const y = startY - arcHeight * Math.sin(progress * Math.PI)

          particlesRef.current.push({
            x,
            y,
            radius: 4,
            color: colors[i % colors.length],
            originalX: x,
            originalY: y
          })
        }
      } else {
        // Desktop: Random floating particles
        const particleCount = 20

        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 2.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
          })
        }
      }
    }

    // Draw particle
    const drawParticle = (particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.shadowBlur = 8
      ctx.shadowColor = particle.color
      ctx.fill()
      ctx.shadowBlur = 0
    }

    // Draw line between two particles
    const drawLine = (p1, p2, opacity = 0.4, lineWidth = 1) => {
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
      gradient.addColorStop(0, p1.color)
      gradient.addColorStop(1, p2.color)

      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = gradient
      ctx.globalAlpha = opacity
      ctx.lineWidth = lineWidth
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Calculate distance between two points
    const distance = (x1, y1, x2, y2) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }

    // Animation loop for desktop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position (desktop only)
        if (!isMobile) {
          particle.x += particle.vx
          particle.y += particle.vy

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        }

        // Draw connections
        if (isMobile) {
          // Mobile: Connect adjacent particles in bridge
          if (i < particles.length - 1) {
            drawLine(particle, particles[i + 1], 0.7, 2)
          }
        } else {
          // Desktop: Connect to mouse if nearby
          const mouseX = mouseRef.current.x
          const mouseY = mouseRef.current.y

          if (mouseX !== null && mouseY !== null) {
            const dist = distance(particle.x, particle.y, mouseX, mouseY)
            const maxDistance = 180

            if (dist < maxDistance) {
              const opacity = (1 - dist / maxDistance) * 0.6
              drawLine(
                particle,
                { x: mouseX, y: mouseY, color: particle.color },
                opacity
              )
            }
          }

          // Also connect nearby particles
          particles.forEach((otherParticle, j) => {
            if (i !== j) {
              const dist = distance(particle.x, particle.y, otherParticle.x, otherParticle.y)
              if (dist < 120) {
                const opacity = (1 - dist / 120) * 0.3
                drawLine(particle, otherParticle, opacity)
              }
            }
          })
        }

        // Draw particle
        drawParticle(particle)
      })

      if (!isMobile) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    // Mouse move handler (desktop only)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null }
    }

    // Initialize
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    if (!isMobile) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
      animate()
    } else {
      // Mobile: Single render
      animate()
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (!isMobile) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: isMobile ? 'none' : 'auto'
      }}
    />
  )
}
