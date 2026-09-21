import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for contact submissions with adapter schema ready for MongoDB / Supabase
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'archived';
}

const contactMessages: ContactMessage[] = [];

// Gemini Client Lazy Initializer
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// System Knowledge Base for Ariyan Akash with Multilingual Capabilities
const ARIYAN_KNOWLEDGE = `
YOU ARE ARIYAN AKASH (আরিয়ান আকাশ).
You are Ariyan Akash's official portfolio representative, speaking directly in the first person as Ariyan.

CRITICAL IDENTITY RULES:
- ALWAYS speak as Ariyan Akash ("I", "me", "my" / "আমি", "আমাকে", "আমার").
- NEVER say "I am an AI agent" or "I am an AI assistant".
- If asked "Who are you?" or "তুমি কে?" or "tumi ke?", answer:
  - In English: "I’m Ariyan Akash, a Full Stack Developer focused on building modern, responsive and scalable web applications with 3+ years of experience."
  - In Bengali: "আমি আরিয়ান আকাশ, একজন ফুল স্ট্যাক ডেভেলপার। আমি React, Node.js এবং আধুনিক ওয়েব টেকনোলজি দিয়ে রেসপনসিভ ও স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরিতে ৩ বছরেরও বেশি সময় ধরে কাজ করছি।"
  - In Banglish: "Ami Ariyan Akash, ekjon Full Stack Developer. React, Node.js, Express ebong modern databases diye responsive o scalable web application banate 3+ bochorer beshi oviggota ache."

LANGUAGE DETECTION & MIRRORING (HIGHEST PRIORITY):
- Detect the visitor's language and respond naturally in that exact language:
  1. BENGALI SCRIPT (বাংলা):
     If the visitor writes in Bengali script (e.g. "তুমি কে?", "কেমন আছো?", "কি কি কাজ পারো?", "যোগাযোগ করব কিভাবে?", "তোমার ফোন নাম্বার কত?"), ALWAYS reply in fluent, polite, welcoming Bengali (বাংলা ভাষায় উত্তর দিন).
  2. BANGLISH (Romanized Bengali):
     If the visitor writes in Banglish (e.g. "kemon acho?", "tumi ke?", "ki ki kaj koro?", "tumar phone number dao", "kivabe contact korbo?", "hire korte chai", "portfolio te ki ache?"), understand their intent completely and reply in natural, friendly, polite Bengali (বাংলা ভাষায়) or clean, clear Banglish/English as most helpful and conversational.
  3. ENGLISH:
     If the visitor writes in English, reply in articulate, professional, developer-focused English.
  4. HINDI:
     If the visitor writes in Hindi, reply in polite, fluent Hindi.
- Keep responses concise, clear, and professional.

FACTUAL PORTFOLIO FACTS (NEVER INVENT DETAILS OUTSIDE THIS):
- Full Name: Ariyan Akash (আরিয়ান আকাশ)
- Professional Role: Full Stack Developer
- Experience: 3+ Years of Experience in Web Development
- Location & Work Mode: Remote / Worldwide (Available for freelance, contract, and full-time remote roles)
- Email: ariyanakash01303@gmail.com
- Phone / WhatsApp: 01303489232 (+880 1303-489232)
- Portfolio Website: https://akash31.vercel.app/
- GitHub: https://github.com/ariyanakashbd
- LinkedIn: https://www.linkedin.com/in/ariyan-akash-38496741
- Facebook: https://www.facebook.com/profile.php?id=61560219338721
- Instagram: https://www.instagram.com/ariyanakash01303

CORE SKILLS & TECHNOLOGIES:
- Frontend: HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Next.js, Tailwind CSS, Bootstrap, Responsive Design
- Backend: Node.js, Express.js, REST API Development, JWT Authentication, API Integrations (Axios, third-party)
- Database: MongoDB (Mongoose), Supabase (PostgreSQL), Firebase (Firestore)
- Tools: Git, GitHub, VS Code, Postman, npm

8 CORE SERVICES OFFERED:
1. Business Websites (ব্যবসায়িক ওয়েবসাইট)
2. E-commerce Websites (ই-কমার্স ওয়েবসাইট)
3. School & College Websites (শিক্ষা প্রতিষ্ঠান ওয়েবসাইট ও পোর্টাল)
4. Portfolio Websites (ব্যক্তিগত পোর্টফোলিও)
5. Dashboard Applications (ড্যাশবোর্ড অ্যাপ্লিকেশন ও অ্যানালিটিক্স)
6. High-Converting Landing Pages (ল্যান্ডিং পেজ)
7. Custom Web Applications (কাস্টম ওয়েব সফটওয়্যার)
8. REST API Development (নিরাপদ ব্যাকএন্ড এপিআই)

FEATURED PROJECTS:
1. Ecobazar: Modern e-commerce web app built with React, Tailwind CSS, and Swiper.
2. Exclusive: High-conversion e-commerce platform with responsive shopping interface.
3. DevPulse Dashboard: Full-stack developer metrics and server health monitoring dashboard (React, TS, Node.js, Express).
4. EduSphere Academic Portal: Institutional school and college management web platform with notice management and admissions.
`;

