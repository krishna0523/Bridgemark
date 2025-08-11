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

async function deleteFromGitHub(fileName) {
  try {
    const owner = process.env.GITHUB_OWNER || 'krishna0523';
    const repo = process.env.GITHUB_REPO || 'Bridgemark';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.warn('GitHub token not found - cannot delete from production');
      if (process.env.VERCEL_ENV === 'production') {
        throw new Error('GitHub token not configured in production');
      }
      return;
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/posts/${fileName}`;

    // First, get the current file to get its SHA
    const getResponse = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!getResponse.ok) {
      throw new Error(`Failed to get file for deletion: ${getResponse.statusText}`);
    }

    const fileData = await getResponse.json();

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Delete blog post: ${fileName}`,
        sha: fileData.sha,
        branch: 'main'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to delete from GitHub:', response.statusText, errorText);
      throw new Error(`GitHub deletion failed: ${response.statusText}`);
    }

    console.log('Successfully deleted from GitHub:', fileName);
  } catch (error) {
    console.error('Error deleting from GitHub:', error);
    throw error;
  }
}

async function updateKeywordsCsv(slug) {
  try {
    const csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
    
    if (!fs.existsSync(csvPath)) {
      return;
    }

    // Read keywords CSV
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

    // Find and update the keyword that matches this blog post
    let updated = false;
    for (let i = 0; i < keywords.length; i++) {
      if (keywords[i].url === `/blogs/${slug}`) {
        keywords[i].status = 'queued';
        keywords[i].url = '';
        keywords[i].last_generated = '';
        updated = true;
        break;
      }
    }

    if (updated) {
      // Write updated CSV
      const updatedData = keywords.map(kw => headers.map(header => kw[header] || ''));
      const updatedCsvContent = stringify([headers, ...updatedData]);
      
      // Save locally in development
      if (process.env.NODE_ENV === 'development') {
        fs.writeFileSync(csvPath, updatedCsvContent);
      }

      // Commit to GitHub if in production
      if (process.env.GITHUB_TOKEN) {
        const owner = process.env.GITHUB_OWNER || 'krishna0523';
        const repo = process.env.GITHUB_REPO || 'Bridgemark';
        const token = process.env.GITHUB_TOKEN;

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/keywords/keywords.csv`;
        const encodedContent = Buffer.from(updatedCsvContent).toString('base64');

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
        }

        await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `Update keywords after deleting blog post: ${slug}`,
            content: encodedContent,
            branch: 'main',
            ...(sha && { sha })
          })
        });
      }
    }
  } catch (error) {
    console.error('Error updating keywords CSV:', error);
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

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ 
      success: false, 
      message: 'Blog slug is required' 
    });
  }

  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileName = `${slug}.mdx`;

    // Check if file exists locally
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }

    // Delete locally in development
    if (process.env.NODE_ENV === 'development') {
      fs.unlinkSync(filePath);
    }

    // Delete from GitHub (required for production)
    await deleteFromGitHub(fileName);

    // Update keywords CSV to reset the keyword status
    await updateKeywordsCsv(slug);

    res.status(200).json({
      success: true,
      message: `Blog post "${slug}" deleted successfully`
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to delete blog post: ${error.message}` 
    });
  }
}