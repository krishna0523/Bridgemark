import CrispChat from '../components/CrispChat'
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CrispChat />
      <Analytics />
      
      {/* Google Analytics with optimized loading */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}`}
        strategy="afterInteractive"
      />
    </>
  )
}