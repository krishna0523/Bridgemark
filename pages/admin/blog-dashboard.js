import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function BlogDashboard() {
  const [keywords, setKeywords] = useState([]);
  const [stats, setStats] = useState({
    queued: 0,
    published: 0,
    failed: 0,
    generating: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const response = await fetch('/api/keywords-status');
      if (response.ok) {
        const data = await response.json();
        setKeywords(data.keywords);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to load keywords:', error);
    }
  };

  const triggerGeneration = async () => {
    setIsGenerating(true);
    setLastResult(null);
    
    try {
      const response = await fetch('/api/blog-bot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'blog-automation-secret-key-2025'}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      setLastResult(result);
      
      // Reload keywords to see updated status
      setTimeout(() => loadKeywords(), 1000);
    } catch (error) {
      setLastResult({
        success: false,
        message: `Error: ${error.message}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Head>
        <title>Blog Automation Dashboard - Bridge Software Solutions</title>
      </Head>

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '200', marginBottom: '0.5rem' }}>
          Blog Automation Dashboard
        </h1>
        <p style={{ color: '#666666', fontSize: '1.125rem' }}>
          Monitor and manage your automated blog generation
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#007bff' }}>{stats.queued}</div>
          <div style={{ color: '#666666' }}>Queued</div>
        </div>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#28a745' }}>{stats.published}</div>
          <div style={{ color: '#666666' }}>Published</div>
        </div>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#ffc107' }}>{stats.generating}</div>
          <div style={{ color: '#666666' }}>Generating</div>
        </div>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#dc3545' }}>{stats.failed}</div>
          <div style={{ color: '#666666' }}>Failed</div>
        </div>
      </div>

      {/* Manual Trigger */}
      <div style={{ 
        background: '#ffffff', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '2rem',
        marginBottom: '2rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Manual Generation</h2>
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Test the blog generation system or create a post outside the scheduled time.
        </p>
        
        <button
          onClick={triggerGeneration}
          disabled={isGenerating}
          style={{
            background: isGenerating ? '#6c757d' : '#007bff',
            color: '#ffffff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {isGenerating ? 'Generating...' : 'Generate Blog Post'}
        </button>

        {lastResult && (
          <div style={{
            background: lastResult.success ? '#d4edda' : '#f8d7da',
            color: lastResult.success ? '#155724' : '#721c24',
            border: `1px solid ${lastResult.success ? '#c3e6cb' : '#f5c6cb'}`,
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            {lastResult.message}
            {lastResult.keyword && (
              <div style={{ marginTop: '0.5rem', fontWeight: '500' }}>
                Generated for: "{lastResult.keyword}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Keywords Table */}
      <div style={{ 
        background: '#ffffff', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e9ecef' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Keywords Queue</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Keyword</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Priority</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Stage</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Last Generated</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>URL</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{keyword.keyword}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      background: 
                        keyword.status === 'published' ? '#d4edda' :
                        keyword.status === 'generating' ? '#fff3cd' :
                        keyword.status === 'failed' ? '#f8d7da' : '#e2e3e5',
                      color:
                        keyword.status === 'published' ? '#155724' :
                        keyword.status === 'generating' ? '#856404' :
                        keyword.status === 'failed' ? '#721c24' : '#383d41'
                    }}>
                      {keyword.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      background: keyword.priority === 'high' ? '#fff3cd' : '#e2e3e5',
                      color: keyword.priority === 'high' ? '#856404' : '#383d41'
                    }}>
                      {keyword.priority}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{keyword.stage}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666666' }}>
                    {keyword.last_generated ? new Date(keyword.last_generated).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {keyword.url ? (
                      <a 
                        href={keyword.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'none' }}
                      >
                        View Post →
                      </a>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Info */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginTop: '2rem' 
      }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Automation Schedule</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Blog Generation:</strong><br />
            <span style={{ color: '#666666' }}>Every Monday at 6:00 AM UTC</span>
          </div>
          <div>
            <strong>Cache Revalidation:</strong><br />
            <span style={{ color: '#666666' }}>Daily at 7:00 AM UTC</span>
          </div>
          <div>
            <strong>Next Generation:</strong><br />
            <span style={{ color: '#666666' }}>
              {stats.queued > 0 ? 'Next Monday (or manual trigger)' : 'No keywords queued'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}