// Robust Trilingual Fallback Responder (Bengali, Banglish & English)
function generateSmartFallbackReply(userMessage: string): string {
  const text = (userMessage || '').trim();
  const lower = text.toLowerCase();

  const isBengali = /[\u0980-\u09FF]/.test(text);
  const isBanglish = /\b(tumi|apni|tumar|apnar|amar|kemon|acho|achen|aso|asen|valo|bhalo|koro|koren|kaj|khobor|vai|bhai|ki|kivabe|jogajog|thako|porichoy|dorkar|paron|paro|lagbe|hobe|chai|korte|koto|taka|khoroch|shob|sob|number|nam|phone|email|daow|dao|den)\b/i.test(lower);

  // 1. GREETINGS & STATUS
  if (
    lower.includes('kemon') ||
    lower.includes('ki khobor') ||
    lower.includes('valo acho') ||
    lower.includes('bhalo acho') ||
    text.includes('কেমন আছেন') ||
    text.includes('কেমন আছো') ||
    text.includes('কি খবর') ||
    text.includes('ভালো আছেন')
  ) {
    if (isBengali || isBanglish) {
      return "আলহামদুলিল্লাহ, আমি ভালো আছি! আপনি কেমন আছেন? আমি আরিয়ান আকাশ, ফুল স্ট্যাক ডেভেলপার। আমার প্রজেক্ট, কাজের অভিজ্ঞতা বা কোনো নতুন ওয়েব ডেভেলপমেন্ট বিষয়ে জানতে চাইলে নির্দ্বিধায় জিজ্ঞাসা করতে পারেন।";
    }
    return "I’m doing great, thank you! I’m Ariyan Akash, a Full Stack Developer. How can I help you today? Feel free to ask about my projects, technical skills, or discuss any web development work.";
  }

  if (
    lower.includes('hello') ||
    lower.includes('hi') ||
    lower.includes('hey') ||
    lower.includes('salam') ||
    lower.includes('assalamu') ||
    text.includes('সালাম') ||
    text.includes('হ্যালো') ||
    text.includes('হাই') ||
    text.includes('নমস্কার')
  ) {
    if (isBengali || isBanglish) {
      return "হ্যালো! ওয়ালাইকুম আসসালাম। আমি আরিয়ান আকাশ, ফুল স্ট্যাক ডেভেলপার। আমার পোর্টফোলিওতে আপনাকে স্বাগতম। আমার কাজ, স্কিল বা প্রজেক্ট নিয়ে যেকোনো প্রশ্ন করতে পারেন!";
    }
    return "Hello! I’m Ariyan Akash, Full Stack Developer. Welcome to my portfolio! Feel free to ask me anything about my experience, skills, projects, or how we can collaborate.";
  }

  // 2. WHO ARE YOU / IDENTITY
  if (
    lower.includes('who are you') ||
    lower.includes('who is ariyan') ||
    lower.includes('introduce') ||
    lower.includes('tumi ke') ||
    lower.includes('apni ke') ||
    lower.includes('tumar porichoy') ||
    lower.includes('apnar porichoy') ||
    text.includes('আপনি কে') ||
    text.includes('তুমি কে') ||
    text.includes('কে আপনি') ||
    text.includes('পরিচয়')
  ) {
    if (isBengali || isBanglish) {
      return "আমি আরিয়ান আকাশ, একজন ফুল স্ট্যাক ডেভেলপার (Full Stack Developer)। আমি আধুনিক, রেসপনসিভ এবং স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরির কাজে ৩ বছরেরও বেশি সময় ধরে অভিজ্ঞ। ফ্রন্টএন্ডে React.js ও Tailwind CSS এবং ব্যাকএন্ডে Node.js, Express.js ও MongoDB নিয়ে কাজ করি।";
    }
    return "I’m Ariyan Akash, a Full Stack Developer focused on building modern, responsive and scalable web applications. I have over 3 years of hands-on experience developing full-stack web applications with React, Node.js, Express, and modern databases.";
  }

  // 3. SKILLS & TECHNOLOGIES
  if (
    lower.includes('skill') ||
    lower.includes('technolog') ||
    lower.includes('stack') ||
    lower.includes('react') ||
    lower.includes('node') ||
    lower.includes('dokhota') ||
    lower.includes('ki ki jano') ||
    lower.includes('ki jano') ||
    text.includes('দক্ষতা') ||
    text.includes('প্রযুক্তি') ||
    text.includes('স্কিল') ||
    text.includes('কি কি পারেন') ||
    text.includes('কি পারেন')
  ) {
    if (isBengali || isBanglish) {
      return "আমার প্রধান টেক স্ট্যাক ও প্রযুক্তি দক্ষতা:\n• ফ্রন্টএন্ড: React.js, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3, Bootstrap\n• ব্যাকএন্ড: Node.js, Express.js, REST API Development, JWT Authentication\n• ডেটাবেজ: MongoDB, Supabase, Firebase\n• টুলস: Git, GitHub, VS Code, Postman, npm";
    }
    return "My core technical stack includes:\n• Frontend: React.js, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3\n• Backend: Node.js, Express.js, REST API development, JWT auth\n• Database: MongoDB, Supabase, Firebase\n• Tools: Git, GitHub, VS Code, Postman, npm";
  }

  // 4. SERVICES & WHAT CAN YOU BUILD
  if (
    lower.includes('service') ||
    lower.includes('offer') ||
    lower.includes('what do you do') ||
    lower.includes('ki ki kaj') ||
    lower.includes('ki kaj koro') ||
    lower.includes('ki koren') ||
    lower.includes('website banate') ||
    text.includes('কী কী কাজ') ||
    text.includes('কি কাজ করেন') ||
    text.includes('সার্ভিস') ||
    text.includes('সেবা') ||
    text.includes('ওয়েবসাইট তৈরি')
  ) {
    if (isBengali || isBanglish) {
      return "আমি প্রধানত ৮ ধরনের ওয়েব ডেভেলপমেন্ট সার্ভিস প্রদান করি:\n১. বিজনেস ওয়েবসাইট\n২. ই-কমার্স ওয়েবসাইট (কার্ট, চেকআউট ও পেমেন্ট)\n৩. স্কুল ও কলেজ ওয়েবসাইট/অ্যাকাডেমিক পোর্টাল\n৪. ব্যক্তিগত পোর্টফোলিও ওয়েবসাইট\n৫. ড্যাশবোর্ড ও অ্যানালিটিক্স অ্যাপ্লিকেশন\n৬. হাই-কনভার্টিং ল্যান্ডিং পেজ\n৭. কাস্টম ফুল স্ট্যাক ওয়েব অ্যাপ্লিকেশন\n৮. Node.js ও Express দিয়ে সুরক্ষিত REST API ডেভেলপমেন্ট";
    }
    return "I provide 8 core services:\n1. Business Websites\n2. E-commerce Websites\n3. School & College Portals\n4. Portfolio Websites\n5. Dashboard Applications\n6. High-converting Landing Pages\n7. Custom Full Stack Web Applications\n8. Robust REST API Development";
  }

  // 5. PROJECTS
  if (
    lower.includes('project') ||
    lower.includes('ecobazar') ||
    lower.includes('exclusive') ||
    lower.includes('devpulse') ||
    lower.includes('edusphere') ||
    lower.includes('kaj dekhaw') ||
    text.includes('প্রজেক্ট') ||
    text.includes('প্রকল্প') ||
    text.includes('কাজের নমুনা')
  ) {
    if (isBengali || isBanglish) {
      return "আমার কিছু উল্লেখযোগ্য প্রজেক্ট:\n১. Ecobazar: আধুনিক ই-কমার্স ওয়েব অ্যাপ্লিকেশন (React, Tailwind CSS, Swiper)\n২. Exclusive: দ্রুত ও রেসপনসিভ ই-কমার্স প্ল্যাটফর্ম\n৩. DevPulse Dashboard: ডেভেলপার মেট্রিক্স ও রিয়েল-টাইম হেলথ মনিটরিং ড্যাশবোর্ড\n৪. EduSphere Academic Portal: স্কুল ও কলেজ অ্যাডমিশন ও নোটিশ ম্যানেজমেন্ট প্ল্যাটফর্ম\n\nআমার লাইভ পোর্টফোলিও দেখতে পারেন: https://akash31.vercel.app/ এবং কোড দেখুন: https://github.com/ariyanakashbd";
    }
    return "Some of my featured projects include:\n1. Ecobazar: Modern e-commerce web application built with React, Tailwind CSS, and Swiper\n2. Exclusive: High-conversion e-commerce platform with responsive shopping UX\n3. DevPulse Dashboard: Full-stack developer monitoring dashboard\n4. EduSphere Academic Portal: Institutional school and college management portal\n\nYou can also explore my live portfolio at https://akash31.vercel.app/ and GitHub at https://github.com/ariyanakashbd.";
  }

  // 6. CONTACT, PHONE, EMAIL & HIRE
  if (
    lower.includes('contact') ||
    lower.includes('phone') ||
    lower.includes('number') ||
    lower.includes('email') ||
    lower.includes('mail') ||
    lower.includes('whatsapp') ||
    lower.includes('hire') ||
    lower.includes('jogajog') ||
    lower.includes('thikana') ||
    lower.includes('kivabe jogajog') ||
    text.includes('যোগাযোগ') ||
    text.includes('ফোন') ||
    text.includes('নাম্বার') ||
    text.includes('ইমেইল') ||
    text.includes('হায়ার') ||
    text.includes('হায়ার') ||
    text.includes('নম্বর')
  ) {
    if (isBengali || isBanglish) {
      return "আমার সাথে সরাসরি যোগাযোগের মাধ্যম:\n• ইমেইল: ariyanakash01303@gmail.com\n• ফোন / হোয়াটসঅ্যাপ: 01303489232 (+880 1303-489232)\n• গিটহাব: https://github.com/ariyanakashbd\n• লিঙ্কডইন: https://www.linkedin.com/in/ariyan-akash-38496741\n• লাইভ পোর্টফোলিও: https://akash31.vercel.app/\n\nআপনার যেকোনো নতুন প্রজেক্টের জন্য আপনি এই পেজের Contact ফর্ম থেকেও সরাসরি মেসেজ পাঠাতে পারেন!";
    }
    return "You can reach me directly via:\n• Email: ariyanakash01303@gmail.com\n• Phone / WhatsApp: 01303489232 (+880 1303-489232)\n• GitHub: https://github.com/ariyanakashbd\n• LinkedIn: https://www.linkedin.com/in/ariyan-akash-38496741\n• Portfolio: https://akash31.vercel.app/\n\nYou can also submit an inquiry through the Contact section on this page.";
  }

  // 7. EXPERIENCE & WORK LOCATION
  if (
    lower.includes('experience') ||
    lower.includes('oviggota') ||
    lower.includes('years') ||
    lower.includes('remote') ||
    lower.includes('location') ||
    lower.includes('kothay thako') ||
    text.includes('অভিজ্ঞতা') ||
    text.includes('কোথায় থাকেন') ||
    text.includes('রিমোট')
  ) {
    if (isBengali || isBanglish) {
      return "আমার ওয়েব ডেভেলপমেন্টে ৩ বছরেরও বেশি সময় ধরে প্রফেশনাল অভিজ্ঞতা রয়েছে। আমি বিশ্বব্যাপী যেকোনো ক্লায়েন্টের সাথে রিমোটলি কাজ করি। ফ্রিল্যান্স, চুক্তিভিত্তিক বা ফুল-টাইম রিমোট পজিশনে আমি সক্রিয়ভাবে কাজ করতে প্রস্তুত।";
    }
    return "I have 3+ years of experience in web development, specializing in React frontends, Node.js/Express backends, and full-stack architectures. I work remotely with clients worldwide on freelance, contract, and full-time remote roles.";
  }

  // DEFAULT MATCH BASED ON DETECTED LANGUAGE
  if (isBengali || isBanglish) {
    return "আমি আরিয়ান আকাশ, ৩+ বছরের অভিজ্ঞতাসম্পন্ন ফুল স্ট্যাক ডেভেলপার। আমি React, Node.js এবং আধুনিক ওয়েব প্রযুক্তি দিয়ে ওয়েবসাইট ও ওয়েব অ্যাপ্লিকেশন তৈরি করি। আমার স্কিল, প্রজেক্ট, সার্ভিস অথবা কোনো নতুন কাজের ব্যাপারে কিছু জানতে চাইলে আমাকে জানাতে পারেন, অথবা সরাসরি ইমেইল করতে পারেন: ariyanakash01303@gmail.com বা ফোনে: 01303489232।";
  }

  return "I’m Ariyan Akash, a Full Stack Developer with 3+ years of experience in React, Node.js, and modern web engineering. If you need details about my skills, projects, services, or would like to discuss a project, feel free to ask or contact me directly at ariyanakash01303@gmail.com.";
}

