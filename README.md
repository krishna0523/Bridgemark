# Bridge Software Solutions Website

A modern, SEO-optimized website built with React, Next.js, Three.js, and Tailwind CSS for Bridge Software Solutions - a leading web development company in Hyderabad.

## 🚀 Features

- **Modern Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **3D Animations**: Three.js fiber optic animations with scroll interactions
- **SEO Optimized**: Comprehensive meta tags, structured data, OpenGraph
- **Performance**: Lighthouse score 95+ with optimized loading
- **Responsive**: Mobile-first design with smooth animations
- **Forms**: Integrated Formspree for contact forms

## 🎯 Target Keywords

### Primary Keywords
- web development company in Hyderabad
- SEO services in Hyderabad  
- React website developers India
- three.js website developers

### Service-Specific Keywords
- B2B website design agency
- digital marketing company India
- UI/UX designers Hyderabad
- technical SEO consultants India

## 📁 Project Structure

```
bridge-marketing/
├── components/           # Reusable React components
│   ├── SEO.jsx          # SEO meta tags & structured data
│   ├── HeroSection.jsx  # Hero with Three.js animations
│   ├── Navbar.jsx       # Navigation with smooth transitions
│   ├── Footer.jsx       # Footer with sitemap & social links
│   └── ...
├── pages/               # Next.js pages
│   ├── index.js         # Homepage
│   ├── about.js         # About page
│   ├── services.js      # Services page
│   ├── contact.js       # Contact page
│   └── blogs/           # Blog pages
├── styles/              # Global styles
├── public/              # Static assets
└── ...
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bridge-marketing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Update with your actual values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📊 Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Built-in bundle analyzer
- **Three.js Optimization**: Lazy loading and performance monitoring
- **CSS Optimization**: Purged unused styles, critical CSS inlined

## 🔧 Configuration

### Google Analytics
Add your GA4 tracking ID to `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Contact Forms
Update Formspree endpoint in `components/ContactForm.jsx`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  // ...
})
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
```bash
npm run build
npm run export  # For static export
```

## 📱 SEO Features

- **Meta Tags**: Title, description, keywords for each page
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions

## 🎨 Design System

### Colors
- Primary: Blue (#1d4ed8) 
- Secondary: Purple (#7c3aed)
- Accent: Cyan (#06b6d4)

### Typography
- Font Family: Inter (Google Fonts)
- Headings: 600-800 font weight
- Body: 400-500 font weight

### Animations
- Framer Motion for page transitions
- Three.js for 3D effects
- CSS animations for micro-interactions

## 📈 Analytics & Tracking

- Google Analytics 4
- Google Tag Manager
- Performance monitoring
- Conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📞 Support

- **Email**: hello@bridgesoftwaresolutions.com
- **Phone**: +91-XXXXXXXXXX
- **Location**: Hyderabad, Telangana, India

## 📄 License

This project is proprietary software owned by Bridge Software Solutions.

---

**Bridge Software Solutions** - Be Un-Conventional. Let your website speak.