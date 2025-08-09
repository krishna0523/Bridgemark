import Head from 'next/head'

export default function SEO({ title, description, keywords = [], structuredData }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/BRIDGE favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}