// Candidate Gemini models in priority order
const CANDIDATE_GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
];

// Helper to call Gemini with timeout and cascading model fallbacks
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  fullPrompt: string
): Promise<string | null> {
  for (const modelName of CANDIDATE_GEMINI_MODELS) {
    try {
      // 7-second timeout race per model
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout on model ${modelName}`)), 7000)
      );

      const requestPromise = ai.models.generateContent({
        model: modelName,
        contents: fullPrompt,
        config: {
          systemInstruction: ARIYAN_KNOWLEDGE,
          temperature: 0.4,
        },
      });

      const response: any = await Promise.race([requestPromise, timeoutPromise]);
      const reply = response?.text?.trim();
      if (reply && reply.length > 0) {
        return reply;
      }
    } catch (modelErr: any) {
      console.warn(
        `[Gemini AI] Model ${modelName} error:`,
        modelErr?.status || modelErr?.message?.slice(0, 100) || modelErr
      );
      // Continue to next candidate model
    }
  }
  return null;
}

// ==================== API ENDPOINTS ====================

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    developer: 'Ariyan Akash',
    role: 'Full Stack Developer',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// AI Chat Representative Route
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const trimmed = message.trim();
    const ai = getGeminiClient();

    if (ai) {
      try {
        // Build recent conversation history context
        const formattedHistory = Array.isArray(history)
          ? history
              .slice(-6)
              .map(
                (h: { role: string; content: string }) =>
                  `${h.role === 'user' ? 'Visitor' : 'Ariyan Akash'}: ${h.content}`
              )
              .join('\n')
          : '';

        const fullPrompt = `${ARIYAN_KNOWLEDGE}\n\nRecent conversation:\n${formattedHistory}\n\nVisitor: "${trimmed}"\nAriyan Akash (Reply in the visitor's language - Bengali, Banglish, or English):`;

        const replyFromGemini = await callGeminiWithFallback(ai, fullPrompt);

        if (replyFromGemini) {
          res.json({ reply: replyFromGemini });
          return;
        }

        // If all Gemini models were unavailable or timed out, use our smart trilingual fallback
        console.warn('[Gemini AI] Cascading models finished, using smart trilingual fallback.');
        const fallbackReply = generateSmartFallbackReply(trimmed);
        res.json({ reply: fallbackReply });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using smart trilingual fallback:', geminiError?.message || geminiError);
        const fallbackReply = generateSmartFallbackReply(trimmed);
        res.json({ reply: fallbackReply });
        return;
      }
    } else {
      // Fallback mode when GEMINI_API_KEY is not configured
      const fallbackReply = generateSmartFallbackReply(trimmed);
      res.json({ reply: fallbackReply });
      return;
    }
  } catch (err: any) {
    console.error('AI chat endpoint error:', err);
    res.status(500).json({
      error: 'An internal error occurred while processing your inquiry.',
      reply: generateSmartFallbackReply(req.body?.message || ''),
    });
  }
});

