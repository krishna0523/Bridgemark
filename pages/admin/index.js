import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to blog dashboard
    router.replace('/admin/blog-dashboard');
  }, [router]);

  return (
    <>
      <Head>
        <title>Admin - Bridge Software Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            color: '#333'
          }}>
            🔄 Redirecting to Admin Dashboard...
          </div>
          <div style={{ 
            color: '#666',
            fontSize: '1rem'
          }}>
            Loading admin panel...
          </div>
        </div>
      </div>
    </>
  );
}