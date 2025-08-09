import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import { motion } from 'framer-motion'

export default function Contact() {
  const contactInfo = [
    {
      type: 'Location',
      value: 'Hyderabad, Telangana, India',
      icon: '📍',
      link: 'https://goo.gl/maps/hyderabad'
    },
    {
      type: 'Email',
      value: 'hello@bridgesoftwaresolutions.com',
      icon: '📧',
      link: 'mailto:hello@bridgesoftwaresolutions.com'
    },
    {
      type: 'Phone',
      value: '+91 9996 999 770',
      icon: '📞',
      link: 'tel:+919996999770'
    },
    {
      type: 'Business Hours',
      value: 'Mon-Fri: 9:00 AM - 6:00 PM IST',
      icon: '🕒',
      link: null
    }
  ]

  const services = [
    'Web Development (React, Next.js)',
    'Three.js & WebGL Development', 
    'SEO & Technical Optimization',
    'Digital Marketing & PPC',
    'UI/UX Design & Branding',
    'Website Maintenance & Support',
    'E-commerce Development',
    'Performance Optimization'
  ]

  return (
    <>
      <SEO 
        title="Contact Us | Lead Generation Through SEO | Conversion Optimized Design India"
        description="Get in touch with Bridge Software Solutions for web development, SEO services, and digital marketing. Lead generation through SEO and conversion optimized design in India."
        keywords={[
          'lead generation through SEO',
          'conversion optimized design India',
          'Google Maps SEO optimization',
          'web development company contact',
          'SEO services Hyderabad contact',
          'digital marketing consultation'
        ]}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let's Build Something <span className="text-gradient">Amazing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to eliminate dependence on subscription platforms? Let's discuss 
              how we can help your website speak for itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.type} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{info.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.type}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-600">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Services List */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Our Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white">
                <h3 className="font-semibold mb-4">Why Choose Bridge Software?</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-blue-200 text-sm">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-blue-200 text-sm">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-blue-200 text-sm">Support Available</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3+</div>
                    <div className="text-blue-200 text-sm">Countries Served</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 50+ businesses who've eliminated their dependence on subscription platforms 
              with our custom web solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bridge Software Solutions",
            "description": "Web development company in Hyderabad specializing in React, Three.js, SEO services & digital marketing",
            "url": "https://bridgesoftwaresolutions.com",
            "telephone": "+91 9996 999 770",
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
            "priceRange": "₹₹",
            "serviceArea": ["Hyderabad", "India", "USA", "Australia"]
          })
        }}
      />
    </>
  )
}