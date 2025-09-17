# Bridge Software Solutions - Comprehensive Codebase Context

## Project Overview
Bridge Software Solutions is a premium digital marketing website built with Next.js 14, featuring a sophisticated video-controlled hero section, advanced animations, and comprehensive business functionality including blog management, contact forms, and admin dashboard.

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14.2.31 with React 18
- **Animations**: GSAP 3.x with ScrollTrigger plugin
- **Smooth Scrolling**: Lenis library for buttery smooth scrolling
- **Styling**: CSS-in-JS with inline styling and Tailwind CSS
- **Typography**: Inter font from Google Fonts
- **Video**: HTML5 video element with timeline control
- **State Management**: React hooks (useState, useRef, useEffect, useLayoutEffect)
- **Build Tool**: SWC for fast compilation

### Backend & CMS
- **Content Management**: MDX with next-mdx-remote for blog posts
- **Frontmatter**: Gray-matter for metadata parsing
- **Authentication**: JWT-based admin authentication
- **API Routes**: Next.js API routes for backend functionality
- **External Services**: Web3Forms for contact form handling, CrispChat for customer support

### Key Dependencies
```json
{
  "core": ["next@^14.0.0", "react@^18.0.0", "react-dom@^18.0.0"],
  "animations": ["gsap@^3.13.0", "lenis@^1.3.8"],
  "content": ["next-mdx-remote@^5.0.0", "gray-matter@^4.0.3"],
  "utilities": ["react-intersection-observer@^9.16.0", "jsonwebtoken@^9.0.2"],
  "analytics": ["@vercel/analytics@^1.5.0", "@vercel/og@^0.6.2"],
  "chat": ["crisp-sdk-web@^1.0.25"]
}
```

## Project Structure

### Core Pages (`/pages/`)
- **index.js** (38k+ lines): Main homepage with video-controlled hero, animations, and all sections
- **contact.js**: Contact page with Web3Forms integration
- **about.js**: About page with company information
- **services.js**: Services page showcasing offerings
- **blogs.js**: Blog listing page
- **blogs/[slug].js**: Dynamic blog post pages with MDX rendering
- **_app.js**: Next.js app wrapper with CrispChat and Analytics
- **_document.js**: Custom document structure

### Admin System (`/pages/admin/`)
- **login.js**: JWT-based admin authentication
- **index.js**: Admin dashboard
- **blog-dashboard.js**: Blog management interface
- **blog-editor.js**: MDX blog post editor

### API Routes (`/pages/api/`)
- **admin/auth.js**: Authentication endpoint
- **admin/blog-edit.js**: Blog editing functionality
- **admin/delete-blog.js**: Blog deletion
- **admin/keywords.js**: SEO keyword management
- **blog-bot.ts**: AI-powered blog generation
- **revalidate.ts**: Incremental Static Regeneration

### Components (`/components/`)
- **SEO.jsx**: Meta tags and structured data management
- **CrispChat.jsx**: Customer support chat integration
- **Web3ContactForm.jsx**: Contact form with Web3Forms backend
- **KeywordBelts.tsx**: Animated keyword display component
- **KeywordBeltsDemo.tsx**: Demo version of keyword belts

