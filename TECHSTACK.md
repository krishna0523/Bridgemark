# Tech Stack - Bridge Software Solutions

## 🚀 **Frontend Framework**
- **Next.js 14** - React-based full-stack framework
- **React 18** - JavaScript library for building user interfaces
- **React DOM 18** - DOM-specific methods for React

## 🎨 **Styling & Animation**
- **CSS-in-JS** - Inline styling with JavaScript objects
- **GSAP 3.13** - Professional animation library
- **ScrollTrigger** - GSAP plugin for scroll-based animations
- **Lenis 1.3.8** - Smooth scrolling library
- **Inter Font** - Google Fonts typography

## 📱 **UI/UX Libraries**
- **React Intersection Observer 9.16** - Detecting element visibility
- **Custom Components** - Self-built reusable components

## 📧 **Form Handling & Communication**
- **Web3Forms API** - Serverless form submission service
- **Native Fetch API** - HTTP requests to Web3Forms
- **Client-side Validation** - Custom form validation logic
- **Crisp.chat SDK** - Live chat integration for real-time visitor support

## 🛠️ **Development Tools**
- **NPM** - Package manager
- **Git** - Version control
- **ESLint** - Code linting (built into Next.js)

## 🌐 **Hosting & Deployment**
- **Vercel** - Deployment platform
- **GitHub** - Code repository
- **Automatic Deployment** - Git-based CI/CD

## 📦 **Dependencies Summary**
```json
{
  "crisp-sdk-web": "^1.0.25",
  "gsap": "^3.13.0",
  "lenis": "^1.3.8", 
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-intersection-observer": "^9.16.0"
}
```

## 🏗️ **Architecture**
- **Static Site Generation (SSG)** - Pre-rendered at build time
- **File-based Routing** - Next.js pages directory
- **Component-based Architecture** - Modular React components
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, structured data, sitemap

## 🎯 **Key Features**
- **Video-controlled Scroll** - Custom video timeline manipulation
- **Smooth Scrolling** - Lenis integration
- **GSAP Animations** - Professional motion graphics
- **Form Validation** - Client-side validation with error handling
- **International Support** - Country code phone number selection
- **Live Chat Support** - Real-time visitor communication via Crisp.chat

## 📁 **Project Structure**
```
bridge-marketing/
├── components/
│   ├── CrispChat.jsx
│   ├── SEO.jsx
│   └── Web3ContactForm.jsx
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js (main homepage)
│   ├── about.js
│   ├── contact.js
│   ├── services.js
│   ├── blogs.js
│   └── blogs/
│       ├── ai-advancements-2024-business.js
│       ├── complete-seo-guide-hyderabad.js
│       └── organic-seo-content-traffic.js
├── public/
│   ├── videos/
│   │   └── Bridge Video.mp4
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── styles/
│   └── globals.css
├── package.json
├── CLAUDE.md
├── CRISP_SETUP.md
├── WEB3FORMS_SETUP.md
└── TECHSTACK.md
```

## ⚡ **Performance Optimizations**
- **Separated useEffect Hooks** - Prevents infinite re-render loops
- **Optimized Dependencies** - Each effect only depends on relevant state
- **Clean Event Listeners** - Proper cleanup to prevent memory leaks
- **Fast Refresh Compatibility** - Structured to work with React Fast Refresh
- **Static Pre-rendering** - All pages pre-generated at build time
- **Optimized Images** - Next.js automatic image optimization
- **Code Splitting** - Automatic by Next.js for optimal loading

## 🔧 **Development Commands**
```bash
# Development
npm run dev        # Start development server

# Production
npm run build      # Build for production  
npm start          # Start production server

# Dependencies
npm install        # Install all dependencies
```

## 🌟 **Modern Features**
- **Responsive Design** - Works perfectly on all devices
- **Smooth Animations** - GSAP-powered professional animations
- **Video Integration** - Custom video timeline control
- **Form Handling** - Serverless contact form with Web3Forms
- **Live Chat** - Real-time customer support with Crisp.chat
- **SEO Ready** - Complete meta tags and structured data
- **Fast Loading** - Optimized for Core Web Vitals
- **Clean Code** - Modern React patterns and best practices

This tech stack provides a perfect balance of performance, functionality, and maintainability for a premium digital marketing website.