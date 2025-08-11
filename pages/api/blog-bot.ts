import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv-string';
import CloudflareAI, { BlogGenerationRequest } from '../../lib/ai/cloudflare';

interface KeywordRow {
  keyword: string;
  status: 'queued' | 'generating' | 'published' | 'failed';
  stage: 'TOFU' | 'MOFU' | 'BOFU';
  intent: 'informational' | 'transactional' | 'commercial' | 'comparison';
  priority: 'high' | 'medium' | 'low';
  last_generated?: string;
  url?: string;
  title?: string;
  excerpt?: string;
}

class BlogBot {
  private csvPath: string;
  private postsPath: string;
  private ai: CloudflareAI;

  constructor() {
    this.csvPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
    this.postsPath = path.join(process.cwd(), 'content/posts');
    
    this.ai = new CloudflareAI({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!
    });
  }

  async readKeywords(): Promise<KeywordRow[]> {
    try {
      const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
      const rows = parse(csvContent);
      const headers = rows[0];
      const data = rows.slice(1);
      
      return data.map(row => {
        const obj: any = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });
        return obj as KeywordRow;
      });
    } catch (error) {
      console.error('Error reading keywords CSV:', error);
      return [];
    }
  }

  async updateKeywords(keywords: KeywordRow[]): Promise<void> {
    try {
      const headers = Object.keys(keywords[0] || {});
      const data = keywords.map(keyword => headers.map(header => (keyword as any)[header] || ''));
      const csvContent = stringify([headers, ...data]);
      
      // Write locally in development
      if (process.env.NODE_ENV === 'development') {
        fs.writeFileSync(this.csvPath, csvContent);
        console.log('Updated keywords CSV locally');
      }
      
      // Always commit to GitHub (required for production and persistence)
      await this.commitCsvToGitHub(csvContent);
    } catch (error) {
      console.error('Error updating keywords CSV:', error);
      throw error;
    }
  }

  async generateBlogPost(keyword: KeywordRow): Promise<string> {
    const request: BlogGenerationRequest = {
      keyword: keyword.keyword,
      stage: keyword.stage,
      intent: keyword.intent,
      businessContext: `Bridge Software Solutions is a premium web development and digital marketing agency based in Hyderabad, specializing in helping small to medium businesses grow their online presence. We offer services including custom website development, SEO, digital marketing, mobile app development, and e-commerce solutions.`
    };

    try {
      const blogContent = await this.ai.generateFullBlog(request);
      
      // Create frontmatter
      const frontmatter = `---
title: "${blogContent.title}"
slug: "${blogContent.slug}"
excerpt: "${blogContent.excerpt}"
date: "${new Date().toISOString().split('T')[0]}"
tags: [${blogContent.tags.map(tag => `"${tag}"`).join(', ')}]
readingTime: ${blogContent.readingTime}
stage: "${keyword.stage}"
intent: "${keyword.intent}"
draft: false
cover: "/images/og/${blogContent.slug}.png"
---

${blogContent.content}

## Ready to Grow Your Business?

At Bridge Software Solutions, we help businesses in Hyderabad leverage the latest technologies and strategies to achieve their digital goals. Whether you need ${keyword.intent === 'transactional' ? keyword.keyword : 'digital marketing services'}, we're here to help.

[Get in touch with our experts today](/contact) and let's discuss how we can transform your online presence.

---

*This article was written by the Bridge Software Solutions team. We're passionate about helping businesses succeed online through innovative web development and digital marketing strategies.*`;

      // Save the blog post
      const fileName = `${blogContent.slug}.mdx`;
      
      // Only write locally in development
      if (process.env.NODE_ENV === 'development') {
        const filePath = path.join(this.postsPath, fileName);
        fs.writeFileSync(filePath, frontmatter);
      }

      // Always commit to GitHub (required for production)
      await this.commitToGitHub(fileName, frontmatter, blogContent.title);

      return `/blogs/${blogContent.slug}`;
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw error;
    }
  }

  async commitToGitHub(fileName: string, content: string, title: string): Promise<void> {
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

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Add blog post: ${title}`,
          content: encodedContent,
          branch: 'main'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to commit to GitHub:', response.statusText, errorText);
        throw new Error(`GitHub commit failed: ${response.statusText}`);
      } else {
        console.log('Successfully committed to GitHub:', fileName);
      }
    } catch (error) {
      console.error('Error committing to GitHub:', error);
      throw error;
    }
  }

  async commitCsvToGitHub(csvContent: string): Promise<void> {
    try {
      const owner = process.env.GITHUB_OWNER || 'krishna0523';
      const repo = process.env.GITHUB_REPO || 'Bridgemark';
      const token = process.env.GITHUB_TOKEN;

      if (!token) {
        const errorMsg = 'GitHub token not found - CSV updates will not persist';
        console.error(errorMsg);
        throw new Error(errorMsg);
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
          message: 'Update keywords status via blog generation',
          content: encodedContent,
          branch: 'main',
          sha
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to commit CSV to GitHub:', response.statusText, errorText);
        throw new Error(`GitHub CSV commit failed: ${response.statusText}`);
      } else {
        console.log('Successfully committed CSV to GitHub');
      }
    } catch (error) {
      console.error('Error committing CSV to GitHub:', error);
      throw error;
    }
  }

  async triggerRevalidation(): Promise<void> {
    try {
      const revalidateUrl = `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/revalidate`;
      const response = await fetch(revalidateUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CRON_SECRET}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Failed to trigger revalidation:', response.statusText);
      }
    } catch (error) {
      console.error('Error triggering revalidation:', error);
    }
  }

  async processNextKeyword(): Promise<{ success: boolean; message: string; keyword?: string }> {
    try {
      console.log('Starting blog generation process...');
      const keywords = await this.readKeywords();
      console.log(`Total keywords loaded: ${keywords.length}`);
      
      const queuedKeywords = keywords.filter(k => k.status === 'queued');
      console.log(`Queued keywords found: ${queuedKeywords.length}`);
      
      if (queuedKeywords.length === 0) {
        console.log('No queued keywords available');
        return { success: false, message: 'No queued keywords found' };
      }

      // Sort by priority (high first)
      queuedKeywords.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      const nextKeyword = queuedKeywords[0];
      console.log(`Selected keyword: "${nextKeyword.keyword}" (priority: ${nextKeyword.priority})`);
      
      // Mark as generating
      const keywordIndex = keywords.findIndex(k => k.keyword === nextKeyword.keyword);
      keywords[keywordIndex].status = 'generating';
      keywords[keywordIndex].last_generated = new Date().toISOString();
      console.log('Marking keyword as generating...');
      await this.updateKeywords(keywords);

      try {
        // Generate the blog post
        console.log('Generating blog post...');
        const blogUrl = await this.generateBlogPost(nextKeyword);
        console.log(`Blog post generated successfully: ${blogUrl}`);
        
        // Update status to published
        keywords[keywordIndex].status = 'published';
        keywords[keywordIndex].url = blogUrl;
        keywords[keywordIndex].title = `Generated blog for ${nextKeyword.keyword}`;
        console.log('Marking keyword as published...');
        await this.updateKeywords(keywords);

        // Trigger revalidation
        console.log('Triggering revalidation...');
        await this.triggerRevalidation();

        return {
          success: true,
          message: `Successfully generated blog post for "${nextKeyword.keyword}"`,
          keyword: nextKeyword.keyword
        };
      } catch (error) {
        console.error('Error during blog generation:', error);
        // Mark as failed
        keywords[keywordIndex].status = 'failed';
        await this.updateKeywords(keywords);
        throw error;
      }
    } catch (error) {
      console.error('Error processing keyword:', error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify cron secret for security
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const blogBot = new BlogBot();
    const result = await blogBot.processNextKeyword();
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Blog bot error:', error);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
}