export interface CloudflareAIConfig {
  accountId: string;
  apiToken: string;
}

export interface BlogGenerationRequest {
  keyword: string;
  stage: 'TOFU' | 'MOFU' | 'BOFU';
  intent: 'informational' | 'transactional' | 'commercial' | 'comparison';
  businessContext: string;
}

export interface BlogContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: number;
  metaDescription: string;
  schema: any;
}

class CloudflareAI {
  private config: CloudflareAIConfig;
  private baseUrl: string;

  constructor(config: CloudflareAIConfig) {
    this.config = config;
    this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/ai/run`;
  }

  private async callModel(model: string, messages: any[]): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages
      }),
    });

    if (!response.ok) {
      throw new Error(`Cloudflare AI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  }

  async generateBlogTitle(keyword: string, stage: string, intent: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an expert content marketer for Bridge Software Solutions, a premium web development and digital marketing agency in Hyderabad. Generate ONE compelling blog title that:
        - Include the primary keyword naturally
        - Match the funnel stage (${stage}) and search intent (${intent})
        - Appeal to small business owners in Hyderabad
        - Include the year 2025 when relevant
        - Are under 60 characters for SEO
        - Sound professional but approachable
        - RETURN ONLY THE TITLE, NOTHING ELSE`
      },
      {
        role: 'user',
        content: `Generate ONE short blog title for the keyword: "${keyword}". Stage: ${stage}, Intent: ${intent}. Return ONLY the title.`
      }
    ];

    const result = await this.callModel('@cf/meta/llama-3.1-8b-instruct', messages);
    
    // Clean up the response and ensure it's just the title
    let title = result.response.trim().replace(/"/g, '');
    
    // Remove any numbering or extra text
    title = title.replace(/^\d+\.\s*/, '').trim();
    title = title.split('\n')[0].trim();
    
    // Ensure it's not too long for filename
    if (title.length > 100) {
      title = title.substring(0, 100).trim();
    }
    
    return title;
  }

  async generateBlogOutline(title: string, keyword: string, stage: string): Promise<string[]> {
    const messages = [
      {
        role: 'system',
        content: `Create a comprehensive blog outline for Bridge Software Solutions. Return ONLY the section headings as H2 markdown headers (##). Each heading should:
        - Be a proper ## H2 markdown header
        - Include practical, actionable content
        - Address pain points of small businesses in Hyderabad
        - Incorporate the keyword naturally
        - Be optimized for ${stage} funnel stage
        
        Example format:
        ## Understanding Web Development Costs in Hyderabad
        ## Factors That Affect Website Design Pricing
        ## Comparing Web Development Packages
        
        Return 6-8 headings ONLY, one per line.`
      },
      {
        role: 'user',
        content: `Create an outline for: "${title}" targeting keyword "${keyword}". Return ONLY the ## headings, nothing else.`
      }
    ];

    const result = await this.callModel('@cf/meta/llama-3.1-8b-instruct', messages);
    
