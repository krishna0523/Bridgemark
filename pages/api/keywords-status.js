import fs from 'fs';
import path from 'path';
import { parse } from 'csv-string';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ error: 'Keywords file not found' });
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
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