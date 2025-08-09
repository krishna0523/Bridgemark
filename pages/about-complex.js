import SEO from '../components/SEO'
import { motion } from 'framer-motion'

export default function About() {
  const teamMembers = [
    {
      name: 'Ravi Kumar',
      role: 'Founder & CEO',
      image: '/team/ceo.jpg',
      bio: 'Full-stack developer with 8+ years experience in React, Node.js, and scalable architecture.'
    },
    {
      name: 'Priya Singh',
      role: 'SEO Strategist',
      image: '/team/seo-lead.jpg', 
      bio: 'Digital marketing expert specializing in technical SEO, content strategy, and conversion optimization.'
    },
    {
      name: 'Arjun Reddy',
      role: 'UI/UX Designer',
      image: '/team/designer.jpg',
      bio: 'Creative designer focused on user experience, brand identity, and modern web aesthetics.'
    }
  ]

  const values = [
    {
      title: 'Innovation',
      description: 'Embracing cutting-edge technologies like Three.js, React, and modern web standards.',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'Delivering pixel-perfect, performance-optimized websites that exceed expectations.',
      icon: '✨'
    },
    {
      title: 'Transparency', 
      description: 'Clear communication, honest pricing, and transparent project management.',
      icon: '🤝'
    },
    {
      title: 'Results',
      description: 'Measurable ROI through improved search rankings, conversions, and user engagement.',
      icon: '📈'
    }
  ]

  return (
    <>
      <SEO 
        title="About Bridge Software Solutions | Top SEO Agency for Startups & Best Digital Branding Agency"
        description="Learn about Bridge Software Solutions - leading web development company in Hyderabad. Our mission: Be unconventional, eliminate dependence on subscription platforms like IndiaMART."
        keywords={[
          'top SEO agency for startups',
          'best digital branding agency', 
          'modern web design Hyderabad',
          'web development company India',
          'digital marketing team'
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
              About <span className="text-gradient">Bridge Software</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to help businesses <strong>be unconventional</strong> and 
              eliminate their dependence on subscription-based lead generation platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower businesses with modern, high-performing websites that drive organic 
                growth and eliminate dependence on expensive subscription platforms like 
                IndiaMART and Justdial. We believe every business deserves a digital presence 
                that speaks for itself.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the leading web development and SEO agency across India, USA, and 
                Australia, known for unconventional approaches, cutting-edge technology 
                implementation, and measurable business results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The creative minds behind Bridge Software Solutions</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '30+', label: 'Happy Clients' },
              { number: '3', label: 'Countries Served' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}