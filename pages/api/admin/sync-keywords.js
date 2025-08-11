import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv-string';
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

async function commitCsvToGitHub(csvContent) {
  try {
    const owner = process.env.GITHUB_OWNER || 'krishna0523';
    const repo = process.env.GITHUB_REPO || 'Bridgemark';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.warn('GitHub token not found - skipping CSV sync');
      return { success: false, message: 'GitHub token not configured' };
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/keywords/keywords.csv`;
    const encodedContent = Buffer.from(csvContent).toString('base64');

    // Get current file SHA
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
        message: 'Sync keywords with published blog posts',
        content: encodedContent,
        branch: 'main',
        ...(sha && { sha })
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to commit CSV to GitHub:', response.statusText, errorText);
      return { success: false, message: `GitHub commit failed: ${response.statusText}` };
    }

    return { success: true, message: 'Keywords synced successfully' };
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

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
    const postsPath = path.join(process.cwd(), 'content/posts');

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

    // Read all published blog posts
    const publishedPosts = new Map();
    if (fs.existsSync(postsPath)) {
      const postFiles = fs.readdirSync(postsPath).filter(file => file.endsWith('.mdx'));
      
      for (const file of postFiles) {
        try {
          const filePath = path.join(postsPath, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data: frontMatter } = matter(fileContent);
          
          const slug = file.replace('.mdx', '');
          publishedPosts.set(slug, {
            title: frontMatter.title,
            slug,
            url: `/blogs/${slug}`,
            lastGenerated: new Date().toISOString(),
            excerpt: frontMatter.excerpt,
            tags: frontMatter.tags || []
          });
        } catch (error) {
          console.error(`Error reading post ${file}:`, error);
        }
      }
    }

    // Update keywords with blog post information
    let updated = 0;
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      
      // Try to find matching blog post by checking if keyword appears in any slug
      let matchingPost = null;
      
      // First try direct URL match
      if (keyword.url) {
        const slugFromUrl = keyword.url.replace('/blogs/', '');
        matchingPost = publishedPosts.get(slugFromUrl);
      }
      
      // If no direct match, try to find by keyword similarity
      if (!matchingPost && keyword.keyword) {
        const keywordSlug = keyword.keyword
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        for (const [slug, post] of publishedPosts) {
          if (slug.includes(keywordSlug) || keywordSlug.includes(slug.split('-')[0])) {
            matchingPost = post;
            break;
          }
        }
      }
      
      if (matchingPost) {
        // Update keyword with blog post info
        if (keywords[i].status !== 'published' || 
            keywords[i].url !== matchingPost.url ||
            keywords[i].title !== matchingPost.title) {
          
          keywords[i].status = 'published';
          keywords[i].url = matchingPost.url;
          keywords[i].title = matchingPost.title;
          keywords[i].excerpt = matchingPost.excerpt;
          keywords[i].last_generated = matchingPost.lastGenerated;
          updated++;
        }
      }
    }

    // Write updated CSV
    if (updated > 0) {
      const headers = Object.keys(keywords[0] || {});
      const data = keywords.map(kw => headers.map(header => kw[header] || ''));
      const csvContent = stringify([headers, ...data]);

      // Save locally in development
      if (process.env.NODE_ENV === 'development') {
        fs.writeFileSync(csvPath, csvContent);
      }

      // Commit to GitHub
      let commitResult = { success: true, message: 'Updated locally' };
      if (process.env.VERCEL_ENV === 'production' || process.env.GITHUB_TOKEN) {
        commitResult = await commitCsvToGitHub(csvContent);
      }

      res.status(200).json({
        success: true,
        message: `Synced ${updated} keywords with published blog posts. ${commitResult.message}`,
        updated
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Keywords are already up to date',
        updated: 0
      });
    }

  } catch (error) {
    console.error('Error syncing keywords:', error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to sync keywords: ${error.message}` 
    });
  }
}