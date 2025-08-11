export interface BlogPostSchema {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
  readingTime: number;
  author?: string;
}

export function generateBlogPostSchema(post: BlogPostSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://bridgesoftwaresolutions.com/images/og/${post.slug}.png`,
    "author": {
      "@type": "Organization",
      "name": post.author || "Bridge Software Solutions",
      "url": "https://bridgesoftwaresolutions.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bridge Software Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bridgesoftwaresolutions.com/logo.png",
        "width": 200,
        "height": 60
      },
      "url": "https://bridgesoftwaresolutions.com"
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bridgesoftwaresolutions.com/blogs/${post.slug}`
    },
    "keywords": post.tags,
    "timeRequired": `PT${post.readingTime}M`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://bridgesoftwaresolutions.com/blogs",
      "name": "Bridge Software Solutions Blog",
      "description": "Expert insights on web development, SEO, digital marketing, and technology trends from Hyderabad's leading software company."
    }
  };
}

export function generateWebsiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bridge Software Solutions",
    "url": "https://bridgesoftwaresolutions.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bridgesoftwaresolutions.com/logo.png",
      "width": 200,
      "height": 60
    },
    "description": "Premium web development and digital marketing agency in Hyderabad, specializing in custom websites, SEO, mobile apps, and e-commerce solutions for growing businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad"
      },
      {
        "@type": "State",
        "name": "Telangana"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "serviceType": [
      "Web Development",
      "Digital Marketing",
      "SEO Services",
      "Mobile App Development",
      "E-commerce Development",
      "Custom Software Development"
    ],
    "priceRange": "$$",
    "telephone": "+91 9996 999 770",
    "email": "hello@bridgesoftwaresolutions.com",
    "sameAs": [
      "https://www.linkedin.com/company/bridge-software-solutions",
      "https://twitter.com/bridgesoftware",
      "https://www.facebook.com/bridgesoftwaresolutions"
    ]
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "@id": "https://bridgesoftwaresolutions.com/#organization"
    },
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "India"
    },
    "url": service.url,
    "serviceType": service.name,
    "category": "Software Development"
  };
}