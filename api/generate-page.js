import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to read and parse the about.md file
function getAboutContent() {
  try {
    const aboutPath = path.join(process.cwd(), '_pages', 'about.md');
    const content = fs.readFileSync(aboutPath, 'utf8');

    // Remove frontmatter (lines between ---)
    const lines = content.split('\n');
    let inFrontmatter = false;
    let contentLines = [];

    for (let line of lines) {
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }
      if (!inFrontmatter) {
        contentLines.push(line);
      }
    }

    return contentLines.join('\n').trim();
  } catch (error) {
    console.error('Error reading about.md:', error);
    return "Harris Song is a Computer Science student at UCLA working on AI research and computer vision.";
  }
}

export default async function handler(req, res) {
  // Set comprehensive CORS headers for all responses - GitHub Pages compatibility
  res.setHeader('Access-Control-Allow-Origin', 'https://harris-song.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the actual content from about.md
    const aboutContent = getAboutContent();

    // FORCE GPT-4 USAGE - PROFESSIONAL ACADEMIC STANDARD
    if (!process.env.OPENAI_API_KEY) {
      console.error('CRITICAL: OpenAI API key REQUIRED for professional generation');
      return res.status(500).json({
        error: 'OpenAI API key is required for professional academic portfolios',
        message: 'Configure OPENAI_API_KEY environment variable'
      });
    }

    // Create SIMPLE PROFESSIONAL prompt - NO RANDOM VARIABLES
    const prompt = `Create a clean, professional academic portfolio website.

RESEARCHER PROFILE: "${aboutContent}"

EXACT REQUIREMENTS:
1. Use ONLY white background with black/dark gray text
2. Simple CSS Grid layout with proper margins
3. Typography: system fonts only (Arial, Helvetica, sans-serif)
4. NO background colors except white
5. NO gradients, NO animations, NO fancy effects
6. Simple hover effects only (underline on links)
7. Professional spacing (margin, padding)
8. Clean typography hierarchy (h1, h2, p tags)
9. Standard web design - like Wikipedia or academic papers
10. ONLY use standard HTML tags and basic CSS

Output clean, minimal HTML that looks like a professional academic CV webpage.`;

    console.log('Generating minimal professional portfolio...');

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a minimal web designer who creates simple, clean academic websites. Your designs are extremely basic and professional - white backgrounds, black text, simple layouts like Wikipedia or academic papers. NEVER use colors except black/white/gray. NEVER use gradients, animations, or fancy effects. Create simple, readable HTML that looks like a basic academic CV or research page. Use only standard HTML tags and basic CSS."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.3,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const generatedHTML = completion.choices[0].message.content;

    // Clean up the response to ensure it's valid HTML
    let cleanHTML = generatedHTML.trim();

    // Remove markdown code blocks if present
    if (cleanHTML.startsWith('```html')) {
      cleanHTML = cleanHTML.replace(/^```html\n/, '').replace(/\n```$/, '');
    } else if (cleanHTML.startsWith('```')) {
      cleanHTML = cleanHTML.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // Extract just the body content for embedding
    const bodyMatch = cleanHTML.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : cleanHTML;

    return res.status(200).json({
      html: bodyContent,
      timestamp: new Date().toISOString(),
      source: 'gpt-4-minimal-academic',
      message: 'Simple professional design generated'
    });

  } catch (error) {
    console.error('Professional portfolio generation error:', error.message);

    return res.status(500).json({
      error: 'Professional portfolio generation failed',
      errorDetails: error.message,
      message: 'Academic-level content generation required'
    });
  }
}
