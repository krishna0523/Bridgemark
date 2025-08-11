import fs from 'fs';
import path from 'path';
import { parse } from 'csv-string';

async function getCsvFromGitHub() {
  try {
    const owner = process.env.GITHUB_OWNER || 'krishna0523';
    const repo = process.env.GITHUB_REPO || 'Bridgemark';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.warn('GitHub token not found - falling back to local file');
      return null;
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/keywords/keywords.csv`;
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch CSV from GitHub:', response.statusText);
      return null;
    }

    const fileData = await response.json();
    const csvContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    return csvContent;
  } catch (error) {
    console.error('Error fetching CSV from GitHub:', error);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let csvContent;
    
    // In production, try to get the latest CSV from GitHub first
    if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
      console.log('Production environment - fetching CSV from GitHub');
      csvContent = await getCsvFromGitHub();
    }
    
    // Fall back to local file if GitHub read fails or in development
    if (!csvContent) {
      console.log('Reading CSV from local file system');
      const csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
      
      if (!fs.existsSync(csvPath)) {
        return res.status(404).json({ error: 'Keywords file not found' });
      }
      
      csvContent = fs.readFileSync(csvPath, 'utf-8');
    }

    const rows = parse(csvContent);
    const headers = rows[0];
    const data = rows.slice(1);
    
    const keywords = data.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });

    // Sort keywords - published first, then by priority, then by keyword name
    keywords.sort((a, b) => {
      // First sort by status (published first)
      if (a.status === 'published' && b.status !== 'published') return -1;
      if (b.status === 'published' && a.status !== 'published') return 1;
      
      // If both have same status, sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = priorityOrder[a.priority] ?? 3;
      const bPriority = priorityOrder[b.priority] ?? 3;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // If same status and priority, sort alphabetically by keyword
      return (a.keyword || '').localeCompare(b.keyword || '');
    });

    // Calculate stats
    const stats = keywords.reduce((acc, keyword) => {
      const status = keyword.status || 'queued';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Ensure all status types are present
    const completeStats = {
      queued: stats.queued || 0,
      generating: stats.generating || 0,
      published: stats.published || 0,
      failed: stats.failed || 0
    };

    res.status(200).json({
      keywords: keywords,
      stats: completeStats,
      total: keywords.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error reading keywords:', error);
    res.status(500).json({ error: 'Failed to read keywords data' });
  }
}