# 🚀 Quick Setup Guide - Blog Automation

Follow these steps to get your automated blog generation working:

## 📋 Step 1: Get Cloudflare Credentials

### A. Sign up for Cloudflare (Free)
1. Go to [cloudflare.com](https://cloudflare.com) → **Sign Up**
2. Use your email and create a password
3. You'll be taken to the dashboard

### B. Get Your Account ID
1. On the dashboard, look at the **right sidebar**
2. You'll see **"Account ID"** with a long string like: `abc123def456...`
3. **Copy this ID** - you'll need it

### C. Create API Token
1. Click your **profile picture** (top right) → **"My Profile"**
2. Click **"API Tokens"** tab → **"Create Token"**
3. Click **"Custom token"** (not the templates)
4. Fill in:
   - **Token name**: `Blog Bot AI`
   - **Permissions**: Click **"Add more"** → Select:
     - `Account` | `Cloudflare Workers AI:Edit`
   - **Account Resources**: Select your account
   - Leave everything else as default
5. Click **"Continue to summary"** → **"Create Token"**
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

## 🔧 Step 2: Add Your Credentials

1. **Open** the file `.env.local` in your project
2. **Replace** the placeholder values:

```env
# Replace these with your actual values:
CLOUDFLARE_ACCOUNT_ID=your_account_id_from_step_B
CLOUDFLARE_API_TOKEN=your_token_from_step_C

# Keep this as is (or change to something random):
CRON_SECRET=blog-automation-secret-key-2025
```

## 🧪 Step 3: Test Locally

Run these commands:

```bash
# Install new dependencies
npm install

# Test the system
npm run test-blog-bot

# Start development server
npm run dev
```

If the test passes, try generating your first blog post:

```bash
curl -X POST "http://localhost:3000/api/blog-bot" \
  -H "Authorization: Bearer blog-automation-secret-key-2025"
```

## 🚀 Step 4: Deploy to Vercel

1. **Commit your changes** to GitHub:
```bash
git add .
git commit -m "Add blog automation system"
git push
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - **Add Environment Variables** in Vercel dashboard:
     - Go to **Settings** → **Environment Variables**
     - Add:
       - `CLOUDFLARE_ACCOUNT_ID` = your account ID
       - `CLOUDFLARE_API_TOKEN` = your API token
       - `CRON_SECRET` = blog-automation-secret-key-2025

3. **Deploy** and wait for it to go live

## ✅ Step 5: Verify It's Working

1. **Check Cron Jobs**: In Vercel dashboard → **Functions** → **Cron**
   - You should see 2 cron jobs scheduled
2. **Manual Test**: Visit `https://your-site.vercel.app/api/blog-bot` (should show "Unauthorized" - this is correct!)
3. **Wait for Monday 6 AM UTC** or manually trigger:
```bash
curl -X POST "https://your-site.vercel.app/api/blog-bot" \
  -H "Authorization: Bearer blog-automation-secret-key-2025"
```

## 📊 What Happens Next

- **Every Monday at 6 AM UTC**: A new blog post will be automatically generated
- **Content**: AI creates SEO-optimized content targeting your keywords
- **Publishing**: Posts appear at `/blogs/[slug]` and get added to your blog index
- **SEO**: Includes meta tags, structured data, and OG images

## 📈 Monitor Progress

- **Check Keywords**: Look at `content/keywords/keywords.csv` to see status updates
- **View Posts**: New posts will appear in `content/posts/` directory
- **Vercel Logs**: Functions → Cron → View logs to see what's happening

## 🔧 Troubleshooting

### "Unauthorized" Error
- Check your `CRON_SECRET` matches in both `.env.local` and Vercel

### "Cloudflare API Error"
- Verify your Account ID and API Token are correct
- Make sure the API token has `Cloudflare Workers AI:Edit` permission

### No Posts Generated
- Check Vercel function logs for errors
- Verify your keywords CSV has items with status "queued"
- Make sure cron jobs are enabled in Vercel

---

## 🎉 You're All Set!

Your blog automation system is now ready. Every Monday, you'll get a fresh, SEO-optimized blog post automatically generated and published to your website. The system will work through your keyword queue, creating valuable content that drives traffic to your business!

**Current Keywords Ready to Generate:**
- Web development Hyderabad
- SEO services Hyderabad  
- Digital marketing Hyderabad
- Website design cost Hyderabad
- Mobile app development Hyderabad
- E-commerce website development
- Local business SEO Hyderabad
- And more...

Each post will be professionally written, mobile-optimized, and include strong calls-to-action leading potential clients to your contact page.