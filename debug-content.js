const CloudflareAI = require('./lib/ai/cloudflare.ts').default;

async function debugContentGeneration() {
  const ai = new CloudflareAI({
    accountId: 'd917f01fd7ca67a3a50fdd65f22663c4',
    apiToken: 'EqEB_Yg6dz48IR1wELAeH0cgiOpfBCE-cj7tnIFc'
  });

  try {
    console.log('🧪 Testing content generation...');
    
    // Test title generation
    console.log('\n1. Testing title generation...');
    const title = await ai.generateBlogTitle('website design cost hyderabad', 'BOFU', 'commercial');
    console.log('✅ Title:', title);
    
    // Test outline generation
    console.log('\n2. Testing outline generation...');
    const outline = await ai.generateBlogOutline(title, 'website design cost hyderabad', 'BOFU');
    console.log('✅ Outline length:', outline.length);
    console.log('✅ Outline items:', outline);
    
    // Test section generation
    if (outline.length > 0) {
      console.log('\n3. Testing section generation...');
      const sectionContent = await ai.generateBlogSection(
        outline[0], 
        'website design cost hyderabad', 
        'Bridge Software Solutions context'
      );
      console.log('✅ Section content length:', sectionContent.length);
      console.log('✅ Section preview:', sectionContent.substring(0, 200) + '...');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugContentGeneration();