import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify cron secret for security
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Revalidate key pages that might show new blog content
    const pathsToRevalidate = [
      '/',           // Homepage (shows recent blog posts)
      '/blogs',      // Blog index page
      '/sitemap.xml' // Sitemap (if you have dynamic sitemap generation)
    ];

    // If a specific path is provided, revalidate that too
    const { path } = req.body;
    if (path && typeof path === 'string') {
      pathsToRevalidate.push(path);
    }

    const revalidationResults = [];

    for (const pathToRevalidate of pathsToRevalidate) {
      try {
        // Note: res.revalidate() is available in Next.js 12.2.0+
        // For older versions, you might need to use a different approach
        if (res.revalidate) {
          await res.revalidate(pathToRevalidate);
          revalidationResults.push({ path: pathToRevalidate, status: 'success' });
        } else {
          revalidationResults.push({ path: pathToRevalidate, status: 'not_supported' });
        }
      } catch (error) {
        console.error(`Failed to revalidate ${pathToRevalidate}:`, error);
        revalidationResults.push({
          path: pathToRevalidate,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Update sitemap if you have a dynamic one
    try {
      if (res.revalidate) {
        await res.revalidate('/sitemap.xml');
      }
    } catch (error) {
      console.error('Failed to revalidate sitemap:', error);
    }

    return res.status(200).json({
      message: 'Revalidation completed',
      results: revalidationResults,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return res.status(500).json({
      error: 'Failed to revalidate',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}