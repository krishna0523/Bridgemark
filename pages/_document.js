import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Default title - will be overridden by page-specific SEO components */}
        <title>Bridge Software Solutions - Web Development Company in Hyderabad</title>
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://client.crisp.chat" />
        <link rel="preconnect" href="https://settings.crisp.chat" />
        
        {/* Google Fonts - Optimized Loading */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
          media="print" 
          onLoad="this.media='all'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
            rel="stylesheet" 
          />
        </noscript>
        
        {/* Google Analytics - Deferred Loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Hreflang for international SEO */}
        <link rel="alternate" hrefLang="en" href="https://www.bridgedm.com" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.bridgedm.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.bridgedm.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/videos/Bridge%20Video.mp4" as="video" type="video/mp4" />
        
        {/* Referrer policy */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bridge Software" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Schema.org markup for Organization (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bridge Software Solutions",
              "url": "https://www.bridgedm.com",
              "logo": "https://www.bridgedm.com/Bridge-transparent-logo.png",
              "description": "Professional web development, mobile app development, brand identity design, and SEO services in Hyderabad",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Hyderabad",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.385044",
                "longitude": "78.486671"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9996-999-770",
                "contactType": "customer support",
                "email": "hello@bridgedm.com",
                "availableLanguage": ["English", "Hindi", "Telugu"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/bridge-software-solutions",
                "https://twitter.com/bridgesoftware",
                "https://www.facebook.com/bridgesoftwaresolutions"
              ],
              "foundingDate": "2020",
              "numberOfEmployees": "2-10",
              "slogan": "Bridging the gap between vision and digital reality",
              "knowsAbout": [
                "Web Development",
                "SEO Services", 
                "Mobile App Development",
                "Brand Identity Design",
                "React Development",
                "Next.js",
                "Digital Marketing",
                "UI/UX Design"
              ]
            })
          }}
        />
      </body>
    </Html>
  )
}