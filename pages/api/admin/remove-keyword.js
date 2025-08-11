import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv-string';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify admin authentication
function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.isAdmin === true;
  } catch (error) {
    return false;
  }
}

async function removeKeywordFromGitHub(csvContent) {
  try {
    const owner = process.env.GITHUB_OWNER || 'krishna0523';
    const repo = process.env.GITHUB_REPO || 'Bridgemark';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.warn('GitHub token not found - cannot save changes in production');
      if (process.env.VERCEL_ENV === 'production') {
        throw new Error('GitHub token not configured in production');
      }
      return;
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/keywords/keywords.csv`;
    const encodedContent = Buffer.from(csvContent).toString('base64');

    // Get current CSV file SHA
    const getResponse = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let sha;
    if (getResponse.ok) {
      const fileData = await getResponse.json();
      sha = fileData.sha;
    } else {
      throw new Error(`Failed to get current CSV file: ${getResponse.statusText}`);
    }

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Remove keyword from list',
        content: encodedContent,
        branch: 'main',
        sha
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to commit to GitHub:', response.statusText, errorText);
      throw new Error(`GitHub commit failed: ${response.statusText}`);
    }

    console.log('Successfully updated keywords CSV in GitHub');
  } catch (error) {
    console.error('Error committing to GitHub:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Verify authentication
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { keyword } = req.body;

  if (!keyword || !keyword.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Keyword is required' 
    });
  }

  try {
    const csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Keywords file not found' 
      });
    }

    // Read current keywords
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

    // Find and remove the keyword
    const keywordToRemove = keyword.trim();
    const initialCount = keywords.length;
    const filteredKeywords = keywords.filter(kw => kw.keyword !== keywordToRemove);

    if (filteredKeywords.length === initialCount) {
      return res.status(404).json({
        success: false,
        message: `Keyword "${keywordToRemove}" not found in the list`
      });
    }

    // Generate updated CSV content
    const updatedData = filteredKeywords.map(kw => headers.map(header => kw[header] || ''));
    const updatedCsvContent = stringify([headers, ...updatedData]);
    
    // Save locally in development
    if (process.env.NODE_ENV === 'development') {
      fs.writeFileSync(csvPath, updatedCsvContent);
    }

    // Commit to GitHub
    await removeKeywordFromGitHub(updatedCsvContent);

    res.status(200).json({
      success: true,
      message: `Keyword "${keywordToRemove}" removed successfully`,
      removedKeyword: keywordToRemove,
      remainingCount: filteredKeywords.length
    });

  } catch (error) {
    console.error('Error removing keyword:', error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to remove keyword: ${error.message}` 
    });
  }
}