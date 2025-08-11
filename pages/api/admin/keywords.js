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

async function commitCsvToGitHub(csvContent) {
  try {
    const owner = process.env.GITHUB_OWNER || 'krishna0523';
    const repo = process.env.GITHUB_REPO || 'Bridgemark';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.log('GitHub token not found, skipping CSV commit');
      return { success: false, message: 'GitHub token not configured' };
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/keywords/keywords.csv`;
    const encodedContent = Buffer.from(csvContent).toString('base64');

    // First, get the current file to get its SHA
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
    }

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Add new keyword via admin dashboard',
        content: encodedContent,
        branch: 'main',
        ...(sha && { sha })
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to commit CSV to GitHub:', response.statusText, errorText);
      return { success: false, message: `GitHub commit failed: ${response.statusText}` };
    } else {
      console.log('Successfully committed CSV to GitHub');
      return { success: true, message: 'Successfully updated keywords file' };
    }
  } catch (error) {
    console.error('Error committing CSV to GitHub:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
}

export default async function handler(req, res) {
  // Verify authentication
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
  
  if (req.method === 'POST') {
    // Add new keyword
    const { keyword, stage, intent, priority } = req.body;
    
    // Validate required fields
    if (!keyword || !stage || !intent || !priority) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: keyword, stage, intent, priority' 
      });
    }

    // Validate enum values
    const validStages = ['TOFU', 'MOFU', 'BOFU'];
    const validIntents = ['informational', 'transactional', 'commercial', 'comparison'];
    const validPriorities = ['high', 'medium', 'low'];

    if (!validStages.includes(stage)) {
      return res.status(400).json({ success: false, message: 'Invalid stage. Must be TOFU, MOFU, or BOFU' });
    }
    if (!validIntents.includes(intent)) {
      return res.status(400).json({ success: false, message: 'Invalid intent. Must be informational, transactional, commercial, or comparison' });
    }
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ success: false, message: 'Invalid priority. Must be high, medium, or low' });
    }

    try {
      // Read current keywords
      let keywords = [];
      if (fs.existsSync(csvPath)) {
        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        const rows = parse(csvContent);
        const headers = rows[0];
        const data = rows.slice(1);
        
        keywords = data.map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
      }

      // Check if keyword already exists
      const existingKeyword = keywords.find(k => 
        k.keyword && k.keyword.toLowerCase() === keyword.toLowerCase()
      );
      
      if (existingKeyword) {
        return res.status(409).json({ 
          success: false, 
          message: 'Keyword already exists in the system' 
        });
      }

      // Generate title and excerpt for the new keyword
      const title = keyword.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const excerpt = `Professional ${keyword} services in Hyderabad. Expert solutions for growing businesses.`;

      // Add new keyword
      const newKeyword = {
        keyword: keyword.trim(),
        status: 'queued',
        stage,
        intent,
        priority,
        last_generated: '',
        url: '',
        title: `${title} - Bridge Software Solutions`,
        excerpt
      };

      keywords.push(newKeyword);

      // Update CSV content
      const headers = Object.keys(newKeyword);
      const data = keywords.map(kw => headers.map(header => kw[header] || ''));
      const csvContent = stringify([headers, ...data]);

      // Save locally if in development
      if (process.env.NODE_ENV === 'development') {
        fs.writeFileSync(csvPath, csvContent);
      }

      // Always try to commit to GitHub
      let commitResult = { success: true, message: 'Added locally' };
      if (process.env.VERCEL_ENV === 'production' || process.env.GITHUB_TOKEN) {
        commitResult = await commitCsvToGitHub(csvContent);
      }

      res.status(201).json({
        success: true,
        message: `Keyword "${keyword}" added successfully. ${commitResult.message}`,
        keyword: newKeyword
      });

    } catch (error) {
      console.error('Error adding keyword:', error);
      res.status(500).json({ 
        success: false, 
        message: `Failed to add keyword: ${error.message}` 
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}