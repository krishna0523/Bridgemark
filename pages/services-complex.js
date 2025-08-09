import SEO from '../components/SEO'
import ServiceCard from '../components/ServiceCard'
import { motion } from 'framer-motion'

export default function Services() {
  const services = [
    {
      title: 'React & Next.js Development',
      description: 'Modern, fast-loading websites built with React, Next.js, and cutting-edge web technologies.',
      features: ['Server-side rendering', 'SEO optimized', 'Mobile-first design', 'Performance optimized'],
      icon: '⚛️',
      keywords: ['React website developers India', 'Next.js developers India']
    },
    {
      title: 'Three.js 3D Websites',
      description: 'Interactive 3D websites with scroll animations, WebGL effects, and immersive user experiences.',
      features: ['WebGL animations', 'Scroll-triggered effects', 'Interactive 3D models', 'Performance optimization'],
      icon: '🎯',
      keywords: ['three.js website developers', 'scroll animation websites India', '3D website designers India']
    },
    {
      title: 'SEO Services',
      description: 'Comprehensive SEO strategies to improve search rankings and drive organic traffic.',
      features: ['Technical SEO audit', 'Keyword research', 'Content optimization', 'Local SEO'],
      icon: '📈',
      keywords: ['SEO services in Hyderabad', 'technical SEO consultants India', 'local SEO optimization Hyderabad']
    },
    {
      title: 'Digital Marketing',
      description: 'Full-service digital marketing to grow your online presence and generate quality leads.',
      features: ['Social media marketing', 'Content marketing', 'PPC campaigns', 'Analytics & reporting'],
      icon: '📱',
      keywords: ['digital marketing company India', 'performance marketing for SaaS', 'content marketing for tech companies']
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that converts visitors into customers with intuitive interfaces.',
      features: ['User research', 'Wireframing & prototyping', 'Visual design', 'Usability testing'],
      icon: '🎨',
      keywords: ['UI/UX designers Hyderabad', 'conversion optimized design India', 'modern website redesign Hyderabad']
    },
    {
      title: 'Website Maintenance',
      description: 'Ongoing support, updates, and optimization to keep your website running smoothly.',
      features: ['Security updates', 'Performance monitoring', 'Content updates', 'Backup & recovery'],
      icon: '🛠️',
      keywords: ['website maintenance company India', 'SSL setup & performance tuning', 'fast-loading websites developers']
    }
  ]

  const packages = [
    {
      name: 'Starter',
      price: '₹25,000',
      duration: 'One-time',
      description: 'Perfect for small businesses getting started online',
      features: [
        '5-page responsive website',
        'Basic SEO optimization',
        'Contact form integration',
        '3 months support',
        'Mobile-first design'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹75,000',
      duration: 'One-time',
      description: 'Comprehensive solution for growing businesses',
      features: [
        '10+ page custom website',
        'Advanced SEO & analytics',
        'CMS integration',
        '6 months support',
        'Performance optimization',
        'Blog setup'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      duration: 'Quote-based',
      description: 'Tailored solutions for large organizations',
      features: [
        'Custom web application',
        'Three.js animations',
        'Advanced integrations',
        '12 months support',
        'Dedicated project manager',
        'Training & documentation'
      ],
      popular: false
    }
  ]

  return (
    <>
      <SEO 
        title="Our Services | React Website Developers India | Three.js Website Developers"
        description="Professional web development services including React, Next.js, Three.js, SEO, and digital marketing. B2B website design agency serving India, USA & Australia."
        keywords={[
          'React website developers India',
          'three.js website developers',
          'B2B website design agency',
          'headless CMS website builders',
          'technical SEO consultants India',
          'UI/UX designers Hyderabad',
          'mobile-first website agency India'
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
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive web development, SEO, and digital marketing services 
              to help your business stand out and grow online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Packages</h2>
            <p className="text-gray-600 text-lg">Choose the perfect plan for your business needs</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white p-8 rounded-lg shadow-lg ${
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{pkg.price}</div>
                  <div className="text-gray-500 text-sm">{pkg.duration}</div>
                  <p className="text-gray-600 mt-4">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full py-3 px-6 text-center font-semibold rounded-lg transition-colors ${
                    pkg.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Get Started
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-600 text-lg">How we deliver exceptional results</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Discovery',
                description: 'Understanding your business goals, target audience, and requirements.'
              },
              {
                step: '2', 
                title: 'Strategy',
                description: 'Creating a comprehensive plan with wireframes, SEO strategy, and timeline.'
              },
              {
                step: '3',
                title: 'Development',
                description: 'Building your website with modern technologies and best practices.'
              },
              {
                step: '4',
                title: 'Launch & Optimize',
                description: 'Testing, launching, and continuously optimizing for better performance.'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}