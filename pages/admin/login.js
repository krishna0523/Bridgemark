import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth token in sessionStorage for security
        sessionStorage.setItem('admin_token', data.token);
        router.push('/admin/blog-dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Bridge Software Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          background: '#fff',
          padding: '3rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '400px',
          margin: '0 1rem'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img 
              src="/BRIDGE-new-logo.png" 
              alt="Bridge Software Solutions" 
              style={{
                height: '50px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '1rem',
              marginBottom: '0.5rem'
            }}>
              Admin Login
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Access your blog automation dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Username
              </label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {error && (
              <div style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#9ca3af' : '#3b82f6',
                color: '#fff',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#3b82f6';
                }
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <a
              href="/"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b7280';
              }}
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}