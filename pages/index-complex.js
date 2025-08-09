import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import ServicesPreview from '../components/ServicesPreview'
import TestimonialsSection from '../components/TestimonialsSection'
import CTASection from '../components/CTASection'

const keywordData = {
  primary: 'web development company in Hyderabad',
  secondary: ['SEO services in Hyderabad', 'digital marketing company India', 'React website developers India', 'top web development agency India'],
  longTail: ['B2B website design agency', 'three.js website developers', 'scroll animation websites India']
}

export default function Home() {
  return (
    <>
      <SEO 
        title="Bridge Software Solutions | Web Development Company in Hyderabad | SEO Services"
        description="Leading web development company in Hyderabad specializing in React, Three.js, SEO services & digital marketing. Be unconventional, let your website speak. Eliminate dependence on subscription platforms."
        keywords={[...keywordData.secondary, ...keywordData.longTail]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bridge Software Solutions",
          "description": "Web Development, SEO, and Branding Solutions",
          "url": "https://bridgesoftwaresolutions.com",
          "logo": "https://bridgesoftwaresolutions.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 9996 999 770",
            "contactType": "Customer Service",
            "areaServed": ["IN", "US", "AU"],
            "availableLanguage": ["English", "Hindi"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "India"
          },
          "serviceArea": ["Hyderabad", "India", "USA", "Australia"],
          "services": [
            "Web Development",
            "SEO Services", 
            "Digital Marketing",
            "Branding"
          ]
        }}
      />
      
      <HeroSection />
      <ServicesPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}