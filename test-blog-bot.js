// Test script to verify blog automation works locally
const fs = require('fs');
const path = require('path');

async function testBlogBot() {
  console.log('🚀 Testing Blog Automation System...\n');

  // Check if environment variables are set
  console.log('📋 Checking environment variables:');
  const requiredEnvs = [
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_API_TOKEN', 
    'CRON_SECRET'
  ];

  let envCheck = true;
  requiredEnvs.forEach(env => {
    const value = process.env[env];
    if (value) {
      console.log(`✅ ${env}: ${env === 'CLOUDFLARE_API_TOKEN' ? '***hidden***' : value}`);
    } else {
      console.log(`❌ ${env}: Missing`);
      envCheck = false;
    }
  });

  if (!envCheck) {
    console.log('\n❌ Please set up your environment variables first!');
    return;
  }

  // Check if keywords file exists
  const keywordsPath = path.join(process.cwd(), 'content/keywords/keywords.csv');
  if (fs.existsSync(keywordsPath)) {
    console.log('✅ Keywords CSV file exists');
    const content = fs.readFileSync(keywordsPath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    console.log(`   📊 Found ${lines.length - 1} keywords in queue`);
  } else {
    console.log('❌ Keywords CSV file missing');
    return;
  }

  // Check if posts directory exists
  const postsDir = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log('✅ Created posts directory');
  } else {
    console.log('✅ Posts directory exists');
  }

  console.log('\n🎯 System Check Complete!');
  console.log('\nNext steps:');
  console.log('1. Replace the placeholder values in .env.local with your actual Cloudflare credentials');
  console.log('2. Run: npm run dev');
  console.log('3. Test the API: curl -X POST "http://localhost:3000/api/blog-bot" -H "Authorization: Bearer blog-automation-secret-key-2025"');
  console.log('4. Deploy to Vercel to activate cron jobs');
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });
testBlogBot();