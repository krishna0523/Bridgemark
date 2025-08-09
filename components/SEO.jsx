import Head from 'next/head'

export default function SEO({ title, description, keywords = [], structuredData }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/bridge-favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/bridge-favicon.svg" />
      <meta name="msapplication-TileImage" content="/bridge-favicon.svg" />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}