import CrispChat from '../components/CrispChat'
import { Analytics } from "@vercel/analytics/next"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CrispChat />
      <Analytics />
    </>
  )
}