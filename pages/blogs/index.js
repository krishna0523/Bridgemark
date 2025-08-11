import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function BlogIndex({ posts }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Head>
        <title>Blog - Bridge Software Solutions</title>
        <meta name="description" content="Latest insights on web development, digital marketing, and business growth in Hyderabad" />
        <meta property="og:title" content="Blog - Bridge Software Solutions" />
        <meta property="og:description" content="Latest insights on web development, digital marketing, and business growth in Hyderabad" />
      </Head>

      <div style={{ 
        fontFamily: 'Inter, system-ui, sans-serif',
        background: '#fff',
        minHeight: '100vh'
      }}>
        {/* Navigation */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1rem 2rem',
          background: '#ffffff',
          backdropFilter: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}>
          {isMobile ? (
            // Mobile Navigation Layout
            <div style={{
              maxWidth: '100%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
              {/* Mobile Logo */}
              <div 
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0
                }}
                onClick={() => router.push('/')}
              >
                <img 
                  src="/BRIDGE.png" 
                  alt="Bridge Software Solutions Logo" 
                  style={{
                    height: '32px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Mobile Navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                marginLeft: '1rem',
                gap: 'clamp(0.25rem, 2vw, 1rem)'
              }}>
                {/* Mobile Services */}
                <button
                  onClick={() => router.push('/#services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                    fontWeight: '400',
                    letterSpacing: '0.05em',
                    color: '#666666',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    flex: '1',
                    textAlign: 'center'
                  }}
                >
                  Services
                </button>

                {/* Mobile Projects */}
                <button
                  onClick={() => router.push('/#projects')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                    fontWeight: '400',
                    letterSpacing: '0.05em',
                    color: '#666666',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    flex: '1',
                    textAlign: 'center'
                  }}
                >
                  Projects
                </button>

                {/* Mobile Blogs - Active */}
                <button
                  onClick={() => router.push('/blogs')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    color: '#000000',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    flex: '1',
                    textAlign: 'center'
                  }}
                >
                  Blogs
                </button>

                {/* Mobile Contact Button */}
                <button
                  onClick={() => router.push('/contact')}
                  style={{
                    background: '#007bff',
                    color: '#ffffff',
                    border: 'none',
                    padding: 'clamp(0.4rem, 1.5vw, 0.75rem) clamp(0.6rem, 2.5vw, 1.5rem)',
                    borderRadius: '6px',
                    fontSize: 'clamp(0.65rem, 3vw, 0.875rem)',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    flex: '1',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#0056b3'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#007bff'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Contact
                </button>
              </div>
            </div>
          ) : (
            // Desktop Navigation Layout
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Desktop Logo */}
              <div 
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={() => router.push('/')}
              >
                <img 
                  src="/BRIDGE.png" 
                  alt="Bridge Software Solutions Logo" 
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              {/* Desktop Navigation Links */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center'
              }}>
                {/* Home Button */}
                <button style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  position: 'relative',
                  transform: 'scale(1)'
                }}
                onClick={() => router.push('/')}
                onMouseEnter={(e) => {
                  e.target.style.color = '#000000'
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666'
                  e.target.style.transform = 'scale(1)'
                }}>
                  Home
                </button>

                {/* Services Button */}
                <button style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  position: 'relative',
                  transform: 'scale(1)'
                }}
                onClick={() => router.push('/#services')}
                onMouseEnter={(e) => {
                  e.target.style.color = '#000000'
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666'
                  e.target.style.transform = 'scale(1)'
                }}>
                  Services
                </button>

                {/* Projects Button */}
                <button style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  position: 'relative',
                  transform: 'scale(1)'
                }}
                onClick={() => router.push('/#projects')}
                onMouseEnter={(e) => {
                  e.target.style.color = '#000000'
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666'
                  e.target.style.transform = 'scale(1)'
                }}>
                  Projects
                </button>

                {/* Blogs Link - Active */}
                <button style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  color: '#000000',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  position: 'relative',
                  transform: 'scale(1)'
                }}
                onClick={() => router.push('/blogs')}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)'
                }}
                >
                  Blogs
                </button>
                
                {/* Contact Button */}
                <button
                  onClick={() => router.push('/contact')}
                  style={{
                    background: '#007bff',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#0056b3'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#007bff'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Blog Header */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '120px 20px 40px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '3em', 
            fontWeight: 'bold', 
            color: '#000',
            marginBottom: '20px'
          }}>
            Our Blog
          </h1>
          <p style={{ 
            fontSize: '1.2em', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Latest insights on web development, digital marketing, and business growth strategies for Hyderabad businesses
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px 80px',
        }}>
          {posts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onClick={() => router.push(`/blogs/${post.slug}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Post Header */}
                  <div style={{ padding: '25px' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '15px', 
                      color: '#666', 
                      fontSize: '12px',
                      marginBottom: '15px'
                    }}>
                      <span>📅 {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      <span>⏱️ {post.readingTime} min read</span>
                      <span style={{
                        background: '#f0f0f0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        textTransform: 'uppercase'
                      }}>
                        {post.stage}
                      </span>
                    </div>

                    <h2 style={{ 
                      fontSize: '1.4em', 
                      fontWeight: 'bold',
                      color: '#000',
                      marginBottom: '15px',
                      lineHeight: '1.3'
                    }}>
                      {post.title}
                    </h2>

                    <p style={{ 
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      {post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} style={{
                            display: 'inline-block',
                            background: '#f5f5f5',
                            padding: '4px 10px',
                            margin: '0 6px 6px 0',
                            borderRadius: '15px',
                            fontSize: '11px',
                            color: '#666'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button style={{
                      background: '#000',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <h2 style={{ marginBottom: '20px' }}>No Blog Posts Yet</h2>
              <p style={{ marginBottom: '30px' }}>
                Our automated blog system will start generating content every Monday at 6 AM UTC.
              </p>
              <p style={{ fontSize: '14px', opacity: 0.7 }}>
                Check back on Monday for fresh, SEO-optimized content!
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div style={{
            background: '#000',
            color: '#fff',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '60px'
          }}>
            <h3 style={{ fontSize: '1.8em', marginBottom: '15px' }}>
              Ready to Grow Your Business?
            </h3>
            <p style={{ 
              marginBottom: '25px', 
              opacity: 0.9,
              fontSize: '1.1em'
            }}>
              Get expert web development and digital marketing services in Hyderabad
            </p>
            <button 
              onClick={() => router.push('/contact')}
              style={{
                padding: '15px 35px',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return {
        props: {
          posts: [],
        },
        revalidate: 3600, // Revalidate every hour
      };
    }

    const filenames = fs.readdirSync(postsDirectory);
    const posts = filenames
      .filter(name => name.endsWith('.mdx'))
      .map((name) => {
        const fullPath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        return {
          slug: name.replace(/\.mdx$/, ''),
          title: frontMatter.title || 'Untitled',
          excerpt: frontMatter.excerpt || '',
          date: frontMatter.date || new Date().toISOString().split('T')[0],
          tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : [],
          readingTime: frontMatter.readingTime || 5,
          stage: frontMatter.stage || 'MOFU',
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

    return {
      props: {
        posts,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps for blog index:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 3600,
    };
  }
}