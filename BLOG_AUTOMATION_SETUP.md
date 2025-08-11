# Blog Automation Setup Guide

This guide explains how to set up automated blog generation using Vercel Cron + Cloudflare Workers AI + GitHub commits.

## 🎯 How It Works

1. **Keywords Management**: Keep a `keywords.csv` file with blog topics and their status
2. **Weekly Generation**: Vercel Cron runs every Monday at 6 AM to generate one blog post
3. **AI Content Creation**: Cloudflare Workers AI generates title, outline, content, and meta data
4. **Automatic Publishing**: Blog post is saved as MDX and committed to GitHub
5. **Cache Revalidation**: Vercel revalidates affected pages to show new content

## 📁 Files Added

```
content/
├── keywords/
│   └── keywords.csv          # Keyword queue management
└── posts/                    # Generated blog posts (MDX)
    └── [generated-posts].mdx

lib/
├── ai/
│   └── cloudflare.ts         # Cloudflare Workers AI integration
└── seo/
    ├── schema.ts             # SEO schema generation
    └── og.tsx                # OG image generation

pages/api/
├── blog-bot.ts               # Main automation endpoint
└── revalidate.ts             # Cache revalidation endpoint

vercel.json                   # Cron job configuration
.env.example                  # Environment variables template
```

## 🔧 Setup Instructions

### 1. Cloudflare Setup

1. **Create Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Get Account ID**: 
   - Go to Cloudflare Dashboard → Right sidebar → Account ID
3. **Create API Token**:
   - Go to "My Profile" → "API Tokens" → "Create Token"
   - Use "Custom token" template
   - Permissions: `Account:Cloudflare Workers AI:Edit`
   - Account Resources: Include your account

### 2. GitHub Setup (Optional)

1. **Create Personal Access Token**:
   - GitHub → Settings → Developer settings → Personal access tokens
   - Scope: `repo` (full repository access)
2. **Note your username and repository name**

### 3. Environment Variables

Create a `.env.local` file in your project root:

```env
# Required
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CRON_SECRET=your_random_secret_key

# Optional (for GitHub commits)
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
```

### 4. Vercel Deployment

1. **Deploy to Vercel**: Connect your GitHub repository to Vercel
2. **Add Environment Variables**: In Vercel dashboard, go to Settings → Environment Variables
3. **Verify Cron Jobs**: Check Vercel dashboard → Functions → Cron Jobs

### 5. Keywords Management

Edit `content/keywords/keywords.csv` to add your target keywords:

```csv
keyword,status,stage,intent,priority,last_generated,url,title,excerpt
"web development hyderabad",queued,MOFU,transactional,high,,,"Web Development Services in Hyderabad","Professional web development services..."
```

**Fields Explained**:
- `keyword`: Target keyword for the blog post
- `status`: `queued` | `generating` | `published` | `failed`
- `stage`: `TOFU` | `MOFU` | `BOFU` (marketing funnel stage)
- `intent`: `informational` | `transactional` | `commercial` | `comparison`
- `priority`: `high` | `medium` | `low`

## 🕐 Cron Schedule

- **Blog Generation**: Every Monday at 6:00 AM UTC (`0 6 * * MON`)
- **Cache Revalidation**: Daily at 7:00 AM UTC (`0 7 * * *`)

## 🔒 Security

- All API endpoints are protected with `CRON_SECRET`
- Only Vercel cron jobs with the correct secret can trigger generation
- GitHub commits use secure personal access tokens

## 📊 Monitoring

### Check Generation Status

1. **Vercel Dashboard**: Functions → View cron job logs
2. **Keywords CSV**: Check status column for latest updates
3. **Generated Files**: Check `content/posts/` directory

### Manual Trigger (for testing)

```bash
curl -X POST "https://your-site.vercel.app/api/blog-bot" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 🎨 Customization

### Modify AI Prompts

Edit `lib/ai/cloudflare.ts` to customize:
- Blog title generation
- Content outline structure
- Section writing style
- Meta description format

### Update Business Context

Change the `businessContext` in `pages/api/blog-bot.ts` to match your business details.

### Adjust Cron Schedule

Modify `vercel.json` cron configuration:
- Change frequency (daily, weekly, monthly)
- Adjust time zones
- Add more cron jobs

## 💰 Cost Breakdown

### Free Tier Limits:
- **Vercel Hobby**: 2 cron jobs, sufficient for this setup
- **Cloudflare Workers AI**: 10,000 requests/day free tier
- **GitHub**: Unlimited public repositories

### Estimated Usage:
- 1 blog post/week = ~52 requests/year to Cloudflare AI
- Well within all free tier limits

## 🚀 Advanced Features

### Internal Link Building

Add a second cron job to automatically add internal links between blog posts:

```javascript
// Add to vercel.json
{
  "path": "/api/internal-linker",
  "schedule": "0 8 * * TUE"
}
```

### OG Image Generation

Automatic OG images are generated at `/api/og/[slug]` using `@vercel/og`.

### SEO Schema

All blog posts automatically include structured data for better search visibility.

## 🔧 Troubleshooting

### Common Issues:

1. **"Unauthorized" Error**: Check `CRON_SECRET` environment variable
2. **AI Generation Fails**: Verify Cloudflare credentials and account limits
3. **GitHub Commits Fail**: Check token permissions and repository access
4. **Posts Not Appearing**: Trigger manual revalidation via `/api/revalidate`

### Debug Steps:

1. Check Vercel function logs
2. Verify environment variables are set
3. Test individual components manually
4. Check Cloudflare AI usage dashboard

## 📈 Scaling Up

### For Higher Volume:
- Increase Cloudflare Workers AI limits (paid plan)
- Upgrade Vercel plan for more cron jobs
- Add content quality checks before publishing
- Implement A/B testing for different content formats

This automation system will generate high-quality, SEO-optimized blog content consistently while requiring minimal manual intervention.