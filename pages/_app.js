import CrispChat from '../components/CrispChat'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CrispChat />
    </>
  )
}