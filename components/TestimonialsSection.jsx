import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Rajesh Patel',
      company: 'TechStartup India',
      role: 'Founder & CEO',
      content: 'Bridge Software Solutions completely transformed our online presence. We eliminated our dependence on IndiaMART and now generate 300% more qualified leads through our website. Their React expertise is outstanding!',
      rating: 5,
      location: 'Mumbai, India'
    },
    {
      name: 'Sarah Johnson',
      company: 'Global Logistics Co',
      role: 'Marketing Director', 
      content: 'The Three.js animations and scroll effects they created for our website are absolutely stunning. We\'ve seen a 250% increase in time-on-page and our conversion rate improved by 40%. Highly recommend!',
      rating: 5,
      location: 'Sydney, Australia'
    },
    {
      name: 'Amit Sharma',
      company: 'E-commerce Plus',
      role: 'Digital Marketing Head',
      content: 'Their SEO services are phenomenal. We went from page 3 to position #1 for our main keywords within 6 months. The technical SEO audit they provided was incredibly detailed and actionable.',
      rating: 5,
      location: 'Hyderabad, India'
    },
    {
      name: 'Michael Chen',
      company: 'SaaS Solutions Inc',
      role: 'CTO',
      content: 'Working with Bridge Software was a game-changer. Their modern approach to web development and performance optimization helped us achieve 98% Lighthouse scores. Professional team!',
      rating: 5,
      location: 'San Francisco, USA'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join 50+ businesses who've eliminated dependence on subscription platforms
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg text-center"
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonials[currentTestimonial].company} • {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          {[
            { number: '50+', label: 'Happy Clients' },
            { number: '95%', label: 'Client Retention' },
            { number: '300%', label: 'Avg Lead Increase' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div key={stat.label}>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection