import Head from 'next/head'

export default function Services() {
  return (
    <>
      <Head>
        <title>Web Development Services in Hyderabad - React, Three.js, SEO | Bridge Software Solutions</title>
        <meta name="description" content="Professional web development services in Hyderabad including React development, Three.js 3D websites, SEO services, and digital marketing. Get a free consultation today." />
        <meta name="keywords" content="React development Hyderabad, Three.js websites, SEO services Hyderabad, web development services, digital marketing agency Hyderabad, Next.js developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href="https://www.bridgedm.com/services" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Web Development Services in Hyderabad - React, Three.js, SEO" />
        <meta property="og:description" content="Professional web development services including React development, Three.js 3D websites, SEO services, and digital marketing." />
        <meta property="og:url" content="https://www.bridgedm.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bridge Software Solutions" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Services in Hyderabad - React, Three.js, SEO" />
        <meta name="twitter:description" content="Professional web development services including React development, Three.js 3D websites, SEO services, and digital marketing." />
      </Head>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#2563eb' }}>Our Services</h1>
      <p>Comprehensive web development, SEO, and digital marketing services.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        
        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <h3>⚛️ React Development</h3>
          <p>Modern, fast-loading websites built with React and Next.js.</p>
          <ul>
            <li>Server-side rendering</li>
            <li>SEO optimized</li>
            <li>Mobile-first design</li>
            <li>Performance optimized</li>
          </ul>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <h3>📈 SEO Services</h3>
          <p>Comprehensive SEO strategies to improve search rankings.</p>
          <ul>
            <li>Technical SEO audit</li>
            <li>Keyword research</li>
            <li>Content optimization</li>
            <li>Local SEO in Hyderabad</li>
          </ul>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <h3>🎯 Three.js Websites</h3>
          <p>Interactive 3D websites with scroll animations.</p>
          <ul>
            <li>WebGL animations</li>
            <li>Scroll-triggered effects</li>
            <li>Interactive 3D models</li>
            <li>Performance optimization</li>
          </ul>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <h3>📱 Digital Marketing</h3>
          <p>Full-service digital marketing to grow your online presence.</p>
          <ul>
            <li>Social media marketing</li>
            <li>Content marketing</li>
            <li>PPC campaigns</li>
            <li>Analytics & reporting</li>
          </ul>
        </div>

      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
        <h2>Ready to Get Started?</h2>
        <p>Contact us today for a free consultation and quote.</p>
        <a href="/contact" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '6px', marginTop: '1rem' }}>
          Get Quote
        </a>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ marginRight: '1rem', color: '#2563eb' }}>← Back to Home</a>
        <a href="/about" style={{ marginRight: '1rem', color: '#2563eb' }}>About</a>
        <a href="/contact" style={{ color: '#2563eb' }}>Contact</a>
      </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/919996999770"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          width: '56px',
          height: '56px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 9998,
          transition: 'all 0.3s ease',
          textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)'
          e.target.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)'
          e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
    </>
  )
}