// Contact Form Endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Name is required.' });
      return;
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'A valid email address is required.' });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Message is required.' });
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Project Inquiry').toString().trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    contactMessages.unshift(newMessage);
    console.log(`[Contact Form Received] From: ${newMessage.name} <${newMessage.email}> | Subject: ${newMessage.subject}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been safely received. Ariyan will get back to you shortly.',
      id: newMessage.id,
    });
  } catch (err: any) {
    console.error('Contact submit error:', err);
    res.status(500).json({ success: false, error: 'Server error processing your message.' });
  }
});

// Resume endpoints (Download & Preview)
app.get('/resume.pdf', (_req: Request, res: Response) => {
  const publicPath = path.resolve('public/resume.pdf');
  const distPath = path.resolve('dist/resume.pdf');
  const targetPath = fs.existsSync(publicPath) ? publicPath : distPath;

  if (fs.existsSync(targetPath)) {
    const stat = fs.statSync(targetPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', 'inline; filename="Ariyan_Akash_Resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.sendFile(targetPath);
  }
  res.status(404).send('Resume document not found.');
});

app.get('/api/resume/download', (_req: Request, res: Response) => {
  const publicPath = path.resolve('public/resume.pdf');
  const distPath = path.resolve('dist/resume.pdf');
  const targetPath = fs.existsSync(publicPath) ? publicPath : distPath;

  if (fs.existsSync(targetPath)) {
    const stat = fs.statSync(targetPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', 'attachment; filename="Ariyan_Akash_Resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.sendFile(targetPath);
  }
  res.status(404).json({ error: 'Resume file not found on server.' });
});

// Resume metadata endpoint
app.get('/api/resume', (_req: Request, res: Response) => {
  res.json({
    available: true,
    name: 'Ariyan Akash - Full Stack Developer Resume',
    downloadUrl: '/api/resume/download',
    previewUrl: '/resume.pdf',
    pages: 2,
    lastUpdated: '2026',
  });
});

// Vite middleware & static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
