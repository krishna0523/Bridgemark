import { useState } from 'react'
import SEO from '../../components/SEO'
import BlogCard from '../../components/BlogCard'
import { motion } from 'framer-motion'

export default function BlogIndex() {
  const blogPosts = [
    {
      id: 'on-page-seo-checklist-india',
      title: 'Complete On-Page SEO Checklist for Indian Businesses',
      excerpt: 'Master on-page SEO with our comprehensive checklist designed specifically for Indian businesses targeting local and global markets.',
      author: 'Priya Singh',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'SEO',
      image: '/blog/seo-checklist.jpg',
      keywords: ['on-page SEO checklist India', 'SEO audit services Hyderabad', 'technical SEO consultants India']
    },
    {
      id: 'react-vs-wordpress-performance',
      title: 'Why React Outperforms WordPress: A Technical Comparison',
      excerpt: 'Detailed analysis of React vs WordPress performance, scalability, and SEO implications for modern websites.',
      author: 'Ravi Kumar',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Web Development',
      image: '/blog/react-wordpress.jpg',
      keywords: ['React website developers India', 'Wordpress to React migration', 'fast-loading websites developers']
    },
    {
      id: 'three-js-scroll-animations-guide',
      title: 'Creating Stunning Scroll Animations with Three.js',
      excerpt: 'Learn how to implement scroll-triggered 3D animations using Three.js for modern, engaging web experiences.',
      author: 'Arjun Reddy',
      date: '2024-01-05',
      readTime: '15 min read', 
      category: 'Web Development',
      image: '/blog/threejs-animations.jpg',
      keywords: ['three.js website developers', 'scroll animation websites India', 'scroll-triggered Lottie integration']
    },
    {
      id: 'local-seo-hyderabad-businesses',
      title: 'Local SEO Strategies for Hyderabad Businesses',
      excerpt: 'Dominate local search results in Hyderabad with proven local SEO strategies and Google My Business optimization.',
      author: 'Priya Singh',
      date: '2023-12-28',
      readTime: '10 min read',
      category: 'SEO',
      image: '/blog/local-seo.jpg',
      keywords: ['local SEO optimization Hyderabad', 'Google Maps SEO optimization', 'SEO services in Hyderabad']
    },
    {
      id: 'content-marketing-tech-companies',
      title: 'Content Marketing Strategies for Tech Companies',
      excerpt: 'Effective content marketing approaches tailored for tech companies, SaaS products, and B2B software businesses.',
      author: 'Priya Singh',
      date: '2023-12-20',
      readTime: '7 min read',
      category: 'Digital Marketing',
      image: '/blog/content-marketing.jpg',
      keywords: ['content marketing for tech companies', 'performance marketing for SaaS', 'digital marketing company India']
    },
    {
      id: 'mobile-first-design-principles',
      title: 'Mobile-First Design: Best Practices for 2024',
      excerpt: 'Essential mobile-first design principles and responsive techniques for creating exceptional mobile experiences.',
      author: 'Arjun Reddy',
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Design',
      image: '/blog/mobile-first.jpg',
      keywords: ['mobile-first website agency India', 'responsive web design agency', 'UI/UX designers Hyderabad']
    }
  ]

  const categories = ['All', 'SEO', 'Web Development', 'Digital Marketing', 'Design']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <>
      <SEO 
        title="Blog | SEO-Friendly Blog Development | Website Content Writers India"
        description="Latest insights on web development, SEO, digital marketing, and web design. Expert tips from Bridge Software Solutions team for growing your online presence."
        keywords={[
          'seo-friendly blog development',
          'website content writers India',
          'on-page SEO checklist India',
          'content marketing for tech companies',
          'local SEO optimization Hyderabad',
          'React website developers India',
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
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert insights on web development, SEO, digital marketing, and design 
              to help your business grow online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest insights on web development, SEO strategies, and digital marketing 
              tips delivered directly to your inbox.
            </p>
            
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}