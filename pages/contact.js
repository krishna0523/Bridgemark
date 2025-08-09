import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Web3ContactForm from '../components/Web3ContactForm'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [navVisible, setNavVisible] = useState(true) // Always visible on contact page
  
  const lenisRef = useRef()
  const heroRef = useRef()
  const contactInfoRef = useRef([])
  const formRef = useRef()
  const mapRef = useRef()

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

    // Contact info stagger animation
    if (contactInfoRef.current.length > 0) {
      gsap.fromTo(contactInfoRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: contactInfoRef.current[0],
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Map animation
    if (mapRef.current) {
      gsap.fromTo(mapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  const contactMethods = [
    {
      icon: "✉",
      title: "Email Us",
      primary: "hello@bridgesoftwaresolutions.com",
      secondary: "Response within 24 hours",
      action: "mailto:hello@bridgesoftwaresolutions.com"
    },
    {
      icon: "📞",
      title: "Call Us",
      primary: "+91 9996 999 770",
      secondary: "Mon - Fri, 9:00 AM - 6:00 PM IST",
      action: "tel:+919996999770"
    },
    {
      icon: "📍",
      title: "Visit Us",
      primary: "Hyderabad, Telangana",
      secondary: "Schedule an appointment",
      action: "#location"
    },
    {
      icon: "💬",
      title: "Live Chat",
      primary: "Instant Support",
      secondary: "Available during business hours",
      action: "#chat"
    }
  ]


  return (
    <div style={{ 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: '#ffffff',
      color: '#000000',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Contact - Bridge Software Solutions</title>
        <meta name="description" content="Get in touch with Bridge Software Solutions. Let's bridge the gap between your vision and digital reality." />
        <meta name="keywords" content="contact, bridge software solutions, web development, digital agency, hyderabad" />
        <link rel="icon" href="/bridge-favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/bridge-favicon.svg" />
        <meta name="msapplication-TileImage" content="/bridge-favicon.svg" />
      </Head>

      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link href="/">
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
            <Link href="/">
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
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Home
              </button>
            </Link>

            <Link href="/#services">
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
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Services
              </button>
            </Link>

            <Link href="/#projects">
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
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Projects
              </button>
            </Link>

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
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#000000'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666'
                e.target.style.transform = 'scale(1)'
              }}>
                Blogs
              </button>
            </Link>

            {/* Contact Button - Active */}
            <button style={{
              background: '#000000',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              cursor: 'default',
              fontFamily: 'inherit',
              position: 'relative'
            }}>
              Contact
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '1px',
                background: '#ffffff'
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '60vh',
        paddingTop: '6rem', // Account for fixed navigation
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: '#ffffff'
      }}>
        <div 
          ref={heroRef}
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            padding: '0 2rem',
            zIndex: 2
          }}
        >
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '400',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: '2rem'
          }}>
            Let's Work Together
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '100',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: '2rem'
          }}>
            Ready to Bridge<br />
            Your Vision?
          </h1>

          <div style={{
            width: '80px',
            height: '1px',
            background: '#ffffff',
            margin: '2rem auto',
            opacity: 0.8
          }} />
          
          <p style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            lineHeight: '1.6',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            From concept to launch, we create digital experiences that matter. 
            Let's discuss how we can transform your ideas into reality.
          </p>
        </div>

        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 15s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite reverse'
        }} />
      </section>

      {/* Contact Methods */}
      <section style={{
        padding: '8rem 2rem',
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              Get In Touch
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '100',
              margin: 0
            }}>
              Choose Your Preferred Way
            </h2>
          </div>

          <div 
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem'
            }}
          >
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                ref={(el) => (contactInfoRef.current[index] = el)}
                className="contact-method"
                style={{
                  display: 'block',
                  padding: '2rem 1.5rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  cursor: 'pointer',
                  opacity: 0,
                  transform: 'translateY(100px)'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1.5rem',
                  opacity: 0.8
                }}>
                  {method.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '400',
                  marginBottom: '1rem',
                  margin: 0
                }}>
                  {method.title}
                </h3>
                
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: '#000000'
                }}>
                  {method.primary}
                </div>
                
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '300',
                  opacity: 0.7
                }}>
                  {method.secondary}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section style={{
        padding: '8rem 2rem',
        background: 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '6rem',
            alignItems: 'start'
          }}>
            
            {/* Contact Form with Web3Forms */}
            <div ref={formRef} style={{ opacity: 0, transform: 'translateX(50px)' }}>
              <Web3ContactForm />
            </div>

            {/* Map & Location Info */}
            <div ref={mapRef} style={{ opacity: 0, transform: 'scale(0.95)' }}>
              <div style={{
                marginBottom: '3rem'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: '200',
                  marginBottom: '1rem',
                  margin: 0
                }}>
                  Visit Our Office
                </h2>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: '300',
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Located in the heart of Hyderabad's tech corridor, we're easily accessible and always ready to meet.
                </p>
              </div>

              {/* Interactive Map with Custom Styling */}
              <div style={{
                width: '100%',
                height: '400px',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid rgba(0,0,0,0.1)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="/snazzy-image-2.png"
                  alt="Interactive map showing Bridge Software Solutions location in Hyderabad"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                  }}
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `
                      <div style="
                        width: 100%; 
                        height: 100%; 
                        background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
                        display: flex; 
                        align-items: center; 
                        justify-content: center;
                        flex-direction: column;
                        color: #666666;
                      ">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">🗺️</div>
                        <div style="font-size: 1rem; font-weight: 500;">Interactive Map</div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Hyderabad, Telangana</div>
                      </div>
                    `
                  }}
                />
                
                {/* Map Overlay with Location Marker */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0,0,0,0.8)',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '1'
                  e.target.style.transform = 'translate(-50%, -50%) scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '0.9'
                  e.target.style.transform = 'translate(-50%, -50%) scale(1)'
                }}
                >
                  <span>📍</span>
                  <span>Bridge Software Solutions</span>
                </div>
              </div>

              {/* Office Details */}
              <div style={{
                padding: '2rem',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  marginBottom: '1.5rem',
                  margin: 0
                }}>
                  Office Information
                </h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Address:</strong><br />
                  Bridge Software Solutions<br />
                  Hyderabad, Telangana, India
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Business Hours:</strong><br />
                  Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                  Saturday: 10:00 AM - 2:00 PM IST
                </div>
                
                <div>
                  <strong>Directions:</strong><br />
                  Easily accessible by metro and road.<br />
                  Visitor parking available.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: '8rem 2rem',
        background: '#000000',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '100',
              margin: 0
            }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on scope and complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! We work with clients globally and have experience managing projects across different time zones. We use modern collaboration tools to ensure smooth communication."
              },
              {
                question: "What's included in your post-launch support?",
                answer: "All projects include 30 days of complimentary support post-launch. We also offer ongoing maintenance packages for long-term partnership and continuous optimization."
              },
              {
                question: "How do you handle project payments?",
                answer: "We typically work with a 50% upfront payment and 50% on completion for smaller projects. Larger projects are broken into milestones with payments tied to deliverables."
              }
            ].map((faq, index) => (
              <div key={index} style={{
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '400',
                  marginBottom: '1rem',
                  margin: 0
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '300',
                  lineHeight: '1.6',
                  opacity: 0.8,
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

        .contact-method:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 50px rgba(0,0,0,0.1);
          border-color: rgba(0,0,0,0.2);
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        input:focus, textarea:focus, select:focus {
          border-color: #000000 !important;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.1) !important;
        }

        button:hover:not(:disabled) {
          background: #333333 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}