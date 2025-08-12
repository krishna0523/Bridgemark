const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bridgedm.com',
  generateRobotsText: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/*.json$',
          '/*_buildManifest.js',
          '/*_middlewareManifest.js',
          '/*_ssgManifest.js',
          '/*.js.map'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1
      }
    ]
  },
  additionalPaths: async (config) => {
    const result = [];
    
    // Add blog posts
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory);
      const blogPosts = filenames
        .filter(name => name.endsWith('.mdx'))
        .map(name => name.replace('.mdx', ''));
      
      // Add blogs index page
      result.push('/blogs');
      
      // Add individual blog posts
      blogPosts.forEach(slug => {
        result.push(`/blogs/${slug}`);
      });
    }
    
    return result;
  },
  transform: async (config, path) => {
    // Custom transform for better SEO
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path === '/contact') {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.startsWith('/blogs')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/services' || path === '/about') {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  }
};