    // Parse and clean the outline
    let outline = result.response.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('##'))
      .slice(0, 8); // Limit to 8 sections
    
    // If no proper headings found, create default ones
    if (outline.length === 0) {
      outline = [
        `## Understanding ${keyword} in 2025`,
        `## Benefits of Professional ${keyword}`,
        `## How to Choose the Right Service Provider`,
        `## Success Stories from Hyderabad Businesses`,
        `## Getting Started with ${keyword}`,
        `## Why Choose Bridge Software Solutions`
      ];
    }
    
    return outline;
  }

  async generateBlogSection(sectionHeading: string, keyword: string, context: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are writing for Bridge Software Solutions blog. Write engaging, informative content that:
        - Uses a professional but conversational tone
        - Includes specific examples relevant to Hyderabad businesses
        - Naturally incorporates SEO keywords without keyword stuffing
        - Provides actionable insights and tips
        - Uses bullet points and subheadings when appropriate
        - Includes local references to Hyderabad market
        - Maintains a helpful, expert voice
        - Write 250-350 words per section
        - Focus on providing real value to small business owners
        - Include specific benefits and practical advice
        
        DO NOT repeat the heading in your response - start directly with the content.`
      },
      {
        role: 'user',
        content: `Write detailed content for the section "${sectionHeading}". 
        
        Target keyword: "${keyword}"
        Business context: ${context}
        
        Make it specific to Hyderabad market with practical examples. Write 250-350 words of valuable content that helps small businesses understand this topic.`
      }
    ];

    const result = await this.callModel('@cf/meta/llama-3.1-8b-instruct', messages);
    
    // Clean up the response - remove any heading repetition
    let content = result.response.trim();
    
    // Remove if it starts with the heading
    if (content.startsWith(sectionHeading)) {
      content = content.substring(sectionHeading.length).trim();
    }
    
    // Ensure minimum content length
    if (content.length < 100) {
      content = `In the competitive Hyderabad market, understanding ${keyword} is crucial for business success. Local businesses are increasingly recognizing the importance of professional digital services to stay ahead of the competition.

Small and medium enterprises in areas like HITEC City, Banjara Hills, and Jubilee Hills are investing more in quality digital solutions. The growing tech ecosystem in Hyderabad provides unique opportunities for businesses to leverage cutting-edge technologies.

When considering ${keyword}, Hyderabad businesses should focus on:
- Quality and reliability of service providers
- Local market expertise and understanding
- Competitive pricing that fits their budget
- Long-term partnership potential
- Technical support and maintenance

Bridge Software Solutions has been serving the Hyderabad market for years, helping local businesses achieve their digital transformation goals through expert guidance and innovative solutions.`;
    }
    
    return content;
  }

  async generateMetaDescription(title: string, keyword: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: 'Generate a compelling meta description under 150 characters that includes the primary keyword and encourages clicks. Focus on benefits for Hyderabad businesses. Return ONLY the meta description, no additional text.'
      },
      {
        role: 'user',
        content: `Title: "${title}" Keyword: "${keyword}" - Return only the meta description.`
      }
    ];

    const result = await this.callModel('@cf/meta/llama-3.1-8b-instruct', messages);
    let description = result.response.trim().replace(/"/g, '');
    
    // Clean up and limit length
    description = description.split('\n')[0].trim();
    if (description.length > 155) {
      description = description.substring(0, 155).trim() + '...';
    }
    
    return description;
  }

  async generateTags(keyword: string, content: string): Promise<string[]> {
    const messages = [
      {
        role: 'system',
        content: 'Generate 5 relevant tags for this blog post. Return only the tags separated by commas, lowercase, no quotes. Focus on: web development, digital marketing, location (hyderabad), and related services.'
      },
      {
        role: 'user',
        content: `Keyword: "${keyword}" - Generate 5 tags related to web development and digital marketing in Hyderabad.`
      }
    ];

    const result = await this.callModel('@cf/meta/llama-3.1-8b-instruct', messages);
    
    // Clean up tags
    let tagsString = result.response.trim().replace(/"/g, '');
    let tags = tagsString.split(',').map((tag: string) => {
      return tag.trim().toLowerCase().replace(/^\d+\.\s*/, '').replace(/^-\s*/, '');
    }).filter(tag => tag.length > 0);
    
    // If we didn't get good tags, use defaults based on keyword
    if (tags.length < 3) {
      tags = [
        'web development',
        'hyderabad',
        'digital marketing',
        'website design',
        'business growth'
      ];
    }
    
    return tags.slice(0, 5);
  }

  async generateFullBlog(request: BlogGenerationRequest): Promise<BlogContent> {
    try {
      // Step 1: Generate title
      const title = await this.generateBlogTitle(request.keyword, request.stage, request.intent);
      
      // Step 2: Generate outline
      const outline = await this.generateBlogOutline(title, request.keyword, request.stage);
      
      // Step 3: Generate content for each section
      const sections = [];
      for (const heading of outline) {
        const sectionContent = await this.generateBlogSection(heading, request.keyword, request.businessContext);
        sections.push(`${heading}\n\n${sectionContent}\n`);
      }
      
      // Step 4: Generate meta and tags
      const content = sections.join('\n');
      const metaDescription = await this.generateMetaDescription(title, request.keyword);
      const tags = await this.generateTags(request.keyword, content);
      
      // Step 5: Create slug
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Step 6: Estimate reading time
      const wordCount = content.split(' ').length;
      const readingTime = Math.ceil(wordCount / 200);

      // Step 7: Generate schema
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": metaDescription,
        "author": {
          "@type": "Organization",
          "name": "Bridge Software Solutions",
          "url": "https://bridgesoftwaresolutions.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bridge Software Solutions",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bridgesoftwaresolutions.com/logo.png"
          }
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://bridgesoftwaresolutions.com/blogs/${slug}`
        },
        "keywords": tags,
        "wordCount": wordCount,
        "timeRequired": `PT${readingTime}M`
      };

      return {
        title,
        slug,
        excerpt: metaDescription,
        content,
        tags,
        readingTime,
        metaDescription,
        schema
      };

    } catch (error) {
      console.error('Error generating blog content:', error);
      throw error;
    }
  }
}

export default CloudflareAI;