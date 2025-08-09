import { motion } from 'framer-motion'
import Link from 'next/link'

const CTASection = () => {
  const features = [
    'No more IndiaMART dependence',
    'Modern React & Three.js websites',
    'SEO-optimized for organic growth',
    'Mobile-first responsive design',
    '24/7 support & maintenance'
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Be <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Un-Conventional?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Stop paying monthly fees to lead-gen platforms. Let your website 
              generate leads 24/7 with our modern web development and SEO services.
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center text-gray-300"
                >
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Your Project
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  View Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Success Metrics Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Our Track Record</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: '300%', label: 'Lead Increase' },
                  { metric: '95%', label: 'Client Satisfaction' },
                  { metric: '50+', label: 'Projects Delivered' },
                  { metric: '24/7', label: 'Support Available' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {stat.metric}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom section with contact info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="border-t border-white/20 mt-16 pt-8 text-center"
      >
        <p className="text-gray-300 mb-2">
          Questions? Call us at{' '}
          <a 
            href="tel:+91XXXXXXXXXX" 
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            +91-XXXXXXXXXX
          </a>
          {' '}or email{' '}
          <a 
            href="mailto:hello@bridgesoftwaresolutions.com" 
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            hello@bridgesoftwaresolutions.com
          </a>
        </p>
        <p className="text-gray-400 text-sm">
          Serving clients in India, USA, and Australia • Available Mon-Fri 9AM-6PM IST
        </p>
      </motion.div>
    </section>
  )
}

export default CTASection