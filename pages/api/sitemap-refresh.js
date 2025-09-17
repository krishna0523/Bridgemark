import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify authorization
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting sitemap regeneration...');
    
    // Generate new sitemap
    await execAsync('npm run sitemap');
    
    console.log('Sitemap regenerated successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Sitemap regenerated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error regenerating sitemap:', error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to regenerate sitemap: ${error.message}` 
    });
  }
}