### Content Management (`/content/`)
- **posts/**: MDX blog posts with frontmatter metadata
- **keywords/**: CSV file for SEO keyword management

### Static Assets (`/public/`)
- **videos/Bridge Video.mp4**: Main hero background video (4K cinematic)
- **Bridge-transparent-logo.png**: Company logo variants
- **favicon.ico, bridge-favicon.svg**: Site icons
- **robots.txt, sitemap.xml**: SEO files

## Key Features Implementation

### 1. Video-Controlled Hero Section
```javascript
// Video timeline control via horizontal scroll
const handleScroll = () => {
  if (video && !showMainText) {
    const scrollPercent = window.scrollX / window.innerWidth
    const timeToSet = Math.min(scrollPercent * 5, 5) // First 5 seconds
    video.currentTime = timeToSet
  }
}
```

### 2. Advanced GSAP Animations
- **Staggered Text Reveals**: Sequential animation timing
- **Intersection Observer**: Trigger animations on scroll
- **Mobile-Responsive**: Different animations for mobile vs desktop
- **Performance Optimized**: Separated useEffect hooks prevent infinite loops

### 3. Blog System Architecture
- **Dynamic Routing**: `[slug].js` for SEO-friendly URLs
- **MDX Processing**: Rich content with React components
- **Frontmatter Metadata**: Title, description, keywords, publication date
- **Auto-Generation**: AI-powered blog creation via Cloudflare Workers

### 4. Security Implementation
- **Content Security Policy**: Comprehensive CSP headers in next.config.js
- **XSS Protection**: Multiple security headers
- **Admin Protection**: JWT authentication for admin routes
- **HTTPS Enforcement**: Strict transport security

## Animation Patterns

### GSAP Timeline Structure
```javascript
const tl = gsap.timeline()
tl.fromTo(element, 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
)
```

### Intersection Observer Integration
```javascript
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true
})

useEffect(() => {
  if (inView) {
    // Trigger animations
  }
}, [inView])
```

## Performance Optimizations

### Code Splitting
- Dynamic imports for heavy components
- Next.js automatic code splitting
- Lazy loading for non-critical features

### Image Optimization
- Next.js Image component (configured in next.config.js)
- WebP and AVIF format support
- Responsive image loading

### Caching Strategy
- Static asset caching (31536000s for immutable assets)
- Page caching with revalidation
- API route caching disabled for dynamic content

## Development Workflow

### Environment Setup
```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build with sitemap generation
npm run start    # Production server
```

### Key Development Notes
- **Fast Refresh Compatible**: Structured to work with React Fast Refresh
- **TypeScript Support**: `.ts` and `.tsx` files supported
- **Hot Reload**: All changes automatically reload
- **Source Maps**: Available in development mode

## SEO Implementation

### Structured Data
- Organization schema
- Website schema
- Blog post schemas with proper metadata

### Meta Tags
- Dynamic title and description generation
- Open Graph tags for social sharing
- Twitter Card support
- Keyword optimization

### Sitemap Generation
- Automatic sitemap generation on build
- Dynamic blog post inclusion
- XML format compliant with search engines

## External Integrations

### CrispChat
- Customer support widget
- Properly positioned above WhatsApp button
- CSP-compliant implementation

### Analytics
- Vercel Analytics integration
- Google Analytics setup
- Performance monitoring

### Contact Forms
- Web3Forms backend integration
- Spam protection
- Form validation

## Mobile Responsiveness

### Breakpoints
- **Mobile**: ≤768px
- **Desktop**: >768px
- **Responsive Design**: Mobile-first approach

### Mobile-Specific Features
- Hamburger navigation menu
- Touch-optimized animations
- Responsive video handling
- Mobile-specific intro slides

## Recent Fixes & Improvements

### Performance Fixes
- ✅ Fixed infinite reload loop with separated useEffect hooks
- ✅ Resolved undefined variable errors in dependencies
- ✅ Optimized Stats section intersection observer

### UI/UX Enhancements
- ✅ Mobile navigation with GSAP animations
- ✅ Logo size standardization across pages
- ✅ Hamburger menu visibility and clickability fixes
- ✅ Mobile intro slides spacing optimization

### Security Enhancements
- ✅ Comprehensive CSP implementation
- ✅ Security headers configuration
- ✅ Admin route protection

## Future Development Guidelines

### Code Conventions
1. **Separation of Concerns**: Keep useEffect hooks focused and separate
2. **Mobile-First**: Always consider mobile experience first
3. **Performance**: Lazy load non-critical components
4. **Accessibility**: Support reduced motion preferences
5. **SEO**: Maintain structured data and meta tags

### Animation Guidelines
1. **Timing**: Use cubic-bezier easing for smooth motion
2. **Staggering**: 0.1-0.2s delays for sequential reveals
3. **Threshold**: 0.1 intersection observer threshold works well
4. **Cleanup**: Always cleanup event listeners and animations

### File Organization
- Keep components focused and reusable
- Maintain consistent naming conventions
- Document complex implementations
- Follow Next.js conventions for routing and API

## Development Commands Reference
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run postbuild        # Generate sitemap after build
npm run sitemap          # Generate sitemap manually
npm run test-blog-bot    # Test AI blog generation
```

This context document serves as a comprehensive reference for understanding and working with the Bridge Software Solutions codebase. All file paths are relative to `/Users/mksrikanth/bridge-marketing/`.