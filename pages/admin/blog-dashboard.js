import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BlogDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [stats, setStats] = useState({
    queued: 0,
    published: 0,
    failed: 0,
    generating: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  
  // Keyword creation state
  const [isAddingKeyword, setIsAddingKeyword] = useState(false);
  const [newKeyword, setNewKeyword] = useState({
    keyword: '',
    stage: 'MOFU',
    intent: 'informational',
    priority: 'medium'
  });
  const [keywordResult, setKeywordResult] = useState(null);
  
  // Manual generation keyword selection
  const [selectedKeywordForGeneration, setSelectedKeywordForGeneration] = useState('');
  
  // Sync and delete state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null); // stores slug being deleted
  
  // Remove keyword state
  const [isRemoving, setIsRemoving] = useState(null); // stores keyword being removed
  const [removeResult, setRemoveResult] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // Basic token validation (decode without verification for client-side)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          sessionStorage.removeItem('admin_token');
          router.push('/admin/login');
          return;
        }
        setIsAuthenticated(true);
        loadKeywords();
      } catch (error) {
        sessionStorage.removeItem('admin_token');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadKeywords = async () => {
    try {
      // Add cache-busting timestamp to ensure fresh data
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/keywords-status?t=${timestamp}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setKeywords(data.keywords);
        setStats(data.stats);
        console.log('Keywords data refreshed:', {
          total: data.keywords.length,
          stats: data.stats,
          lastUpdated: data.lastUpdated
        });
      } else {
        console.error('Failed to load keywords - HTTP status:', response.status);
      }
    } catch (error) {
      console.error('Failed to load keywords:', error);
    }
  };

  const triggerGeneration = async () => {
    setIsGenerating(true);
    setLastResult(null);
    
    try {
      const requestBody = {};
      
      // If a specific keyword is selected, include it in the request
      if (selectedKeywordForGeneration && selectedKeywordForGeneration.trim() !== '') {
        requestBody.keyword = selectedKeywordForGeneration.trim();
      }
      
      const response = await fetch('/api/blog-bot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'blog-automation-secret-key-2025'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      setLastResult(result);
      
      // Clear selected keyword after successful generation
      if (result.success && selectedKeywordForGeneration) {
        setSelectedKeywordForGeneration('');
      }
      
      // Reload keywords to see updated status with longer delays to ensure backend updates complete
      setTimeout(() => loadKeywords(), 3000);
      // Additional reload after 6 seconds to catch any delayed updates
      setTimeout(() => loadKeywords(), 6000);
    } catch (error) {
      setLastResult({
        success: false,
        message: `Error: ${error.message}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddKeyword = async () => {
    if (!newKeyword.keyword.trim()) {
      setKeywordResult({ success: false, message: 'Please enter a keyword' });
      return;
    }

    setIsAddingKeyword(true);
    setKeywordResult(null);

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newKeyword)
      });

      const result = await response.json();
      setKeywordResult(result);
      
      if (result.success) {
        // Reset form
        setNewKeyword({
          keyword: '',
          stage: 'MOFU',
          intent: 'informational',
          priority: 'medium'
        });
        
        // Reload keywords to show the new one
        setTimeout(() => loadKeywords(), 1000);
        setTimeout(() => setKeywordResult(null), 3000);
      }
    } catch (error) {
      setKeywordResult({
        success: false,
        message: `Error: ${error.message}`
      });
    } finally {
      setIsAddingKeyword(false);
    }
  };

  const handleSyncKeywords = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/sync-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      setSyncResult(result);
      
      if (result.success) {
        // Reload keywords to show updated data
        setTimeout(() => loadKeywords(), 1000);
        setTimeout(() => setSyncResult(null), 5000);
      }
    } catch (error) {
      setSyncResult({
        success: false,
        message: `Error: ${error.message}`
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteBlog = async (slug, keyword) => {
    if (!confirm(`Are you sure you want to delete the blog post "${keyword}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(slug);

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/delete-blog?slug=${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        // Reload keywords to show updated status
        loadKeywords();
        alert('Blog post deleted successfully!');
      } else {
        alert(`Failed to delete blog post: ${result.message}`);
      }
    } catch (error) {
      alert(`Error deleting blog post: ${error.message}`);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRemoveKeyword = async (keywordToRemove) => {
    if (!confirm(`Are you sure you want to remove the keyword "${keywordToRemove}"? This action cannot be undone.`)) {
      return;
    }

    setIsRemoving(keywordToRemove);
    setRemoveResult(null);

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/admin/remove-keyword', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ keyword: keywordToRemove })
      });

      const result = await response.json();
      setRemoveResult(result);
      
      if (result.success) {
        // Reload keywords to show updated list
        loadKeywords();
        setTimeout(() => setRemoveResult(null), 3000);
      }
    } catch (error) {
      setRemoveResult({
        success: false,
        message: `Error: ${error.message}`
      });
    } finally {
      setIsRemoving(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // Show loading screen while checking authentication
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
          <div style={{ color: '#666' }}>Verifying access...</div>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (redirect is handling this)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>Blog Automation Dashboard - Bridge Software Solutions</title>
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
            Admin Dashboard
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a 
              href="/blogs" 
              style={{
                color: '#666',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
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
              View Blog
            </a>
            <a 
              href="/" 
              style={{
                color: '#666',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
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
              Back to Site
            </a>
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
              onMouseEnter={(e) => {
                e.target.style.background = '#c82333';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#dc3545';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '200', marginBottom: '0.5rem', color: '#000' }}>
            Blog Automation Dashboard
          </h2>
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
          Generate a blog post manually. You can either select a specific keyword or let the system choose the next queued keyword automatically.
        </p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Select Keyword (Optional)
          </label>
          <select
            value={selectedKeywordForGeneration}
            onChange={(e) => setSelectedKeywordForGeneration(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          >
            <option value="">-- Auto-select next keyword --</option>
            {keywords
              .filter(kw => kw.status === 'queued' || kw.status === 'failed')
              .map((keyword, index) => (
                <option key={index} value={keyword.keyword}>
                  {keyword.keyword} ({keyword.status} - {keyword.priority} priority)
                </option>
              ))
            }
          </select>
          {selectedKeywordForGeneration && (
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#666',
              marginBottom: '0.5rem'
            }}>
              Selected: "{selectedKeywordForGeneration}"
            </div>
          )}
        </div>
        
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
          {isGenerating ? 'Generating...' : 
            selectedKeywordForGeneration 
              ? `Generate for "${selectedKeywordForGeneration}"`
              : 'Generate Blog Post'
          }
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

      {/* Sync Keywords */}
      <div style={{ 
        background: '#ffffff', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '2rem',
        marginBottom: '2rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sync Keywords Dashboard</h2>
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Synchronize the keywords dashboard with published blog posts to ensure all data is up-to-date.
        </p>
        
        <button
          onClick={handleSyncKeywords}
          disabled={isSyncing}
          style={{
            background: isSyncing ? '#6c757d' : '#28a745',
            color: '#ffffff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: isSyncing ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {isSyncing ? 'Syncing...' : '🔄 Sync Keywords'}
        </button>

        {syncResult && (
          <div style={{
            background: syncResult.success ? '#d4edda' : '#f8d7da',
            color: syncResult.success ? '#155724' : '#721c24',
            border: `1px solid ${syncResult.success ? '#c3e6cb' : '#f5c6cb'}`,
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            {syncResult.message}
            {syncResult.updated !== undefined && (
              <div style={{ marginTop: '0.5rem', fontWeight: '500' }}>
                Updated: {syncResult.updated} keyword{syncResult.updated !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add New Keyword */}
      <div style={{ 
        background: '#ffffff', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '2rem',
        marginBottom: '2rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Add New Keyword</h2>
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Add a new keyword to the blog generation queue. It will be picked up during the next scheduled run or manual generation.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Keyword *
            </label>
            <input
              type="text"
              value={newKeyword.keyword}
              onChange={(e) => setNewKeyword(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="e.g., mobile app development hyderabad"
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
              value={newKeyword.stage}
              onChange={(e) => setNewKeyword(prev => ({ ...prev, stage: e.target.value }))}
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
              value={newKeyword.intent}
              onChange={(e) => setNewKeyword(prev => ({ ...prev, intent: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="informational">Informational</option>
              <option value="transactional">Transactional</option>
              <option value="commercial">Commercial</option>
              <option value="comparison">Comparison</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Priority
            </label>
            <select
              value={newKeyword.priority}
              onChange={(e) => setNewKeyword(prev => ({ ...prev, priority: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddKeyword}
          disabled={isAddingKeyword}
          style={{
            background: isAddingKeyword ? '#6c757d' : '#17a2b8',
            color: '#ffffff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: isAddingKeyword ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {isAddingKeyword ? 'Adding...' : 'Add Keyword'}
        </button>

        {keywordResult && (
          <div style={{
            background: keywordResult.success ? '#d4edda' : '#f8d7da',
            color: keywordResult.success ? '#155724' : '#721c24',
            border: `1px solid ${keywordResult.success ? '#c3e6cb' : '#f5c6cb'}`,
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            {keywordResult.message}
          </div>
        )}
      </div>

      {/* Remove Keyword */}
      <div style={{ 
        background: '#ffffff', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '2rem',
        marginBottom: '2rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Remove Keyword</h2>
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Remove a keyword from the queue. This will permanently delete the keyword and cannot be undone.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Select Keyword to Remove
            </label>
            <select
              id="keywordToRemove"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="">-- Select a keyword --</option>
              {keywords.map((keyword, index) => (
                <option key={index} value={keyword.keyword}>
                  {keyword.keyword} ({keyword.status})
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => {
              const select = document.getElementById('keywordToRemove');
              const selectedKeyword = select.value;
              if (selectedKeyword) {
                handleRemoveKeyword(selectedKeyword);
              } else {
                alert('Please select a keyword to remove');
              }
            }}
            disabled={isRemoving}
            style={{
              background: isRemoving ? '#6c757d' : '#dc3545',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: isRemoving ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {isRemoving ? 'Removing...' : 'Remove Keyword'}
          </button>
        </div>

        {removeResult && (
          <div style={{
            background: removeResult.success ? '#d4edda' : '#f8d7da',
            color: removeResult.success ? '#155724' : '#721c24',
            border: `1px solid ${removeResult.success ? '#c3e6cb' : '#f5c6cb'}`,
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            {removeResult.message}
            {removeResult.remainingCount !== undefined && (
              <div style={{ marginTop: '0.5rem', fontWeight: '500' }}>
                Remaining keywords: {removeResult.remainingCount}
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
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
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
                  <td style={{ padding: '1rem' }}>
                    {keyword.status === 'published' && keyword.url ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            // Extract slug from URL like /blogs/slug-name
                            const slug = keyword.url.replace('/blogs/', '');
                            router.push(`/admin/blog-editor?slug=${slug}`);
                          }}
                          style={{
                            background: '#17a2b8',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#138496';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#17a2b8';
                          }}
                        >
                          Edit
                        </button>
                        <a 
                          href={keyword.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            background: '#28a745',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#218838';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#28a745';
                          }}
                        >
                          View
                        </a>
                        <button
                          onClick={() => {
                            const slug = keyword.url.replace('/blogs/', '');
                            handleDeleteBlog(slug, keyword.keyword);
                          }}
                          disabled={isDeleting === keyword.url.replace('/blogs/', '')}
                          style={{
                            background: isDeleting === keyword.url.replace('/blogs/', '') ? '#6c757d' : '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: isDeleting === keyword.url.replace('/blogs/', '') ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isDeleting) {
                              e.target.style.background = '#c82333';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isDeleting) {
                              e.target.style.background = '#dc3545';
                            }
                          }}
                        >
                          {isDeleting === keyword.url.replace('/blogs/', '') ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleRemoveKeyword(keyword.keyword)}
                          disabled={isRemoving === keyword.keyword}
                          style={{
                            background: isRemoving === keyword.keyword ? '#6c757d' : '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: isRemoving === keyword.keyword ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (isRemoving !== keyword.keyword) {
                              e.target.style.background = '#c82333';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isRemoving !== keyword.keyword) {
                              e.target.style.background = '#dc3545';
                            }
                          }}
                        >
                          {isRemoving === keyword.keyword ? 'Removing...' : 'Remove'}
                        </button>
                        <span style={{ color: '#666', fontSize: '0.75rem', alignSelf: 'center' }}>
                          {keyword.status === 'published' ? 'No URL' : 'Not published'}
                        </span>
                      </div>
                    )}
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
    </div>
  );
}