import { motion } from 'framer-motion'
import Link from 'next/link'

const ServicesPreview = () => {
  const services = [
    {
      title: 'React Development',
      description: 'Modern, fast-loading websites built with React and Next.js for optimal performance.',
      icon: '⚛️',
      link: '/services#react-development'
    },
    {
      title: 'SEO Services', 
      description: 'Comprehensive SEO strategies to improve search rankings and drive organic traffic.',
      icon: '📈',
      link: '/services#seo-services'
    },
    {
      title: '3D Websites',
      description: 'Interactive Three.js websites with scroll animations and immersive experiences.',
      icon: '🎯',
      link: '/services#threejs-development'
    },
    {
      title: 'Digital Marketing',
      description: 'Full-service digital marketing to grow your online presence and generate leads.',
      icon: '📱',
      link: '/services#digital-marketing'
    }
  ]

  return (
    <section className="py-16 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to eliminate your dependence on subscription platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg text-center group cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              <Link
                href={service.link}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group/link"
              >
                Learn More
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            View All Services
            <motion.span
              className="ml-2"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesPreview