/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Modern JavaScript compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Webpack configuration for modern browsers
  webpack: (config, { isServer }) => {
    // Only target modern browsers to reduce polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.crisp.chat https://client.crisp.chat https://settings.crisp.chat https://storage.crisp.chat https://widget.crisp.chat https://image.crisp.chat https://rest.crisp.chat https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://client.crisp.chat",
              "img-src 'self' data: https: blob: https://www.googletagmanager.com https://www.google-analytics.com https://client.crisp.chat https://image.crisp.chat",
              "font-src 'self' https://fonts.gstatic.com https://client.crisp.chat",
              "connect-src 'self' https://www.google-analytics.com https://client.crisp.chat https://rest.crisp.chat wss://client.crisp.chat wss://client.relay.crisp.chat",
              "media-src 'self' blob: https://client.crisp.chat https://storage.crisp.chat",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "frame-ancestors 'none'",
              "block-all-mixed-content",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',
              'payment=()',
              'usb=()',
              'magnetometer=()',
              'gyroscope=()',
              'accelerometer=()',
              'ambient-light-sensor=()',
              'autoplay=(self)',
              'encrypted-media=(self)',
              'fullscreen=(self)',
              'picture-in-picture=(self)'
            ].join(', ')
          }
        ],
      },
      {
        // Specific headers for admin pages
        source: '/admin/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, nosnippet, noarchive'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        ]
      },
      {
        // Headers for API routes
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag', 
            value: 'noindex'
          },
          {
            key: 'Cache-Control',
            value: 'no-store'
          }
        ]
      },
      {
        // Long cache for static assets
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Cache for images and videos
        source: '/(.*)\\.(png|jpg|jpeg|gif|ico|svg|mp4|webm|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400'
          }
        ]
      }
    ]
  },

  // Image optimization configuration
  images: {
    domains: ['www.bridgedm.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Compression
  compress: true,

  // Power by header removal
  poweredByHeader: false,

  // Trailing slash configuration
  trailingSlash: false,

  // Generate etags for better caching
  generateEtags: true,

  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  }
}

module.exports = nextConfig