/**
 * Demo component showing how to integrate KeywordBelts
 * This demonstrates proper positioning within a testimonials section
 */

import React from 'react'
import KeywordBelts from './KeywordBelts'

export default function KeywordBeltsDemo() {
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
    }
  ]

  return (
    <section 
      style={{
        padding: '10rem 2rem',
        background: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative', // Required for absolute positioning of belts
        minHeight: '600px'
      }}
    >
      {/* Integration Example: KeywordBelts positioned at edges */}
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
        className="testimonials-belts"
      />
      
      {/* Main testimonials content */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 1 // Ensure content is above belts
      }}>
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

        {/* Sample testimonial */}
        <div style={{
          position: 'relative',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
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
              "{testimonials[0].quote}"
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
                background: '#ffffff',
                opacity: 0.3
              }} />
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  marginBottom: '0.25rem'
                }}>
                  {testimonials[0].name}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '300',
                  opacity: 0.7
                }}>
                  {testimonials[0].title}, {testimonials[0].company}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '300',
                  opacity: 0.5,
                  marginTop: '0.25rem'
                }}>
                  {testimonials[0].location}
                </div>
              </div>

              <div style={{
                width: '40px',
                height: '1px',
                background: '#ffffff',
                opacity: 0.3
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional theming */}
      <style jsx>{`
        :global(.testimonials-belts) {
          /* Custom theming for this specific instance */
          --belt-height: 40px;
          --belt-font-size: 13px;
          --belt-letter-spacing: 0.15em;
        }
        
        @media (max-width: 768px) {
          :global(.testimonials-belts) {
            --belt-height: 32px;
            --belt-font-size: 11px;
          }
        }
      `}</style>
    </section>
  )
}