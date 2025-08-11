import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Commit file to GitHub
async function commitToGitHub(fileName, content, title) {
  try {
    const owner = process.env.GITHUB_OWNER || 'krishna0523';
    const repo = process.env.GITHUB_REPO || 'Bridgemark';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      const errorMsg = 'GitHub token not found - cannot save blog post in production';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/posts/${fileName}`;
    const encodedContent = Buffer.from(content).toString('base64');

    // First, get the current file to get its SHA (required for updates)
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
      throw new Error(`Failed to get file SHA: ${getResponse.statusText}`);
    }

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Update blog post: ${title}`,
        content: encodedContent,
        branch: 'main',
        sha: sha
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to commit to GitHub:', response.statusText, errorText);
      throw new Error(`GitHub commit failed: ${response.statusText}`);
    } else {
      console.log('Successfully updated blog post in GitHub:', fileName);
    }
  } catch (error) {
    console.error('Error committing to GitHub:', error);
    throw error;
  }
}

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

export default async function handler(req, res) {
  // Verify authentication
  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  if (req.method === 'GET') {
    // Get blog post for editing
    const { slug } = req.query;
    
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Slug is required' });
    }

    try {
      const filePath = path.join(postsDirectory, `${slug}.mdx`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter, content } = matter(fileContents);
      
      res.status(200).json({
        success: true,
        post: {
          slug,
          frontMatter,
          content
        }
      });
    } catch (error) {
      console.error('Error reading post:', error);
      res.status(500).json({ success: false, message: 'Failed to read post' });
    }
  } else if (req.method === 'PUT') {
    // Update blog post
    const { slug, frontMatter, content } = req.body;
    
    if (!slug || !frontMatter || content === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Slug, frontMatter, and content are required' 
      });
    }

    try {
      const filePath = path.join(postsDirectory, `${slug}.mdx`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }

      // Create the updated file content
      const updatedFileContent = matter.stringify(content, frontMatter);
      
      // Save locally in development only
      if (process.env.NODE_ENV === 'development') {
        fs.writeFileSync(filePath, updatedFileContent, 'utf8');
      }

      // Always try to commit to GitHub (required for production)
      await commitToGitHub(`${slug}.mdx`, updatedFileContent, frontMatter.title || 'Updated Post');
      
      res.status(200).json({
        success: true,
        message: 'Post updated successfully'
      });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ success: false, message: `Failed to update post: ${error.message}` });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}