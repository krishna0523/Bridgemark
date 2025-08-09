import Link from 'next/link'
import { motion } from 'framer-motion'

const BlogCard = ({ post, index }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Featured Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-4xl">{post.category === 'SEO' ? '📈' : post.category === 'Web Development' ? '⚛️' : post.category === 'Digital Marketing' ? '📱' : '🎨'}</span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/blogs/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blogs/${post.id}`}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group/link"
        >
          Read Article
          <motion.span
            className="ml-2"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </Link>

        {/* SEO Keywords (hidden) */}
        <div className="hidden">
          {post.keywords && post.keywords.join(', ')}
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard