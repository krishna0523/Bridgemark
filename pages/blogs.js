import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger)

export default function BlogIndex() {
  const [navVisible, setNavVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('blogs')
  const lenisRef = useRef()
  const heroRef = useRef()
  const blogGridRef = useRef()
  const navRef = useRef()

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref?.current && lenisRef.current) {
      lenisRef.current.scrollTo(ref.current, { 
        duration: 2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      })
    }
  }

  // Initialize Lenis smooth scrolling
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

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.destroy()
        gsap.ticker.remove()
      }
    }
  }, [])

  // GSAP Animations
  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          delay: 0.3
        }
      )
    }

    // Blog grid animation
    if (blogGridRef.current) {
      const blogCards = blogGridRef.current.querySelectorAll('.blog-card')
      gsap.fromTo(blogCards,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: blogGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
  const blogPosts = [
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
      excerpt: 'From ChatGPT to automated customer service, learn how the latest AI tools can help your business compete with larger companies and improve customer experience.',
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
  ]

  return (
    <>
      <SEO 
        title="Expert Blog - Web Development, SEO & Digital Marketing Insights | Bridge Software Solutions"
        description="Stay updated with the latest trends in web development, SEO strategies, digital marketing tips, and technology insights. Expert advice from Hyderabad's leading software company."
        keywords={[
          'web development blog',
          'SEO blog',
          'digital marketing insights',
          'technology trends',
          'Hyderabad tech blog',
          'software development tips',
          'React development',
          'business growth strategies',
          'local SEO guide',
          'AI in business'
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Bridge Software Solutions Blog",
          "description": "Expert insights on web development, SEO, digital marketing, and design to help your business grow online",
          "url": "https://bridgesoftwaresolutions.com/blogs",
          "publisher": {
            "@type": "Organization",
            "name": "Bridge Software Solutions",
            "logo": "https://bridgesoftwaresolutions.com/logo.png"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://bridgesoftwaresolutions.com/blogs"
          }
        }}
      />
      
      <div style={{ 
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#ffffff',
        color: '#000000',
        lineHeight: '1.6'
      }}>
        {/* Navigation */}
        <nav 
          ref={navRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '1rem 2rem',
            background: navVisible ? 'rgba(255,255,255,0.95)' : 'transparent',
            backdropFilter: navVisible ? 'blur(20px)' : 'none',
            borderBottom: navVisible ? '1px solid rgba(0,0,0,0.1)' : 'none',
            transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
            opacity: navVisible ? 1 : 0
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Logo */}
            <Link 
              href="/"
              onClick={() => {
                sessionStorage.setItem('fromBlog', 'true')
              }}
            >
              <div style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img 
                  src="/BRIDGE.png" 
                  alt="Bridge Software Solutions Logo" 
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </Link>
            
            {/* Navigation Links */}
            <div style={{
              display: 'flex',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {[
                { name: 'Home', key: 'home', href: '/' },
                { name: 'Services', key: 'services', href: '/#services' },
                { name: 'Projects', key: 'projects', href: '/#projects' }
              ].map((item) => (
                <Link 
                  key={item.key} 
                  href={item.href}
                  onClick={() => {
                    if (item.key === 'home') {
                      sessionStorage.setItem('fromBlog', 'true')
                    }
                  }}
                >
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
                    {item.name}
                  </button>
                </Link>
              ))}

              {/* Blogs Link - Active */}
              <button style={{
                background: 'none',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
                color: '#000000',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
              }}>
                Blogs
              </button>
              
              {/* Contact Button */}
              <Link href="/contact">
                <button style={{
                  background: '#000000',
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
                  e.target.style.background = '#333333'
                  e.target.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#000000'
                  e.target.style.transform = 'translateY(0)'
                }}
                >
                  Contact
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          ref={heroRef}
          style={{
            paddingTop: '8rem',
            paddingBottom: '4rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#666666',
              marginBottom: '1rem'
            }}>
              Blog
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '200',
              lineHeight: '1.2',
              marginBottom: '2rem',
              color: '#000000'
            }}>
              Expert Insights & Industry Knowledge
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: '300'
            }}>
              Stay updated with the latest trends in web development, SEO strategies, digital marketing tips, and technology insights from Hyderabad's leading software company.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section style={{ padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div 
              ref={blogGridRef}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '3rem'
              }}
            >
              {blogPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="blog-card"
                  style={{ 
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '12px', 
                    padding: '2rem',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    cursor: 'pointer',
                    opacity: 0,
                    transform: 'translateY(100px)'
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

                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '200', 
                    color: '#000000',
                    marginBottom: '1rem',
                    lineHeight: '1.3',
                    margin: 0
                  }}>
                    {post.title}
                  </h2>

                  <p style={{ 
                    color: '#666666', 
                    marginBottom: '2rem',
                    lineHeight: '1.6',
                    fontWeight: '300'
                  }}>
                    {post.excerpt}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontSize: '0.875rem',
                    color: '#666666',
                    marginBottom: '2rem'
                  }}>
                    <span>{post.author}</span>
                    <span style={{ margin: '0 0.5rem' }}>•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span style={{ margin: '0 0.5rem' }}>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blogs/${post.id}`} style={{ 
                    color: '#000000', 
                    fontWeight: '400',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em'
                  }}>
                    Read Article →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section style={{
          padding: '6rem 2rem',
          background: '#000000',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '200',
              marginBottom: '1rem',
              margin: 0
            }}>
              Stay Updated
            </h2>
            
            <p style={{ 
              color: '#666666', 
              marginBottom: '3rem',
              fontSize: '1.125rem',
              fontWeight: '300'
            }}>
              Get the latest insights delivered directly to your inbox.
            </p>
            
            <form style={{ 
              display: 'flex', 
              gap: '1rem', 
              maxWidth: '400px', 
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={{ 
                  flex: '1', 
                  minWidth: '250px',
                  padding: '1rem', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontFamily: 'inherit'
                }}
                required
              />
              <button
                type="submit"
                style={{ 
                  padding: '1rem 2rem', 
                  backgroundColor: '#ffffff', 
                  color: '#000000', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ 
          padding: '2rem', 
          textAlign: 'center',
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.875rem' }}>Home</Link>
            <Link href="/contact" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.875rem' }}>Contact</Link>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        h1, h2, h3, h4, h5, h6 {
          margin: 0;
        }
        
        p, ul, ol {
          margin: 0;
        }
        
        a {
          transition: color 0.2s ease;
        }

        .blog-card:hover a {
          color: #333333;
        }

        input::placeholder {
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </>
  )
}