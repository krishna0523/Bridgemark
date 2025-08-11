import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import Lenis from 'lenis'
import SEO from '../components/SEO'
import KeywordBelts from '../components/KeywordBelts'

gsap.registerPlugin(ScrollTrigger)


// Clean Process Card Component with Hover Effects
function ProcessCard({ number, title, description, isMobile = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef()
  
  // Determine border style based on card number and mobile state
  const getBorderStyle = () => {
    if (isMobile) {
      // Mobile: All cards have top and bottom borders only
      return {
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: 'none',
        borderRight: 'none',
        marginBottom: '1rem'
      }
    }
    
    // Desktop: Original side-by-side layout
    if (number === 1) {
      return {
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: 'none'
      }
    } else if (number === 4) {
      return {
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: 'none',
        borderRight: '1px solid #000000'
      }
    } else {
      return {
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: 'none',
        borderRight: 'none'
      }
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out"
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      })
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...getBorderStyle(),
          borderRadius: '0',
          padding: '2rem 1.5rem',
          background: isHovered ? '#000000' : '#ffffff',
          flex: '0 0 240px',
          minHeight: '200px',
          transition: 'background-color 0.8s ease',
          cursor: 'pointer'
        }}
      >
        {/* Content */}
        <div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '100',
            opacity: 0.4,
            marginBottom: '1rem',
            color: isHovered ? '#ffffff' : '#000000',
            transition: 'color 0.8s ease'
          }}>
            0{number}
          </div>
          
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '300',
            margin: 0,
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
            color: isHovered ? '#ffffff' : '#000000',
            lineHeight: '1.3',
            transition: 'color 0.3s ease'
          }}>
            {title}
          </h3>
          
          <div style={{
            width: '30px',
            height: '1px',
            background: isHovered ? '#ffffff' : '#000000',
            marginBottom: '1rem',
            opacity: 0.3,
            transition: 'background-color 0.8s ease'
          }} />
          
          <p style={{
            fontSize: '0.8rem',
            fontWeight: '300',
            lineHeight: '1.5',
            opacity: 0.7,
            margin: 0,
            color: isHovered ? '#ffffff' : '#000000',
            transition: 'color 0.8s ease'
          }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showMainContent, setShowMainContent] = useState(false)
  const [skipSlides, setSkipSlides] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [videoTime, setVideoTime] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const [isVerticalScroll, setIsVerticalScroll] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [ctaScrollOffset, setCtaScrollOffset] = useState(0)
  const [processVisible, setProcessVisible] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [unicornStudioVisible, setUnicornStudioVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef()
  const heroSectionRef = useRef()
  const observerRef = useRef()
  const statsRef = useRef()
  const statsItemsRef = useRef([])
  const servicesRef = useRef()
  const projectsRef = useRef()
  const projectItemsRef = useRef([])
  const ctaRef = useRef()
  const processRef = useRef()
  const lenisRef = useRef()
  const navRef = useRef()
  const unicornStudioRef = useRef()

  // Check if user came from blog and skip slides, or if slides have been shown this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const referrer = document.referrer
      const fromBlog = referrer.includes('/blogs') || sessionStorage.getItem('fromBlog')
      const slidesShownThisSession = sessionStorage.getItem('slidesShown')
      
      if (fromBlog || slidesShownThisSession) {
        setSkipSlides(true)
        setShowMainContent(true)
        // Clear the fromBlog flag after using it
        sessionStorage.removeItem('fromBlog')
        // Ensure slidesShown flag is set if not already present
        if (!slidesShownThisSession) {
          sessionStorage.setItem('slidesShown', 'true')
        }
      }
    }
  }, [])

  // Initialize Lenis smooth scrolling and UnicornStudio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
      })

      lenisRef.current = lenis

      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      // Simple UnicornStudio initialization - no performance optimizations
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false }
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'
        
        script.onload = function() {
          if (typeof UnicornStudio !== 'undefined' && !window.UnicornStudio.isInitialized) {
            UnicornStudio.init()
            window.UnicornStudio.isInitialized = true
            console.log('UnicornStudio loaded and initialized')
          }
        }
        
        document.head.appendChild(script)
      }

      return () => {
        lenis.destroy()
        gsap.ticker.remove()
      }
    }
  }, [])

  // Update scroll handlers to work with Lenis
  useEffect(() => {
    if (lenisRef.current && showMainContent) {
      const updateScrollY = () => {
        setScrollY(lenisRef.current.scroll)
      }

      lenisRef.current.on('scroll', updateScrollY)

      return () => {
        lenisRef.current.off('scroll', updateScrollY)
      }
    }
  }, [showMainContent])

  const heroStatements = [
    { 
      main: "Bridge", 
      sub: "connecting possibilities",
      desc: "We bridge the gap between your vision and digital reality",
      leftIcon: "",
      rightIcon: ""
    },
    { 
      main: "Be Un-Conventional", 
      sub: "think differently",
      desc: "Break free from ordinary. Embrace the extraordinary approach to digital presence",
      leftIcon: "",
      rightIcon: ""
    },
    { 
      main: "Let your website speak", 
      sub: "visual storytelling",
      desc: "Every pixel tells your story. Every interaction builds your brand",
      leftIcon: "",
      rightIcon: ""
    },
    { 
      main: "Make your business Online", 
      sub: "digital transformation",
      desc: "Transform your traditional business into a digital powerhouse",
      leftIcon: "",
      rightIcon: ""
    }
  ]

  const services = [
    {
      id: 'seo',
      title: 'SEO Mastery',
      subtitle: 'Organic Growth Engine',
      description: 'We don\'t just optimize for search engines. We optimize for humans who use search engines. Our holistic approach combines technical excellence with content strategy to build sustainable organic growth.',
      keywords: ['SEO', 'Organic Growth', 'Analytics', 'Keywords', 'Content Strategy'],
      features: [
        'Strategic keyword architecture',
        'Technical SEO excellence', 
        'Content-driven authority building',
        'Local market domination',
        'Performance analytics & insights'
      ]
    },
    {
      id: 'web',
      title: 'Digital Craftsmanship',
      subtitle: 'Web Development Artistry',
      description: 'Code is poetry. Design is philosophy. We create digital experiences that resonate with your audience and perform flawlessly across all devices and platforms.',
      keywords: ['React', 'Next.js', 'Performance', 'Responsive', 'Accessibility'],
      features: [
        'Minimalist design principles',
        'Performance-first development',
        'Mobile-native experiences',
        'Accessibility & inclusion',
        'Future-proof architecture'
      ]
    },
    {
      id: 'brand',
      title: 'Identity Design',
      subtitle: 'Brand Psychology',
      description: 'Your brand is not what you say it is. It\'s what your audience feels it is. We craft visual identities that communicate your values and build emotional connections.',
      keywords: ['Brand Identity', 'Visual Design', 'Psychology', 'Typography', 'Guidelines'],
      features: [
        'Visual identity systems',
        'Brand strategy & positioning',
        'Typography & color psychology',
        'Digital brand guidelines',
        'Consistent brand experiences'
      ]
    }
  ]

  const testimonials = [
    {
      id: 1,
      quote: "Bridge doesn't just build websites. They craft digital poetry. Every pixel tells a story, every interaction feels intentional.",
      name: "Priya Sharma",
      title: "Founder",
      company: "Artisan Collective",
      location: "Banjara Hills"
    },
    {
      id: 2,
      quote: "Working with Bridge was like watching magic happen. They took our chaotic vision and transformed it into something we never imagined possible.",
      name: "Rajesh Kumar",
      title: "CEO",
      company: "TechnoVision",
      location: "HITEC City"
    },
    {
      id: 3,
      quote: "Finally, a team that understands that great design is invisible. It just works, beautifully and effortlessly.",
      name: "Ananya Reddy",
      title: "Creative Director",
      company: "Studio Minimal",
      location: "Jubilee Hills"
    }
  ]

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "3x", label: "Average ROI Increase" },
    { number: "24/7", label: "Ongoing Support" }
  ]

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(testimonialInterval)
  }, [testimonials.length])

  // Handle scroll navigation through intro slides (desktop and mobile)
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0
    
    const handleScroll = (e) => {
      if (!showMainContent && !isTransitioning) {
        e.preventDefault()
        
        setIsTransitioning(true)
        
        if (e.deltaY > 0 && currentSlide < heroStatements.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else if (e.deltaY < 0 && currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        } else if (e.deltaY > 0 && currentSlide === heroStatements.length - 1) {
          // Mark slides as shown for this session - they won't show again until browser session ends
          sessionStorage.setItem('slidesShown', 'true')
          setShowMainContent(true)
        }
        
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1400)
      }
    }

    // Mobile touch handlers
    const handleTouchStart = (e) => {
      if (!showMainContent && !isTransitioning) {
        touchStartY = e.changedTouches[0].screenY
      }
    }

    const handleTouchEnd = (e) => {
      if (!showMainContent && !isTransitioning) {
        touchEndY = e.changedTouches[0].screenY
        handleSwipe()
      }
    }

    const handleSwipe = () => {
      const swipeThreshold = 50 // minimum distance for swipe
      const swipeDistance = touchStartY - touchEndY
      
      if (Math.abs(swipeDistance) > swipeThreshold) {
        setIsTransitioning(true)
        
        if (swipeDistance > 0 && currentSlide < heroStatements.length - 1) {
          // Swipe up - next slide
          setCurrentSlide(prev => prev + 1)
        } else if (swipeDistance < 0 && currentSlide > 0) {
          // Swipe down - previous slide
          setCurrentSlide(prev => prev - 1)
        } else if (swipeDistance > 0 && currentSlide === heroStatements.length - 1) {
          // Swipe up on last slide - show main content
          sessionStorage.setItem('slidesShown', 'true')
          setShowMainContent(true)
        }
        
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1400)
      }
    }

    if (!showMainContent) {
      // Desktop scroll
      window.addEventListener('wheel', handleScroll, { passive: false })
      // Mobile touch
      window.addEventListener('touchstart', handleTouchStart, { passive: false })
      window.addEventListener('touchend', handleTouchEnd, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [showMainContent, isTransitioning, currentSlide, heroStatements.length])

  // Auto-play video once when main content shows
  useEffect(() => {
    if (showMainContent && videoRef.current) {
      const video = videoRef.current
      
      // Play video automatically once
      video.play().catch(e => console.log('Video autoplay failed:', e))
      
      // Show title at 3 seconds
      const titleTimer = setTimeout(() => {
        setShowTitle(true)
      }, 3000)
      
      // Show full text at 5 seconds
      const fullTextTimer = setTimeout(() => {
        setShowFullText(true)
      }, 5000)
      
      // Enable vertical scroll when video ends
      const handleVideoEnd = () => {
        setIsVerticalScroll(true)
      }
      
      video.addEventListener('ended', handleVideoEnd)
      
      return () => {
        clearTimeout(titleTimer)
        clearTimeout(fullTextTimer)
        video.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [showMainContent])


  // GSAP Stats Animation on Scroll
  useEffect(() => {
    if (showMainContent && statsItemsRef.current.length > 0) {
      // Set initial state - already set in inline styles, but ensure it's applied
      gsap.set(statsItemsRef.current, {
        opacity: 0,
        y: 100
      })

      // Create stagger animation triggered by scroll
      gsap.fromTo(statsItemsRef.current, 
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            amount: 0.8, // Total time for all elements to animate
            from: "start" // Animate from left to right
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%", // Start animation when top of section is 80% from top of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse", // play on enter, reverse on leave
            markers: false // Set to true for debugging
          }
        }
      )

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === statsRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [showMainContent])

  // GSAP Projects Animation on Scroll
  useEffect(() => {
    if (showMainContent && projectItemsRef.current.length > 0) {
      // Set initial state
      gsap.set(projectItemsRef.current, {
        opacity: 0,
        y: 100
      })

      // Create stagger animation triggered by scroll
      gsap.fromTo(projectItemsRef.current, 
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            amount: 1.5, // Total time for all 6 elements to animate (0.25s between each)
            from: "start" // Animate from left to right
          },
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%", // Start animation when top of section is 80% from top of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse", // play on enter, reverse on leave
            markers: false // Set to true for debugging
          }
        }
      )

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === projectsRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [showMainContent])

  // Navigation visibility and section tracking
  useEffect(() => {
    if (showMainContent && lenisRef.current) {
      const handleNavScroll = () => {
        const scrollY = lenisRef.current.scroll
        
        // Keep nav always visible
        setNavVisible(true)

        // Track active section
        const sections = [
          { name: 'home', element: heroSectionRef.current },
          { name: 'services', element: servicesRef.current },
          { name: 'projects', element: projectsRef.current },
          { name: 'contact', element: ctaRef.current }
        ]

        sections.forEach(section => {
          if (section.element) {
            const rect = section.element.getBoundingClientRect()
            if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
              setActiveSection(section.name)
            }
          }
        })
      }

      lenisRef.current.on('scroll', handleNavScroll)

      return () => {
        lenisRef.current.off('scroll', handleNavScroll)
      }
    }
  }, [showMainContent])

  // Smooth scroll to section
  const scrollToSection = (sectionRef) => {
    if (sectionRef.current && lenisRef.current) {
      lenisRef.current.scrollTo(sectionRef.current, { 
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Capture the scroll position when CTA becomes visible
          setCtaScrollOffset(window.scrollY)
          setTimeout(() => setCtaVisible(true), 200)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [showMainContent])

  // CTA-specific scroll handler with Lenis
  useEffect(() => {
    const handleCtaScroll = () => {
      if (ctaVisible && lenisRef.current) {
        const currentScroll = lenisRef.current.scroll
        // Only update scroll position if we're past the CTA section visibility point
        if (currentScroll >= ctaScrollOffset) {
          setScrollY(currentScroll)
        }
      }
    }

    if (ctaVisible && showMainContent && isVerticalScroll && lenisRef.current) {
      lenisRef.current.on('scroll', handleCtaScroll)

      return () => {
        lenisRef.current.off('scroll', handleCtaScroll)
      }
    }
  }, [ctaVisible, ctaScrollOffset, showMainContent, isVerticalScroll])

  // UnicornStudio is now always visible - no lazy loading

  // Mobile detection and responsive handler
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Project Box Hover Animation Handler
  const handleProjectHover = (index, isHovering) => {
    const projectBox = projectItemsRef.current[index]
    
    if (!projectBox) return
    
    if (isHovering) {
      // Simple scale and glow effect on hover
      gsap.to(projectBox, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      // Add subtle border glow
      projectBox.style.borderColor = 'rgba(255,255,255,0.3)'
      projectBox.style.boxShadow = '0 0 20px rgba(255,255,255,0.1)'
      
    } else {
      // Reset to normal state
      gsap.to(projectBox, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      // Remove glow effect
      projectBox.style.borderColor = 'rgba(255,255,255,0.1)'
      projectBox.style.boxShadow = 'none'
    }
  }

  // Show intro slides only if main content isn't ready and slides haven't been skipped
  if (!showMainContent && !skipSlides) {
    return (
      <div style={{ 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
        background: currentSlide % 2 === 0 ? '#000000' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        
        {/* Animated Icons */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          fontSize: '4rem',
          opacity: 0.4,
          transform: `translateY(${currentSlide * -20}px) rotate(${currentSlide * 10}deg) scale(${1 + currentSlide * 0.05})`,
          transition: 'all 2.0s cubic-bezier(0.165, 0.84, 0.44, 1)',
          animation: 'float 6s ease-in-out infinite'
        }}>
          {heroStatements[currentSlide]?.leftIcon || ''}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          fontSize: '3.5rem',
          opacity: 0.5,
          transform: `translateX(${currentSlide * 30}px) rotate(${currentSlide * -12}deg) scale(${1 + currentSlide * 0.08})`,
          transition: 'all 2.2s cubic-bezier(0.165, 0.84, 0.44, 1)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}>
          {heroStatements[currentSlide]?.rightIcon || ''}
        </div>

        {/* Subtle geometric lines */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '1px',
          height: '200px',
          background: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
          transform: `translateY(${currentSlide * -20}px) rotate(${currentSlide * 8}deg)`,
          transition: 'all 2.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
          opacity: 0.2
        }} />

        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '12%',
          width: '150px',
          height: '1px',
          background: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
          transform: `translateX(${currentSlide * 25}px)`,
          transition: 'all 2.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          opacity: 0.15
        }} />

        {/* Main Content */}
        <div style={{ 
          textAlign: 'left',
          color: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
          maxWidth: '800px',
          padding: '0 2rem',
          transform: `translateX(${currentSlide * -20}px)`,
          transition: 'all 2s cubic-bezier(0.165, 0.84, 0.44, 1)',
          zIndex: 2
        }}>
          
          <div style={{ 
            fontSize: '0.875rem',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: '1rem',
            animation: 'fadeInUp 1.5s ease-out',
            animationDelay: '0.5s',
            animationFillMode: 'both'
          }}>
            {heroStatements[currentSlide]?.sub || ''}
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: '100',
            margin: 0,
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            animation: 'slideInLeft 2s cubic-bezier(0.165, 0.84, 0.44, 1)',
            animationFillMode: 'both'
          }}>
            {heroStatements[currentSlide]?.main || ''}
          </h1>
          
          <div style={{
            width: '60px',
            height: '1px',
            background: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
            marginBottom: '2rem',
            animation: 'expandWidth 1.5s ease-out',
            animationDelay: '1s',
            animationFillMode: 'both'
          }} />

          <p style={{ 
            fontSize: '1.125rem',
            fontWeight: '300',
            lineHeight: '1.6',
            maxWidth: '500px',
            opacity: 0.8,
            animation: 'fadeInUp 1.5s ease-out',
            animationDelay: '1.2s',
            animationFillMode: 'both'
          }}>
            {heroStatements[currentSlide]?.desc || ''}
          </p>
        </div>

        {/* Slide Counter */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%) rotate(90deg)',
          fontSize: '0.75rem',
          fontWeight: '300',
          letterSpacing: '0.2em',
          color: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
          opacity: 0.4
        }}>
          {String(currentSlide + 1).padStart(2, '0')} / {String(heroStatements.length).padStart(2, '0')}
        </div>

        {/* Progress Lines */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {heroStatements.map((_, index) => (
            <div key={index} style={{
              width: currentSlide === index ? '40px' : '20px',
              height: '1px',
              background: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
              opacity: currentSlide === index ? 1 : 0.3,
              transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
              transitionDelay: `${index * 0.1}s`
            }} />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          fontSize: '0.75rem',
          fontWeight: '300',
          color: currentSlide % 2 === 0 ? '#ffffff' : '#000000',
          opacity: 0.6,
          animation: 'pulse 2s infinite'
        }}>
          {currentSlide < heroStatements.length - 1 ? 'scroll' : 'enter'}
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap');
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes expandWidth {
            from {
              width: 0;
            }
            to {
              width: 60px;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 0.3;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="Bridge Software Solutions - Web Development Company in Hyderabad | SEO Services | React & Three.js Experts"
        description="Professional web development, mobile app development, brand identity design, and SEO services in Hyderabad. We create digital experiences that drive growth for businesses across Telangana and India."
        keywords={[
          'web development Hyderabad',
          'SEO services Hyderabad',
          'React development',
          'Three.js experts',
          'mobile app development',
          'brand identity design',
          'digital marketing',
          'website design Telangana',
          'software development company',
          'UI/UX design Hyderabad'
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bridge Software Solutions",
          "description": "Professional web development, mobile app development, brand identity design, and SEO services in Hyderabad",
          "url": "https://bridgesoftwaresolutions.com",
          "logo": "https://bridgesoftwaresolutions.com/BRIDGE%20new%20logo.png",
          "image": "https://bridgesoftwaresolutions.com/og-image.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "17.385044",
            "longitude": "78.486671"
          },
          "telephone": "+91 9996 999 770",
          "email": "hello@bridgesoftwaresolutions.com",
          "sameAs": [
            "https://www.linkedin.com/company/bridge-software-solutions",
            "https://twitter.com/bridgesoftware",
            "https://www.facebook.com/bridgesoftwaresolutions"
          ],
          "founder": {
            "@type": "Person",
            "name": "Bridge Software Solutions Team"
          },
          "foundingDate": "2020",
          "areaServed": [
            {
              "@type": "Country",
              "name": "India"
            },
            {
              "@type": "State",
              "name": "Telangana"
            },
            {
              "@type": "City", 
              "name": "Hyderabad"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Development",
                  "description": "Custom website development using React, Next.js, and modern technologies"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "SEO Services",
                  "description": "Search engine optimization and digital marketing services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mobile App Development",
                  "description": "Native and cross-platform mobile application development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Brand Identity Design",
                  "description": "Logo design, brand guidelines, and visual identity creation"
                }
              }
            ]
          }
        }}
      />
      <div style={{ 
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#ffffff',
        color: '#000000',
        overflow: 'hidden',
        '--header-height': isMobile ? '60px' : '72px'
      }}>

      {/* Navigation Bar */}
      <nav 
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1rem 2rem',
          background: isMobile ? '#ffffff' : (navVisible ? '#ffffff' : 'transparent'),
          backdropFilter: 'none',
          borderBottom: isMobile ? '1px solid rgba(0,0,0,0.1)' : (navVisible ? '1px solid rgba(0,0,0,0.1)' : 'none'),
          transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
          opacity: navVisible ? 1 : 0
        }}
      >
        {isMobile ? (
          // Mobile Navigation Layout
          <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Mobile Logo */}
            <div 
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0
              }}
              onClick={() => scrollToSection(heroSectionRef)}
            >
              <img 
                src="/BRIDGE new logo.png" 
                alt="Bridge Software Solutions Logo" 
                style={{
                  height: '32px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Mobile Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              marginLeft: '1rem',
              gap: 'clamp(0.25rem, 2vw, 1rem)'
            }}>

              {/* Mobile Services */}
              <button
                onClick={() => scrollToSection(servicesRef)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  flex: '1',
                  textAlign: 'center'
                }}
              >
                Services
              </button>

              {/* Mobile Projects */}
              <button
                onClick={() => scrollToSection(projectsRef)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  flex: '1',
                  textAlign: 'center'
                }}
              >
                Projects
              </button>

              {/* Mobile Blogs */}
              <Link href="/blogs">
                <button style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  flex: '1',
                  textAlign: 'center'
                }}>
                  Blogs
                </button>
              </Link>

              {/* Mobile Contact Button */}
              <Link href="/contact">
                <button style={{
                  background: '#007bff',
                  color: '#ffffff',
                  border: 'none',
                  padding: 'clamp(0.4rem, 1.5vw, 0.75rem) clamp(0.6rem, 2.5vw, 1.5rem)',
                  borderRadius: '6px',
                  fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  flex: '1',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#0056b3'
                  e.target.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#007bff'
                  e.target.style.transform = 'translateY(0)'
                }}>
                  Contact
                </button>
              </Link>
            </div>
          </div>
        ) : (
          // Desktop Navigation Layout - Copy of Blog Navigation
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Desktop Logo */}
            <div 
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => scrollToSection(heroSectionRef)}
            >
              <img 
                src="/BRIDGE new logo.png" 
                alt="Bridge Software Solutions Logo" 
                style={{
                  height: '42px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            {/* Desktop Navigation Links */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center'
            }}>
              {/* Home Button - Active */}
              <button style={{
                background: 'none',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: activeSection === 'home' ? '500' : '400',
                letterSpacing: '0.05em',
                color: activeSection === 'home' ? '#000000' : '#666666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                position: 'relative',
                transform: 'scale(1)'
              }}
              onClick={() => scrollToSection(heroSectionRef)}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = activeSection === 'home' ? '#000000' : '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Home
              </button>

              {/* Services Button */}
              <button style={{
                background: 'none',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: activeSection === 'services' ? '500' : '400',
                letterSpacing: '0.05em',
                color: activeSection === 'services' ? '#000000' : '#666666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                position: 'relative',
                transform: 'scale(1)'
              }}
              onClick={() => scrollToSection(servicesRef)}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = activeSection === 'services' ? '#000000' : '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Services
              </button>

              {/* Projects Button */}
              <button style={{
                background: 'none',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: activeSection === 'projects' ? '500' : '400',
                letterSpacing: '0.05em',
                color: activeSection === 'projects' ? '#000000' : '#666666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                position: 'relative',
                transform: 'scale(1)'
              }}
              onClick={() => scrollToSection(projectsRef)}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = activeSection === 'projects' ? '#000000' : '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Projects
              </button>

              {/* Blogs Link */}
              <Link href="/blogs">
                <button style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  position: 'relative',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#000000'
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666'
                  e.target.style.transform = 'scale(1)'
                }}
                >
                  Blogs
                </button>
              </Link>
              
              {/* Contact Button */}
              <Link href="/contact">
                <button style={{
                  background: '#007bff',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#0056b3'
                  e.target.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#007bff'
                  e.target.style.transform = 'translateY(0)'
                }}
                >
                  Contact
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && isMobile && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-in-out'
          }}>
            {[
              { name: 'Home', key: 'home', ref: heroSectionRef },
              { name: 'Services', key: 'services', ref: servicesRef },
              { name: 'Projects', key: 'projects', ref: projectsRef }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  scrollToSection(item.ref)
                  setMobileMenuOpen(false)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#000000',
                  cursor: 'pointer',
                  padding: '1rem 2rem',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
              >
                {item.name}
              </button>
            ))}
            
            <Link href="/blogs">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#000000',
                  cursor: 'pointer',
                  padding: '1rem 2rem',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
              >
                Blogs
              </button>
            </Link>

            <Link href="/contact">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '6px',
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  marginTop: '1rem'
                }}
              >
                Contact
              </button>
            </Link>
          </div>
        )}
      </nav>

      
      {/* Hero Section with Scroll-Controlled Video */}
      <section 
        ref={heroSectionRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: isMobile ? '80px' : '100px',
          overflow: 'hidden'
        }}
      >
        {/* Video Background for Desktop, Image for Mobile */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          {!isMobile ? (
            <video
              ref={videoRef}
              muted
              autoplay
              preload="metadata"
              controls={false}
              onLoadStart={() => console.log('Hero video loading started')}
              onCanPlay={() => console.log('Hero video can play')}
              onError={(e) => console.error('Hero video error:', e)}
              onLoadedData={() => console.log('Hero video data loaded')}
              onTimeUpdate={(e) => setVideoTime(e.target.currentTime)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
            >
              <source src="/videos/Bridge%20Video.mp4" type="video/mp4" />
            </video>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: '#ffffff',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Mobile Hero Content */}
              <div style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                zIndex: 3,
                maxWidth: '100%',
                width: '100%'
              }}>
                {/* Main Title */}
                <h1 style={{
                  fontSize: 'clamp(2.2rem, 10vw, 3.8rem)',
                  fontWeight: '100',
                  lineHeight: '1.0',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  marginBottom: '1rem',
                  color: '#000000'
                }}>
                  Bridge Software<br />Solutions
                </h1>

                {/* Subtitle */}
                <div style={{
                  fontSize: 'clamp(0.7rem, 3vw, 0.9rem)',
                  fontWeight: '400',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '2rem',
                  color: '#666666'
                }}>
                  Digital Craftsmanship Studio
                </div>

                {/* Divider */}
                <div style={{
                  width: '60px',
                  height: '1px',
                  background: '#000000',
                  margin: '0 auto 2rem auto'
                }} />

                {/* Description */}
                <p style={{
                  fontSize: 'clamp(0.95rem, 4.5vw, 1.15rem)',
                  fontWeight: '300',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 auto',
                  marginBottom: '3rem',
                  maxWidth: '320px'
                }}>
                  We create digital experiences that bridge the gap between vision and reality. 
                  Minimalist design meets powerful functionality.
                </p>

                {/* Call to Action Button */}
                <Link href="/contact">
                  <button style={{
                    background: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '0',
                    fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    textTransform: 'uppercase',
                    transform: 'translateY(0)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#333333'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#000000'
                    e.target.style.transform = 'translateY(0)'
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(0.98)'
                    e.target.style.background = '#333333'
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.target.style.transform = 'scale(1)'
                      e.target.style.background = '#000000'
                    }, 150)
                  }}
                  >
                    Start Your Project
                  </button>
                </Link>
              </div>

              {/* Decorative Element */}
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                border: '1px solid #000000',
                opacity: 0.1,
                zIndex: 1
              }} />
              
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '1.5rem',
                width: '20px',
                height: '20px',
                backgroundColor: '#000000',
                opacity: 0.05,
                zIndex: 1
              }} />
            </div>
          )}
        </div>

        {/* Progress Indicator - Desktop Only */}
        {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          zIndex: 4,
          color: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '300',
          opacity: showFullText ? 0 : 0.8,
          transition: 'opacity 1s ease'
        }}>
          {!isVerticalScroll && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                {!showFullText 
                  ? `Playing • ${Math.round((videoTime / (videoRef.current?.duration || 30)) * 100)}%`
                  : `Continue exploring • ${Math.round((videoTime / (videoRef.current?.duration || 30)) * 100)}%`
                }
              </div>
              <div style={{
                width: '100px',
                height: '1px',
                background: 'rgba(255,255,255,0.3)',
                position: 'relative'
              }}>
                <div style={{
                  width: `${(videoTime / (videoRef.current?.duration || 30)) * 100}%`,
                  height: '1px',
                  background: '#ffffff',
                  transition: 'width 0.1s ease'
                }} />
              </div>
            </>
          )}
        </div>
        )}

        {/* Hero Text - Staggered Reveal - Desktop Only */}
        {!isMobile && (
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 3
        }}>
          
          {/* Main Title - Appears at 3 seconds */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '100',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 4px 30px rgba(0,0,0,0.8)',
            opacity: showTitle ? 1 : 0,
            transform: `translateY(${showTitle ? 0 : 30}px)`,
            transition: 'all 2s cubic-bezier(0.165, 0.84, 0.44, 1)'
          }}>
            Bridge Software<br />Solutions
          </h1>

          {/* Supporting Content - Appears at 5 seconds */}
          <div style={{
            opacity: showFullText ? 1 : 0,
            transform: `translateY(${showFullText ? 0 : 30}px)`,
            transition: 'all 2s cubic-bezier(0.165, 0.84, 0.44, 1)',
            transitionDelay: '0.3s'
          }}>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              fontWeight: '400',
              letterSpacing: isMobile ? '0.15em' : '0.2em',
              textTransform: 'uppercase',
              marginTop: isMobile ? '1.5rem' : '2rem',
              marginBottom: isMobile ? '1.5rem' : '2rem',
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)'
            }}>
              Digital Craftsmanship Studio
            </div>

            <div style={{
              width: '80px',
              height: '1px',
              background: '#ffffff',
              margin: '2rem auto',
              opacity: 0.8,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }} />

            <p style={{
              fontSize: '1.25rem',
              fontWeight: '300',
              lineHeight: '1.6',
              maxWidth: '600px',
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              margin: '0 auto'
            }}>
              We create digital experiences that bridge the gap between vision and reality. 
              Minimalist design meets powerful functionality.
            </p>

            {/* Scroll Hint for Vertical Scroll */}
            {isVerticalScroll && (
              <div style={{
                marginTop: '3rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.8,
                  animation: 'pulse 2s infinite',
                  marginBottom: '2rem'
                }}>
                  Scroll down to continue ↓
                </div>

                {/* Start Your Project Button */}
                <Link href="/contact">
                  <button style={{
                    background: 'transparent',
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    backdropFilter: 'blur(10px)',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ffffff'
                    e.target.style.color = '#000000'
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#ffffff'
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                  >
                    Start Your Project
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Subtle Overlay for Text Readability - Removed as requested */}
      </section>

      {/* Enhanced Services Section */}
      <section 
        ref={servicesRef}
        style={{
        padding: '10rem 2rem',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: 'var(--header-height)'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite',
          zIndex: 1
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 25s ease-in-out infinite reverse',
          zIndex: 1
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            marginBottom: '6rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '400',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: '2rem',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              What We Do
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: '100',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Services
            </h2>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {services.map((service, index) => (
              <div key={service.id} style={{
                marginBottom: '2rem',
                position: 'relative'
              }}>
                <div 
                  className={`service-card ${activeAccordion === service.id ? 'active' : ''}`}
                  style={{
                    background: activeAccordion === service.id 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                      : 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: isMobile ? '2rem' : '3rem',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transformOrigin: 'center',
                    boxShadow: activeAccordion === service.id 
                      ? '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                      : '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => setActiveAccordion(activeAccordion === service.id ? null : service.id)}
                >
                  {/* Glass reflection effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    opacity: activeAccordion === service.id ? 1 : 0.5,
                    transition: 'opacity 0.3s ease'
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '400',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        opacity: 0.6,
                        marginBottom: '0.5rem'
                      }}>
                        {service.subtitle}
                      </div>
                      
                      <h3 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        fontWeight: '200',
                        margin: 0,
                        marginBottom: '1rem',
                        transition: 'all 0.3s ease',
                        color: activeAccordion === service.id ? '#f5f5f5' : '#ffffff'
                      }}>
                        {service.title}
                      </h3>

                      {/* Service Keywords */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        opacity: activeAccordion === service.id ? 1 : 0.7,
                        transition: 'opacity 0.3s ease'
                      }}>
                        {service.keywords.map((keyword, i) => (
                          <span key={i} style={{
                            fontSize: '0.75rem',
                            fontWeight: '300',
                            padding: '0.25rem 0.75rem',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            opacity: 0.8,
                            transition: 'all 0.3s ease'
                          }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '100',
                      transition: 'all 0.3s ease',
                      transform: activeAccordion === service.id ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg)',
                      color: activeAccordion === service.id ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      marginLeft: '2rem'
                    }}>
                      +
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div style={{
                    maxHeight: activeAccordion === service.id ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    opacity: activeAccordion === service.id ? 1 : 0
                  }}>
                    <div style={{ 
                      paddingTop: '2rem',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      marginTop: '1rem'
                    }}>
                      <p style={{
                        fontSize: '1.125rem',
                        fontWeight: '300',
                        lineHeight: '1.6',
                        marginBottom: '2rem',
                        opacity: 0.9,
                        color: '#f5f5f5'
                      }}>
                        {service.description}
                      </p>
                      
                      {/* Service Features */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                      }}>
                        {service.features.map((feature, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.9rem',
                            fontWeight: '300',
                            opacity: 0.8,
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{
                              width: '4px',
                              height: '4px',
                              background: 'linear-gradient(45deg, #ffffff, #cccccc)',
                              borderRadius: '50%',
                              marginRight: '1rem',
                              opacity: 0.7
                            }} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Animated Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: activeAccordion === service.id ? 1 : 0.5,
                    transition: 'opacity 0.5s ease',
                    animation: 'pulse 4s ease-in-out infinite'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>


      {/* Stats Section with GSAP Scroll Animation */}
      <section 
        ref={statsRef}
        style={{
          padding: '8rem 2rem',
          background: '#ffffff',
          color: '#000000'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '4rem',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                ref={(el) => (statsItemsRef.current[index] = el)}
                className="stat-item"
                style={{
                  opacity: 0,
                  transform: 'translateY(100px)'
                }}
              >
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '100',
                  marginBottom: '0.5rem',
                  color: '#000000'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  opacity: 0.6
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '10rem 2rem',
        background: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Keyword Belts */}
        <KeywordBelts 
          topKeywords={[
            "#BRAND STRATEGY", "#SEO", "#WEB DESIGN", "#REACT", "#GSAP", "#THREE.JS", 
            "#NEXT.JS", "#TYPESCRIPT", "#TAILWIND", "#FIGMA", "#ADOBE", "#SKETCH",
            "#JAVASCRIPT", "#CSS", "#HTML", "#NODE.JS", "#MONGODB", "#POSTGRESQL",
            "#RESPONSIVE", "#ANIMATION", "#INTERACTION", "#PROTOTYPE", "#WIREFRAME"
          ]}
          bottomKeywords={[
            "#PERFORMANCE", "#ACCESSIBILITY", "#ANALYTICS", "#UI/UX", "#CONTENT", "#OPTIMIZATION",
            "#LIGHTHOUSE", "#CORE WEB VITALS", "#PAGESPEED", "#MOBILE FIRST", "#PWA", "#SPA",
            "#API", "#MICROSERVICES", "#CLOUD", "#DEVOPS", "#CI/CD", "#TESTING",
            "#CONVERSION", "#ENGAGEMENT", "#RETENTION", "#GROWTH", "#METRICS", "#ROI"
          ]}
          speedTop={70}
          speedBottom={55}
          pauseOnHover={true}
        />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '400',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: '4rem'
          }}>
            Client Voices
          </div>

          <div style={{
            position: 'relative',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} style={{
                position: 'absolute',
                width: '100%',
                opacity: index === currentTestimonial ? 1 : 0,
                transform: `translateX(${index === currentTestimonial ? 0 : index < currentTestimonial ? -100 : 100}px)`,
                transition: 'all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                textAlign: 'center'
              }}>
                <blockquote style={{
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  fontWeight: '200',
                  lineHeight: '1.4',
                  marginBottom: '3rem',
                  margin: 0,
                  maxWidth: '800px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  "{testimonial.quote}"
                </blockquote>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2rem',
                  marginTop: '3rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '1px',
                    background: '#000000',
                    opacity: 0.3
                  }} />
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '400',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '300',
                      opacity: 0.7
                    }}>
                      {testimonial.title}, {testimonial.company}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '300',
                      opacity: 0.5,
                      marginTop: '0.25rem'
                    }}>
                      {testimonial.location}
                    </div>
                  </div>

                  <div style={{
                    width: '40px',
                    height: '1px',
                    background: '#000000',
                    opacity: 0.3
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '3rem'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: '40px',
                  height: '1px',
                  background: '#000000',
                  border: 'none',
                  opacity: index === currentTestimonial ? 1 : 0.3,
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process Section */}
      <section style={{
        padding: '10rem 2rem',
        background: '#ffffff',
        color: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            marginBottom: '6rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '400',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: '2rem'
            }}>
              Our Process
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: '100',
              margin: 0,
              color: '#000000'
            }}>
              How We Work
            </h2>
          </div>

          {/* Process Timeline - Responsive Layout */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: isMobile ? '0' : '1.5rem',
            flexWrap: 'nowrap',
            flexDirection: isMobile ? 'column' : 'row',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <ProcessCard 
              number={1}
              title="Discovery"
              description="We dive deep into your brand, understanding your vision, challenges, and goals. Every great project starts with listening."
              isMobile={isMobile}
            />
            
            <ProcessCard 
              number={2}
              title="Strategy"
              description="Strategic thinking meets creative vision. We craft roadmaps that transform your ideas into digital excellence."
              isMobile={isMobile}
            />
            
            <ProcessCard 
              number={3}
              title="Design"
              description="Where aesthetics meet functionality. Every pixel is purposefully placed to create experiences that captivate and convert."
              isMobile={isMobile}
            />
            
            <ProcessCard 
              number={4}
              title="Development"
              description="Cutting-edge technology brings designs to life. We build robust, scalable solutions that perform beautifully across all devices."
              isMobile={isMobile}
            />
          </div>
        </div>
      </section>

      {/* Recent Projects with GSAP Animation */}
      <section 
        ref={projectsRef}
        style={{
          padding: isMobile ? '5rem 1rem' : '10rem 2rem',
          background: '#000000',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          scrollMarginTop: isMobile ? '0' : 'var(--header-height)'
        }}
      >
        {/* UnicornStudio Animation Background - Extended Coverage */}
        <div 
          ref={unicornStudioRef}
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: 'calc(100% + 200px)',
            height: 'calc(100% + 200px)',
            opacity: 0.4,
            zIndex: 1,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          <div 
            data-us-project="FKIFfdeRTLKLSyqqQE08" 
            style={{
              width: '100%', 
              height: '100%',
              minWidth: '1640px',
              minHeight: '1100px',
              transform: 'scale(1.1)',
              transformOrigin: 'center center'
            }}
          />
        </div>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '6rem'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '400',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: '2rem'
            }}>
              Featured Work
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '100',
              margin: 0
            }}>
              Recent Projects
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '4rem',
            overflow: 'visible'
          }}>
            {[
              {
                category: "E-commerce Platform",
                title: "Artisan Marketplace",
                description: "Connecting local artisans with global audiences through minimalist design and seamless user experience."
              },
              {
                category: "Brand Identity",
                title: "TechnoVision Rebrand",
                description: "Complete visual identity transformation for a leading technology consultancy firm in Hyderabad."
              },
              {
                category: "Web Application",
                title: "FinanceFlow Dashboard",
                description: "Comprehensive financial analytics platform with real-time data visualization and intuitive user interface design."
              },
              {
                category: "Mobile App Design",
                title: "WellnessPro App",
                description: "Health and wellness mobile application featuring personalized workout plans and nutrition tracking capabilities."
              },
              {
                category: "SaaS Platform",
                title: "CloudSync Enterprise",
                description: "Cloud-based project management suite with advanced collaboration tools and automated workflow optimization for modern teams."
              },
              {
                category: "Restaurant App",
                title: "FoodieConnect",
                description: "Food delivery and restaurant discovery platform with AI-powered recommendations and seamless ordering experience."
              }
            ].map((project, index) => (
              <div 
                key={index}
                ref={(el) => (projectItemsRef.current[index] = el)}
                className="project-item"
                style={{
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '3rem',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  opacity: 0,
                  transform: 'translateY(100px)'
                }}
                onMouseEnter={() => handleProjectHover(index, true)}
                onMouseLeave={() => handleProjectHover(index, false)}
              >
                
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                  marginBottom: '1rem'
                }}>
                  {project.category}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '200',
                  marginBottom: '1.5rem',
                  margin: 0
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: '300',
                  lineHeight: '1.6',
                  opacity: 0.8,
                  marginBottom: '2rem'
                }}>
                  {project.description}
                </p>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '300',
                  opacity: 0.6
                }}>
                  View Case Study →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section style={{
        padding: isMobile ? '5rem 1rem' : '8rem 2rem',
        background: '#ffffff',
        color: '#000000'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '3rem' : '6rem'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '400',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: '2rem'
            }}>
              Latest Insights
            </div>
            <h2 style={{
              fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '100',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              From Our Blog
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              fontWeight: '300',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Expert insights on web development, SEO, digital marketing, and technology trends
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '2rem' : '3rem'
          }}>
            {[
              {
                id: 'organic-seo-content-traffic',
                title: 'Why Organic SEO Content is Your Best Investment for Long-Term Traffic',
                excerpt: 'Discover how creating quality, organic SEO content can drive sustainable traffic to your website and help your Hyderabad business dominate search rankings.',
                author: 'Digital Marketing Team',
                date: '2024-12-15',
                readTime: '7 min read',
                category: 'SEO'
              },
              {
                id: 'ai-advancements-2024-business',
                title: 'How AI Advancements in 2024 Are Transforming Small Business Marketing',
                excerpt: 'From ChatGPT to automated customer service, learn how the latest AI tools can help your business compete with larger companies.',
                author: 'Tech Innovation Team',
                date: '2024-12-10',
                readTime: '6 min read',
                category: 'Technology'
              },
              {
                id: 'complete-seo-guide-hyderabad',
                title: 'Complete SEO Guide for Hyderabad Businesses in 2024',
                excerpt: 'Master local SEO strategies specifically designed for Hyderabad businesses to attract more customers from your local area.',
                author: 'SEO Experts',
                date: '2024-11-20',
                readTime: '10 min read',
                category: 'Local SEO'
              }
            ].slice(0, isMobile ? 2 : 3).map((post, index) => (
              <article 
                key={post.id}
                style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onClick={() => window.open(`/blogs/${post.id}`, '_blank')}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{
                    backgroundColor: '#f8f9fa',
                    color: '#000000',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {post.category}
                  </span>
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.4rem',
                  fontWeight: '200',
                  color: '#000000',
                  marginBottom: '1rem',
                  lineHeight: '1.3',
                  margin: 0,
                  flexGrow: 1
                }}>
                  {post.title}
                </h3>

                <p style={{
                  color: '#666666',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  fontWeight: '300',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  flexGrow: 1
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  color: '#666666',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <div style={{
                  color: '#000000',
                  fontWeight: '400',
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Read Article 
                  <span style={{
                    transition: 'transform 0.3s ease'
                  }}>→</span>
                </div>
              </article>
            ))}
          </div>

          {/* View All Blogs Button */}
          <div style={{
            textAlign: 'center',
            marginTop: isMobile ? '3rem' : '4rem'
          }}>
            <Link href="/blogs">
              <button style={{
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                padding: isMobile ? '1rem 2rem' : '1.25rem 3rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#333333'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#000000'
                e.target.style.transform = 'translateY(0)'
              }}>
                View All Blog Posts
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced CTA Section with Horizontal Scrolling Text */}
      <section 
        ref={ctaRef}
        style={{
          height: isMobile ? '80vh' : '50vh',
          minHeight: isMobile ? '700px' : '500px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isMobile ? '3rem 1rem' : '2rem'
        }}
      >
        {/* Animated Background Grid */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(90deg, #ffffff 1px, transparent 1px),
            linear-gradient(180deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: ctaVisible ? 'translateX(0)' : 'translateX(-100px)',
          transition: 'transform 3s ease-out',
          zIndex: 1
        }} />

        {/* Two-Line Horizontal Scrolling Text Effect */}
        <div style={{
          width: '100%',
          minHeight: isMobile ? '200px' : '200px',
          height: isMobile ? 'auto' : '200px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: '3rem',
          zIndex: 2,
          padding: isMobile ? '2rem 0' : '0'
        }}>
          {isMobile ? (
            /* Mobile: Single centered text */
            <div 
              className="mobile-cta-container"
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 'fit-content',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
              <div 
                className="mobile-cta-text"
                style={{
                  fontSize: 'clamp(1.2rem, 7vw, 2.2rem)',
                  fontWeight: '900',
                  fontStyle: 'italic',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  lineHeight: '1.3',
                  opacity: ctaVisible ? 1 : 0,
                  transform: `translateY(${ctaVisible ? 0 : 30}px)`,
                  transition: 'all 2s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  transitionDelay: '0.3s',
                  textShadow: '0 4px 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  wordWrap: 'break-word',
                  hyphens: 'auto'
                }}>
                LET'S CREATE SOMETHING<br />EXTRAORDINARY TOGETHER
              </div>
            </div>
          ) : (
            /* Desktop: Original animated text */
            <>
              {/* First Line: "Let's Create Something" - Right to Left */}
              <div style={{
                position: 'relative',
                height: '90px',
                width: '100vw',
                left: '50%',
                transform: 'translateX(-50%)',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: '900',
                  fontStyle: 'italic',
                  color: '#cccccc',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  // Scroll from right to left, stop at center
                  transform: `translateX(${ctaVisible ? 
                    Math.max(-25, 75 - ((scrollY - ctaScrollOffset) * 0.12)) : 75}%) translateZ(0)`,
                  transition: ctaVisible ? 'none' : 'transform 2.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  opacity: ctaVisible ? 0.8 : 0,
                  transitionDelay: '0.3s',
                  transformOrigin: 'left center',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}>
                  Let's Create Something&nbsp;&nbsp;&nbsp;
                </div>
              </div>

              {/* Second Line: "Extraordinary Together" - Left to Right */}
              <div style={{
                position: 'relative',
                height: '90px',
                width: '100vw',
                left: '50%',
                transform: 'translateX(-50%)',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: '900',
                  fontStyle: 'italic',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  // Scroll from left to right, stop at center
                  transform: `translateX(${ctaVisible ? 
                    Math.min(25, -75 + ((scrollY - ctaScrollOffset) * 0.12)) : -75}%) translateZ(0)`,
                  transition: ctaVisible ? 'none' : 'transform 2.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  opacity: ctaVisible ? 1 : 0,
                  transitionDelay: '0.6s',
                  transformOrigin: 'right center',
                  textShadow: '0 4px 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}>
                  Extraordinary Together&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </>
          )}

          {/* Subtle Background Lines for Depth */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            opacity: ctaVisible ? 1 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: '1.2s'
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            opacity: ctaVisible ? 1 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: '1.5s'
          }} />

          {/* Center alignment guide (invisible) */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '2px',
            height: '100%',
            background: 'rgba(255,255,255,0.05)',
            transform: 'translate(-50%, -50%)',
            opacity: ctaVisible ? 0.3 : 0,
            transition: 'opacity 2s ease',
            transitionDelay: '2s'
          }} />
        </div>

        {/* Animated Divider */}
        <div style={{
          width: ctaVisible ? '200px' : '0px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
          marginBottom: '3rem',
          transition: 'width 1.5s ease-out',
          transitionDelay: '1.2s',
          opacity: ctaVisible ? 1 : 0,
          zIndex: 2
        }} />

        {/* Subtitle with Stagger Effect */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          zIndex: 2
        }}>
          {['Ready', 'to', 'bridge', 'the', 'gap', 'between', 'vision', '&', 'reality?'].map((word, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                fontSize: '1.25rem',
                fontWeight: '300',
                color: '#ffffff',
                opacity: ctaVisible ? 0.9 : 0,
                transform: `translateY(${ctaVisible ? 0 : 20}px)`,
                transition: `all 0.6s ease-out`,
                transitionDelay: `${1.5 + index * 0.1}s`,
                margin: '0 8px',
                fontStyle: index === 7 ? 'italic' : 'normal' // Make '&' italic
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* CTA Button with Advanced Effects */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          opacity: ctaVisible ? 1 : 0,
          transform: `translateY(${ctaVisible ? 0 : 30}px) scale(${ctaVisible ? 1 : 0.9})`,
          transition: 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)',
          transitionDelay: '2.5s',
          marginBottom: isMobile ? '3rem' : '0'
        }}>
          {/* Button Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(45deg, #ffffff, transparent, #ffffff, transparent, #ffffff)',
            borderRadius: '2px',
            opacity: ctaVisible ? 0.3 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: '3s'
          }} />
          
          <Link href="/contact">
            <button style={{
              position: 'relative',
              fontSize: '0.875rem',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#ffffff',
              backgroundColor: '#000000',
              border: '2px solid #000000',
              padding: '1.5rem 4rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#333333'
              e.target.style.color = '#ffffff'
              e.target.style.border = '2px solid #333333'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#000000'
              e.target.style.color = '#ffffff'
              e.target.style.border = '2px solid #000000'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
            >
              {/* Button Background Animation */}
              <span style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s ease'
              }} />
              
              Start Your Project
            </button>
          </Link>
        </div>

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              opacity: ctaVisible ? 0.4 : 0,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transition: 'opacity 1s ease',
              transitionDelay: `${2 + i * 0.2}s`,
              zIndex: 1
            }}
          />
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: '4rem 2rem 2rem',
        background: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem'
        }}>
          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: '400',
              marginBottom: '1rem'
            }}>
              Contact
            </div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '300',
              opacity: 0.7,
              lineHeight: '1.6'
            }}>
              Hyderabad, Telangana<br />
              hello@bridgesoftwaresolutions.com<br />
              +91 9996 999 770
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: '400',
              marginBottom: '1rem'
            }}>
              Navigate
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <a href="/about" style={{ 
                fontSize: '0.875rem',
                fontWeight: '300',
                opacity: 0.7,
                color: '#000000',
                textDecoration: 'none'
              }}>About</a>
              <a href="/services" style={{ 
                fontSize: '0.875rem',
                fontWeight: '300',
                opacity: 0.7,
                color: '#000000',
                textDecoration: 'none'
              }}>Services</a>
              <a href="/blogs" style={{ 
                fontSize: '0.875rem',
                fontWeight: '300',
                opacity: 0.7,
                color: '#000000',
                textDecoration: 'none'
              }}>Journal</a>
              <a href="/contact" style={{ 
                fontSize: '0.875rem',
                fontWeight: '300',
                opacity: 0.7,
                color: '#000000',
                textDecoration: 'none'
              }}>Contact</a>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: '300',
          opacity: 0.5
        }}>
          © 2024 Bridge Software Solutions. All rights reserved.
        </div>
      </footer>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }

        /* Service Card Hover Effects - Prevents Stacking */
        .service-card {
          will-change: transform, background, box-shadow;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .service-card:not(.active):hover {
          background: rgba(255,255,255,0.04) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2) !important;
        }
        
        .service-card:not(.active):not(:hover) {
          background: rgba(255,255,255,0.02) !important;
          transform: translateY(0) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
        }

        /* Stats Animation Performance Optimization */
        .stat-item {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Projects Animation Performance Optimization */
        .project-item {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Project Hover Effects */
        .project-item {
          will-change: transform, box-shadow;
          backface-visibility: hidden;
        }
        
        .project-item:hover {
          transform: translateY(-8px) translateZ(0);
          box-shadow: 0 15px 50px rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2) !important;
        }

        /* Dot Animation Keyframes */
        @keyframes dotGlow {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4);
          }
          50% { 
            box-shadow: 0 0 25px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.6);
          }
        }

        /* Enhanced dot visibility */
        .project-item:hover [id^="project-dot-"] {
          animation: dotGlow 1s ease-in-out infinite;
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          /* Prevent horizontal scroll */
          body {
            overflow-x: hidden;
          }
          
          /* Ensure CTA text container is responsive to content */
          .mobile-cta-container {
            min-height: fit-content !important;
            height: auto !important;
            padding: 2rem 1rem !important;
          }
          
          /* Responsive CTA text sizing */
          .mobile-cta-text {
            font-size: clamp(1.2rem, 7vw, 2.2rem) !important;
            line-height: 1.3 !important;
            word-wrap: break-word !important;
            hyphens: auto !important;
          }
          
          /* Mobile typography adjustments */
          h1 {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }
          
          h2 {
            font-size: clamp(1.5rem, 6vw, 2.5rem) !important;
          }
          
          h3 {
            font-size: clamp(1.25rem, 5vw, 2rem) !important;
          }
          
          p {
            font-size: clamp(0.875rem, 4vw, 1.125rem) !important;
            line-height: 1.6 !important;
          }
          
          /* Mobile spacing */
          section {
            padding: 3rem 1rem !important;
          }
          
          /* Mobile grid improvements */
          .mobile-single-column {
            grid-template-columns: 1fr !important;
          }
          
          /* Touch-friendly buttons */
          button, a {
            min-height: 44px;
            min-width: 44px;
            padding: 0.75rem 1rem !important;
          }
          
          /* CTA section mobile spacing */
          .mobile-cta-section {
            height: 80vh !important;
            min-height: 700px !important;
            padding: 3rem 1rem !important;
          }
          
          /* Mobile video optimizations */
          video {
            object-position: center !important;
          }
          
          /* Disable complex animations on mobile for performance */
          @media (max-width: 480px) {
            .complex-animation {
              animation: none !important;
              transform: none !important;
            }
          }
        }

        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          section {
            padding: 6rem 2rem !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          /* Remove hover effects on touch devices */
          *:hover {
            transform: none !important;
          }
          
          /* Make buttons more touch-friendly */
          button {
            padding: 1rem 1.5rem !important;
            border-radius: 8px !important;
          }
        }
      `}</style>
      </div>
    </>
  )
}