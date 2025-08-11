// Import the CloudflareAI class (we'll need to run with tsx or compile)
import CloudflareAI from './lib/ai/cloudflare';
require('dotenv').config();

async function testAI() {
  console.log('🔧 Testing Cloudflare AI Integration...');
  
  // Check environment variables
  console.log('📋 Environment Check:');
  console.log('- CLOUDFLARE_ACCOUNT_ID:', process.env.CLOUDFLARE_ACCOUNT_ID ? '✅ Set' : '❌ Missing');
  console.log('- CLOUDFLARE_API_TOKEN:', process.env.CLOUDFLARE_API_TOKEN ? '✅ Set' : '❌ Missing');
  
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
    console.log('❌ Missing required environment variables');
    return;
  }
  
  try {
    const ai = new CloudflareAI({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
      apiToken: process.env.CLOUDFLARE_API_TOKEN
    });
    
    console.log('\n🎯 Testing Blog Title Generation...');
    const title = await ai.generateBlogTitle('web development hyderabad', 'MOFU', 'transactional');
    console.log('Generated Title:', title);
    
    console.log('\n📝 Testing Blog Outline Generation...');
    const outline = await ai.generateBlogOutline(title, 'web development hyderabad', 'MOFU');
    console.log('Generated Outline:', outline);
    
    if (outline && outline.length > 0) {
      console.log('\n✍️ Testing Section Content Generation...');
      const sectionContent = await ai.generateBlogSection(
        outline[0], 
        'web development hyderabad',
        'Bridge Software Solutions is a web development company in Hyderabad'
      );
      console.log('Section Content Length:', sectionContent.length);
      console.log('First 200 chars:', sectionContent.substring(0, 200) + '...');
    }
    
    console.log('\n🚀 Testing Full Blog Generation...');
    const blogContent = await ai.generateFullBlog({
      keyword: 'web development hyderabad',
      stage: 'MOFU',
      intent: 'transactional',
      businessContext: 'Bridge Software Solutions is a premium web development and digital marketing agency based in Hyderabad, specializing in helping small to medium businesses grow their online presence.'
    });
    
    console.log('\n📊 Full Blog Generation Results:');
    console.log('- Title:', blogContent.title);
    console.log('- Slug:', blogContent.slug);
    console.log('- Content Length:', blogContent.content.length);
    console.log('- Tags:', blogContent.tags);
    console.log('- Reading Time:', blogContent.readingTime);
    console.log('- First 300 chars of content:', blogContent.content.substring(0, 300) + '...');
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response text:', await error.response.text());
    }
  }
}

testAI().catch(console.error);