import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

export default function handler(req, res) {
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
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedFileContent, 'utf8');
      
      res.status(200).json({
        success: true,
        message: 'Post updated successfully'
      });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ success: false, message: 'Failed to update post' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}