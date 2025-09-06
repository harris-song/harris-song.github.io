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
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({
        error: 'OpenAI API key not configured',
        html: generateFallbackHTML()
      });
    }

    // Get the actual content from about.md
    const aboutContent = getAboutContent();

    // REVOLUTIONARY design variations - completely different each time
    const architecturalStyles = [
      "deconstructivist brutalism with fragmented geometric forms and raw concrete textures",
      "parametric biomimicry with organic curves inspired by natural growth patterns",
      "postmodern maximalism with clashing patterns and deliberately chaotic compositions",
      "neo-bauhaus minimalism with perfect mathematical proportions and stark contrasts",
      "afrofuturism aesthetic with vibrant patterns and cosmic spiritual themes",
      "memphis design revival with bold colors and playful geometric shapes",
      "soviet constructivism with angular red elements and industrial typography",
      "art nouveau digitalism with flowing organic lines and nature-inspired details",
      "japanese metabolism with modular grid systems and functional beauty",
      "scandinavian hygge meets cyberpunk with cozy elements and neon accents"
    ];

    const visualTechnologies = [
      "WebGL vertex shaders creating morphing liquid metal surfaces with real-time reflections",
      "Canvas-based particle physics simulating galaxy formation with gravitational interactions",
      "CSS Houdini paint worklets generating procedural fractal patterns",
      "Three.js displacement mapping with audio-reactive terrain deformation",
      "SVG path morphing synchronized to scroll position with elastic easing",
      "WebAssembly-powered ray tracing for realistic 3D lighting effects",
      "Intersection Observer triggering complex GSAP timeline sequences",
      "WebRTC camera input creating augmented reality overlay effects",
      "Web Audio API visualizations driving geometric pattern generation",
      "Machine learning models generating real-time style transfer effects"
    ];

    const layoutArchitectures = [
      "hexagonal tessellation grid with Voronoi diagram clustering",
      "golden ratio spiral with content orbiting around fibonacci points",
      "isometric projection creating impossible M.C. Escher-like perspectives",
      "modular synthesizer patch bay with connecting cables between sections",
      "architectural blueprint with technical drawings and measurement annotations",
      "molecular structure diagram with atomic bonds connecting content nodes",
      "subway map topology with colored lines linking related portfolio sections",
      "medieval illuminated manuscript with ornate borders and capital letters",
      "circuit board PCB layout with electronic traces and component placement",
      "astronomical star chart with constellation patterns connecting projects"
    ];

    const interactionPhysics = [
      "realistic rope physics with content hanging from dynamic string simulations",
      "magnetic field visualizations with elements attracted and repelled by cursor movement",
      "fluid dynamics simulation with content floating on realistic water surfaces",
      "spring-mass-damper systems creating bouncy responsive interface elements",
      "gravity simulation with content falling and colliding with realistic physics",
      "electromagnetic field interactions causing elements to orbit around charged points",
      "elastic collision detection with portfolio items bouncing off boundaries",
      "pendulum mechanics with swinging content synchronized to scroll position",
      "crystalline growth patterns with interface elements forming geometric structures",
      "particle swarm optimization with content self-organizing into optimal layouts"
    ];

    const colorPsychology = [
      "chromesthesia synesthesia palette mapping sound frequencies to color wavelengths",
      "circadian rhythm colors shifting from dawn blues to sunset oranges throughout the day",
      "tetrachromatic vision simulation with four-dimensional color relationships",
      "bioluminescent deep-sea palette with glowing cyan and electric blue accents",
      "infrared heat signature mapping with thermal reds and cooling purples",
      "aurora borealis spectral analysis with dancing green and magenta curtains",
      "precious gemstone refractions with diamond prismatic light dispersion",
      "chemical oxidation process colors from copper patina to rust formation",
      "galactic nebula composition with cosmic dust and stellar formation hues",
      "psychedelic mushroom trip visuals with impossible color combinations"
    ];

    // Add chaos factor for true randomness
    const chaosMultiplier = Math.random() * 3 + 1;
    const uniqueTimestamp = Date.now() + Math.random() * 1000000;

    // Select completely random elements from different categories
    const selectedArchitecture = architecturalStyles[Math.floor(Math.random() * architecturalStyles.length)];
    const selectedTechnology = visualTechnologies[Math.floor(Math.random() * visualTechnologies.length)];
    const selectedLayout = layoutArchitectures[Math.floor(Math.random() * layoutArchitectures.length)];
    const selectedPhysics = interactionPhysics[Math.floor(Math.random() * interactionPhysics.length)];
    const selectedColors = colorPsychology[Math.floor(Math.random() * colorPsychology.length)];

    // Additional random modifiers for maximum chaos
    const artMovements = ["dadaist", "surrealist", "expressionist", "cubist", "futurist", "constructivist"];
    const selectedArtMovement = artMovements[Math.floor(Math.random() * artMovements.length)];

    const timeperiods = ["neolithic", "baroque", "industrial", "atomic age", "space age", "digital revolution"];
    const selectedTimePeriod = timeperiods[Math.floor(Math.random() * timeperiods.length)];

    // Create REVOLUTIONARY prompt with maximum diversity
    const prompt = `URGENT: Create a COMPLETELY UNIQUE, never-before-seen portfolio website that will blow minds! This MUST be revolutionary!

🏗️ ARCHITECTURAL FOUNDATION: ${selectedArchitecture}
⚡ VISUAL TECHNOLOGY: ${selectedTechnology}  
📐 LAYOUT ARCHITECTURE: ${selectedLayout}
🔬 INTERACTION PHYSICS: ${selectedPhysics}
🎨 COLOR PSYCHOLOGY: ${selectedColors}
🎭 ART MOVEMENT FUSION: ${selectedArtMovement}
⏰ TIME PERIOD AESTHETIC: ${selectedTimePeriod}

🚨 CHAOS FACTOR: ${chaosMultiplier.toFixed(2)}x EXPERIMENTAL
🎲 UNIQUE ID: ${uniqueTimestamp}

📝 CONTENT: "${aboutContent}"

🚀 MAKE IT ABSOLUTELY REVOLUTIONARY:
1. BREAK ALL CONVENTIONAL RULES - be completely unexpected
2. Create an ARCHITECTURAL EXPERIENCE, not just a website  
3. Use CUTTING-EDGE web tech: WebGL, Canvas, CSS Houdini
4. Implement PHYSICS-BASED interactions that feel magical
5. Create LIVING, BREATHING interfaces that feel organic
6. Use IMPOSSIBLE geometry that challenges perception
7. Design for WONDER and AWE - make users gasp
8. Push the ABSOLUTE LIMITS of browser capabilities
9. Make it feel like ART, SCIENCE, and MAGIC combined
10. Create something other developers will study

Output complete HTML with all CDN links. Make it LEGENDARY!`;

    console.log('🎨 Generating REVOLUTIONARY design with chaos factor:', chaosMultiplier);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a revolutionary digital artist who creates impossible, award-winning portfolio experiences. You push the absolute limits of web technology to create digital art that feels magical. Every creation is completely unique and challenges what people think is possible in a browser. Always output complete HTML documents with all necessary CDN links."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 16000,
      temperature: 1.2,
      presence_penalty: 0.9,
      frequency_penalty: 0.7,
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
      source: 'gpt-4-revolutionary',
      chaos: chaosMultiplier,
      architecture: selectedArchitecture.substring(0, 50),
      technology: selectedTechnology.substring(0, 50)
    });

  } catch (error) {
    console.error('Error generating page:', error.message);

    return res.status(500).json({
      error: 'Failed to generate revolutionary content',
      errorDetails: error.message,
      html: generateFallbackHTML()
    });
  }
}

function generateFallbackHTML() {
  return `
    <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif; background: linear-gradient(135deg, #ff6b6b, #4ecdc4); color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h2 style="font-size: 3rem; margin-bottom: 20px;">🚨 REVOLUTIONARY GENERATION FAILED!</h2>
        <p style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 20px;">
          The AI couldn't create your revolutionary portfolio right now.
        </p>
        <button onclick="location.reload()" style="background: rgba(255,255,255,0.2); border: 2px solid white; color: white; padding: 15px 30px; border-radius: 50px; font-size: 1rem; cursor: pointer;">
          🔄 RETRY REVOLUTION
        </button>
      </div>
    </div>
  `;
}
