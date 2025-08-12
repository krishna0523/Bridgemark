import Head from 'next/head'

export default function Services() {
  return (
    <>
      <Head>
        <title>Web Development Services in Hyderabad - React, Three.js, SEO | Bridge Software Solutions</title>
        <meta name="description" content="Professional web development services in Hyderabad including React development, Three.js 3D websites, SEO services, and digital marketing. Get a free consultation today." />
        <meta name="keywords" content="React development Hyderabad, Three.js websites, SEO services Hyderabad, web development services, digital marketing agency Hyderabad, Next.js developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.bridgedm.com/services" />
        <meta property="og:title" content="Web Development Services in Hyderabad - React, Three.js, SEO" />
        <meta property="og:description" content="Professional web development services including React development, Three.js 3D websites, SEO services, and digital marketing." />
        <meta property="og:url" content="https://www.bridgedm.com/services" />
        <meta property="og:type" content="website" />
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
    </>
  )
}