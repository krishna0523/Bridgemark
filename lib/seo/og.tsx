import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export interface OGImageProps {
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
}

export default function generateOGImage({
  title,
  excerpt,
  category = "Blog",
  date
}: OGImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
            zIndex: 1,
            maxWidth: '900px',
          }}
        >
          {/* Category Badge */}
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '30px',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {category}
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '300',
              color: '#ffffff',
              lineHeight: '1.2',
              marginBottom: '20px',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p
              style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.5',
                marginBottom: '30px',
                maxWidth: '700px',
                fontWeight: '300',
              }}
            >
              {excerpt.length > 150 ? excerpt.substring(0, 150) + '...' : excerpt}
            </p>
          )}

          {/* Bottom Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '700px',
              marginTop: '40px',
              paddingTop: '30px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                }}
              >
                Bridge Software Solutions
              </div>
            </div>

            {/* Date */}
            {date && (
              <div
                style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: '400',
                }}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('/fonts/Inter-Regular.woff2', import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: await fetch(
            new URL('/fonts/Inter-Medium.woff2', import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}