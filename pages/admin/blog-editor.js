import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BlogEditor() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [post, setPost] = useState(null);
  const [frontMatter, setFrontMatter] = useState({});
  const [content, setContent] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          sessionStorage.removeItem('admin_token');
          router.push('/admin/login');
          return;
        }
        setIsAuthenticated(true);
        if (slug) {
          loadPost();
        }
      } catch (error) {
        sessionStorage.removeItem('admin_token');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, slug]);

  const loadPost = async () => {
    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/blog-edit?slug=${slug}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
        setFrontMatter(data.post.frontMatter);
        setContent(data.post.content);
      } else {
        setSaveMessage('Failed to load post');
      }
    } catch (error) {
      console.error('Failed to load post:', error);
      setSaveMessage('Error loading post');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/blog-edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          slug,
          frontMatter,
          content
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSaveMessage('✅ Post saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Failed to save: ' + result.message);
      }
    } catch (error) {
      setSaveMessage('❌ Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFrontMatterChange = (key, value) => {
    setFrontMatter(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
          <div style={{ color: '#666' }}>Loading editor...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>Edit Blog Post - Bridge Software Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Navigation */}
      <nav style={{
        background: '#fff',
        borderBottom: '1px solid #eee',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            margin: 0,
            color: '#000'
          }}>
            Blog Editor
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/admin/blog-dashboard')}
              style={{
                color: '#666',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f5f5f5';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '200', marginBottom: '0.5rem', color: '#000' }}>
            Edit Blog Post
          </h2>
          <p style={{ color: '#666666', fontSize: '1.125rem' }}>
            Editing: {slug || 'New Post'}
          </p>
        </div>

        {post && (
          <>
            {/* Front Matter Section */}
            <div style={{
              background: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#000' }}>
                Post Metadata
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={frontMatter.title || ''}
                    onChange={(e) => handleFrontMatterChange('title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={frontMatter.date || ''}
                    onChange={(e) => handleFrontMatterChange('date', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Excerpt
                </label>
                <textarea
                  value={frontMatter.excerpt || ''}
                  onChange={(e) => handleFrontMatterChange('excerpt', e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Reading Time
                  </label>
                  <input
                    type="number"
                    value={frontMatter.readingTime || ''}
                    onChange={(e) => handleFrontMatterChange('readingTime', parseInt(e.target.value) || '')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Stage
                  </label>
                  <select
                    value={frontMatter.stage || ''}
                    onChange={(e) => handleFrontMatterChange('stage', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="TOFU">TOFU (Top of Funnel)</option>
                    <option value="MOFU">MOFU (Middle of Funnel)</option>
                    <option value="BOFU">BOFU (Bottom of Funnel)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Intent
                  </label>
                  <select
                    value={frontMatter.intent || ''}
                    onChange={(e) => handleFrontMatterChange('intent', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="informational">Informational</option>
                    <option value="commercial">Commercial</option>
                    <option value="transactional">Transactional</option>
                    <option value="navigational">Navigational</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div style={{
              background: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#000' }}>
                Content (Markdown)
              </h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'Monaco, Menlo, monospace',
                  resize: 'vertical',
                  lineHeight: '1.5'
                }}
                placeholder="Enter your blog post content in Markdown format..."
              />
            </div>

            {/* Save Actions */}
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                {saveMessage && (
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    background: saveMessage.startsWith('✅') ? '#d4edda' : '#f8d7da',
                    color: saveMessage.startsWith('✅') ? '#155724' : '#721c24',
                    border: `1px solid ${saveMessage.startsWith('✅') ? '#c3e6cb' : '#f5c6cb'}`
                  }}>
                    {saveMessage}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  background: isSaving ? '#6c757d' : '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}