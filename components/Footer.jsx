import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    services: [
      { label: 'Web Development', href: '/services#web-development' },
      { label: 'SEO Services', href: '/services#seo-services' },
      { label: 'Digital Marketing', href: '/services#digital-marketing' },
      { label: 'UI/UX Design', href: '/services#ui-ux-design' },
      { label: 'Branding', href: '/services#branding' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blogs' }
    ],
    resources: [
      { label: 'SEO Guide', href: '/blogs/seo-guide' },
      { label: 'Web Performance', href: '/blogs/web-performance' },
      { label: 'React Best Practices', href: '/blogs/react-practices' },
      { label: 'Digital Strategy', href: '/blogs/digital-strategy' }
    ]
  }

  const socialLinks = [
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/company/bridge-software-solutions',
      icon: '📧'
    },
    { 
      label: 'Twitter', 
      href: 'https://twitter.com/bridgesoftware',
      icon: '🐦'
    },
    { 
      label: 'Instagram', 
      href: 'https://instagram.com/bridgesoftware',
      icon: '📸'
    },
    { 
      label: 'GitHub', 
      href: 'https://github.com/bridge-software-solutions',
      icon: '⚡'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">
                  Bridge Software
                </span>
                <span className="text-sm text-gray-400">Solutions</span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Leading web development company in Hyderabad specializing in React, Three.js, SEO services & digital marketing. 
              <strong className="text-white"> Be unconventional</strong>, let your website speak.
            </p>
            
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                📍 Hyderabad, Telangana, India
              </p>
              <p className="flex items-center">
                📧 hello@bridgesoftwaresolutions.com
              </p>
              <p className="flex items-center">
                📞 +91-XXXXXXXXXX
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest insights on web development, SEO, and digital marketing.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Bridge Software Solutions. All rights reserved.
              <span className="ml-4">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="mx-2">•</span>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bridge Software Solutions",
            "description": "Web Development Company in Hyderabad specializing in React, Three.js, SEO services & digital marketing",
            "url": "https://bridgesoftwaresolutions.com",
            "telephone": "+91-XXXXXXXXXX",
            "email": "hello@bridgesoftwaresolutions.com",
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
            "openingHours": "Mo-Fr 09:00-18:00",
            "serviceArea": ["Hyderabad", "India", "USA", "Australia"],
            "services": [
              "Web Development",
              "SEO Services",
              "Digital Marketing", 
              "UI/UX Design",
              "Branding"
            ]
          })
        }}
      />
    </footer>
  )
}

export default Footer