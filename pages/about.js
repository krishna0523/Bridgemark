export default function About() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb' }}>About Bridge Software Solutions</h1>
      <p>Leading web development company in Hyderabad specializing in React, Three.js, SEO services & digital marketing.</p>
      
      <h2>Our Mission</h2>
      <p>To help businesses <strong>be unconventional</strong> and eliminate their dependence on subscription-based lead generation platforms like IndiaMART and Justdial.</p>
      
      <h2>Our Services</h2>
      <ul>
        <li>React & Next.js Development</li>
        <li>Three.js 3D Websites</li>
        <li>SEO Services in Hyderabad</li>
        <li>Digital Marketing</li>
        <li>UI/UX Design</li>
        <li>Website Maintenance</li>
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ marginRight: '1rem', color: '#2563eb' }}>← Back to Home</a>
        <a href="/services" style={{ marginRight: '1rem', color: '#2563eb' }}>Services</a>
        <a href="/contact" style={{ color: '#2563eb' }}>Contact</a>
      </div>
    </div>
  )
}