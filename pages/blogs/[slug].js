import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export default function BlogPost({ frontMatter, mdxSource }) {
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
  
  if (router.isFallback) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!frontMatter) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', minHeight: '100vh' }}>
        <h1>Blog Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/')} style={{ 
          padding: '10px 20px', 
          background: '#000', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer' 
        }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} | Bridge Software Solutions</title>
        <meta name="description" content={frontMatter.excerpt} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.excerpt} />
        {frontMatter.cover && <meta property="og:image" content={frontMatter.cover} />}
        <link rel="canonical" href={`https://bridgesoftwaresolutions.com/blogs/${frontMatter.slug}`} />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": frontMatter.title,
              "description": frontMatter.excerpt,
              "author": {
                "@type": "Organization",
                "name": "Bridge Software Solutions"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bridge Software Solutions",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://bridgesoftwaresolutions.com/logo.png"
                }
              },
              "datePublished": frontMatter.date,
              "dateModified": frontMatter.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://bridgesoftwaresolutions.com/blogs/${frontMatter.slug}`
              },
              "keywords": frontMatter.tags?.join(', '),
              "wordCount": frontMatter.wordCount,
              "timeRequired": `PT${frontMatter.readingTime}M`
            })
          }}
        />
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

        {/* Blog Content */}
        <article style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '120px 20px 40px',
          lineHeight: '1.7'
        }}>
          {/* Header */}
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '2.5em', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              {frontMatter.title}
            </h1>
            
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              color: '#666', 
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              <span>📅 {new Date(frontMatter.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
              <span>⏱️ {frontMatter.readingTime} min read</span>
              <span>🏷️ {frontMatter.stage}</span>
            </div>

            {frontMatter.tags && (
              <div style={{ marginBottom: '30px' }}>
                {frontMatter.tags.map((tag, index) => (
                  <span key={index} style={{
                    display: 'inline-block',
                    background: '#f5f5f5',
                    padding: '4px 12px',
                    margin: '0 8px 8px 0',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              borderLeft: '4px solid #000',
              fontSize: '16px',
              color: '#555'
            }}>
              {frontMatter.excerpt}
            </div>
          </header>

          {/* Content */}
          <div style={{
            fontSize: '16px',
            color: '#333'
          }} className="blog-content">
            <MDXRemote {...mdxSource} />
          </div>

          {/* Footer CTA */}
          <footer style={{
            marginTop: '60px',
            padding: '30px',
            background: '#000',
            color: '#fff',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Ready to Transform Your Business?</h3>
            <p style={{ marginBottom: '20px', opacity: 0.9 }}>
              Get expert web development and digital marketing services in Hyderabad
            </p>
            <button 
              onClick={() => router.push('/contact')}
              style={{
                padding: '12px 30px',
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
          </footer>
        </article>
      </div>

      <style jsx global>{`
        .blog-content h1, .blog-content h2, .blog-content h3 {
          color: #000;
          margin-top: 30px;
          margin-bottom: 15px;
          font-weight: bold;
        }
        .blog-content h2 {
          font-size: 1.8em;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }
        .blog-content h3 {
          font-size: 1.4em;
        }
        .blog-content p {
          margin-bottom: 20px;
          line-height: 1.7;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 20px;
          padding-left: 30px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content code {
          background: #f5f5f5;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }
        .blog-content blockquote {
          border-left: 4px solid #ddd;
          padding-left: 20px;
          margin: 20px 0;
          font-style: italic;
          color: #666;
        }
        .blog-content strong {
          font-weight: bold;
          color: #000;
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return {
        paths: [],
        fallback: true,
      };
    }

    const filenames = fs.readdirSync(postsDirectory);
    const paths = filenames
      .filter(name => name.endsWith('.mdx'))
      .map((name) => ({
        params: {
          slug: name.replace(/\.mdx$/, ''),
        },
      }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return {
        notFound: true,
      };
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const mdxSource = await serialize(content);

    return {
      props: {
        frontMatter: {
          ...frontMatter,
          date: frontMatter.date || new Date().toISOString().split('T')[0],
          readingTime: frontMatter.readingTime || 5,
          slug: slug,
        },
        mdxSource,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}