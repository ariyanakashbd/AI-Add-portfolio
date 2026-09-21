import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const doc = await PDFDocument.create();
  doc.setTitle('Ariyan Akash - Full Stack Web Developer Resume');
  doc.setAuthor('Ariyan Akash');
  doc.setSubject('Curriculum Vitae / Professional Resume');
  doc.setKeywords(['Ariyan Akash', 'Full Stack Developer', 'React', 'Node.js', 'Resume', 'CV']);
  doc.setProducer('Ariyan Akash Portfolio Engine');
  doc.setCreator('Ariyan Akash');
  
  // Page size: A4 (595.28 x 841.89 points)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 42;
  const contentWidth = pageWidth - marginX * 2; // ~511.28 pt

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const colorDark = rgb(0.08, 0.10, 0.14);       // #141a24 (Header & Titles)
  const colorPrimary = rgb(0.12, 0.35, 0.72);    // #1f59b8 (Brand Blue)
  const colorBody = rgb(0.20, 0.23, 0.28);       // #333b47 (Body text)
  const colorMuted = rgb(0.45, 0.49, 0.55);      // #737d8c (Subtext/Dates)
  const colorLine = rgb(0.85, 0.88, 0.92);       // #d9e0eb (Dividers)
  const colorLightBg = rgb(0.96, 0.97, 0.99);    // #f5f7fc (Box fill)
  const colorWhite = rgb(1, 1, 1);

  // -------------------------------------------------------------
  // PAGE 1
  // -------------------------------------------------------------
  const page1 = doc.addPage([pageWidth, pageHeight]);

  let y = pageHeight - 38;

  // 1. Top Decorative Accent Bar
  page1.drawRectangle({
    x: 0,
    y: pageHeight - 6,
    width: pageWidth,
    height: 6,
    color: colorPrimary,
  });

  // 2. Header Box
  // Try to load portrait
  const portraitPath = path.resolve('public/images/ariyan-akash.jpg');
  let hasImage = false;
  if (fs.existsSync(portraitPath)) {
    try {
      const imgBytes = fs.readFileSync(portraitPath);
      const img = await doc.embedJpg(imgBytes);
      
      const imgW = 72;
      const imgH = 92;
      const imgX = marginX;
      const imgY = y - imgH + 10;

      // Photo frame shadow/border
      page1.drawRectangle({
        x: imgX - 2,
        y: imgY - 2,
        width: imgW + 4,
        height: imgH + 4,
        color: colorLine,
      });
      page1.drawImage(img, {
        x: imgX,
        y: imgY,
        width: imgW,
        height: imgH,
      });
      hasImage = true;
    } catch (err) {
      console.warn('Could not embed image in PDF:', err.message);
    }
  }

  const textStartX = hasImage ? marginX + 86 : marginX;

  // Name
  page1.drawText('ARIYAN AKASH', {
    x: textStartX,
    y: y,
    size: 20,
    font: fontBold,
    color: colorDark,
  });
  y -= 16;

  // Title
  page1.drawText('Full Stack Web Developer • React & Node.js Specialist', {
    x: textStartX,
    y: y,
    size: 11,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 14;

  // Contact Info row 1
  const contactLine1 = 'Email: ariyanakash01303@gmail.com  |  Phone: +880 1303-489232 (WhatsApp)';
  page1.drawText(contactLine1, {
    x: textStartX,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorBody,
  });
  y -= 12;

  // Contact Info row 2
  const contactLine2 = 'Portfolio: https://akash31.vercel.app/  |  GitHub: github.com/ariyanakashbd';
  page1.drawText(contactLine2, {
    x: textStartX,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorBody,
  });
  y -= 12;

  // Contact Info row 3
  const contactLine3 = 'LinkedIn: linkedin.com/in/ariyan-akash-38496741  |  Location: Remote / Worldwide';
  page1.drawText(contactLine3, {
    x: textStartX,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 26;

  // Divider
  page1.drawLine({
    start: { x: marginX, y: y },
    end: { x: marginX + contentWidth, y: y },
    thickness: 1,
    color: colorLine,
  });
  y -= 16;

  // Function to draw Section Header
  function drawSectionHeader(page, title, currentY) {
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y: currentY,
      size: 10,
      font: fontBold,
      color: colorPrimary,
    });
    const titleWidth = fontBold.widthOfTextAtSize(title.toUpperCase(), 10);
    page.drawLine({
      start: { x: marginX + titleWidth + 12, y: currentY + 3 },
      end: { x: marginX + contentWidth, y: currentY + 3 },
      thickness: 0.75,
      color: colorLine,
    });
    return currentY - 14;
  }

  // 3. Professional Summary
  y = drawSectionHeader(page1, 'Professional Summary', y);
  const summaryP1 =
    'Results-driven Full Stack Developer with 3+ years of practical experience engineering modern, accessible, and scalable web applications. Adept across the complete development lifecycle from responsive React and Next.js frontends to secure Node.js RESTful APIs and optimized databases (MongoDB, Supabase, Firebase).';
  const summaryP2 =
    'Passionate about clean architecture, reusable component systems, rapid page-load performance, and delivering robust digital solutions tailored to client and business needs.';

  // Draw wrapped text
  function drawParagraph(page, text, startY, fontSize = 9, lineHeight = 12) {
    const words = text.split(' ');
    let line = '';
    let curY = startY;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? ' ' : '') + words[i];
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > contentWidth && line) {
        page.drawText(line, { x: marginX, y: curY, size: fontSize, font: fontRegular, color: colorBody });
        line = words[i];
        curY -= lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: marginX, y: curY, size: fontSize, font: fontRegular, color: colorBody });
      curY -= lineHeight;
    }
    return curY;
  }

  y = drawParagraph(page1, summaryP1, y);
  y -= 3;
  y = drawParagraph(page1, summaryP2, y);
  y -= 14;

  // 4. Technical Competencies
  y = drawSectionHeader(page1, 'Technical Competencies', y);

  const skillGroups = [
    { title: 'Frontend Technologies', items: 'React.js, JavaScript (ES6+), TypeScript, Next.js, Tailwind CSS, HTML5, CSS3, Bootstrap' },
    { title: 'Backend & APIs', items: 'Node.js, Express.js, RESTful APIs, JWT Authentication, Axios, Middleware Architecture' },
    { title: 'Databases & Storage', items: 'MongoDB, Mongoose, Firebase (Firestore & Auth), Supabase (PostgreSQL)' },
    { title: 'Tools & Ecosystem', items: 'Git, GitHub, Vite, Postman, Vercel, npm, VS Code, Figma to Pixel-Perfect Code' },
  ];

  for (const group of skillGroups) {
    page1.drawRectangle({
      x: marginX,
      y: y - 3,
      width: contentWidth,
      height: 18,
      color: colorLightBg,
    });
    page1.drawText(group.title + ':', {
      x: marginX + 6,
      y: y + 2,
      size: 8.5,
      font: fontBold,
      color: colorDark,
    });
    const labelW = fontBold.widthOfTextAtSize(group.title + ':', 8.5);
    page1.drawText(group.items, {
      x: marginX + 6 + labelW + 6,
      y: y + 2,
      size: 8.5,
      font: fontRegular,
      color: colorBody,
    });
    y -= 22;
  }
  y -= 6;

  // 5. Professional Work Experience
  y = drawSectionHeader(page1, 'Work & Development Experience', y);

  const experiences = [
    {
      role: 'Full Stack Web Developer',
      company: 'Freelance & Independent Client Engagements',
      period: '2022 – Present',
      bullets: [
        'Engineered and launched 25+ responsive full-stack applications, custom business websites, and SaaS MVP prototypes.',
        'Architected clean, decoupled RESTful APIs using Node.js & Express with JWT authentication, role verification, and error middleware.',
        'Developed dynamic frontend dashboards using React, TypeScript, and Tailwind CSS, achieving 95+ Google Lighthouse speed scores.',
        'Integrated multi-provider payments, real-time database sync with Supabase and MongoDB, and automated email workflows.',
      ],
    },
    {
      role: 'Frontend Web Developer',
      company: 'Digital Web Solutions Project',
      period: '2021 – 2022',
      bullets: [
        'Transformed intricate client design mockups and Figma frames into modular, semantic, and fully accessible React components.',
        'Optimized client-side state handling, reduced component re-renders, and integrated asynchronous Axios data retrieval.',
        'Maintained 100% cross-browser compatibility across mobile, tablet, and ultra-wide desktop monitors.',
      ],
    },
  ];

  for (const exp of experiences) {
    // Role & Period
    page1.drawText(exp.role, {
      x: marginX,
      y: y,
      size: 10,
      font: fontBold,
      color: colorDark,
    });
    const periodWidth = fontBold.widthOfTextAtSize(exp.period, 8.5);
    page1.drawText(exp.period, {
      x: marginX + contentWidth - periodWidth,
      y: y + 1,
      size: 8.5,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 12;

    // Company
    page1.drawText(exp.company, {
      x: marginX,
      y: y,
      size: 8.5,
      font: fontOblique,
      color: colorMuted,
    });
    y -= 12;

    // Bullets
    for (const bullet of exp.bullets) {
      page1.drawText('•', {
        x: marginX + 6,
        y: y,
        size: 9,
        font: fontBold,
        color: colorPrimary,
      });
      y = drawParagraph(page1, bullet, y, 8.5, 11);
      y -= 1;
    }
    y -= 6;
  }

  // Page 1 Footer
  page1.drawText('Ariyan Akash • Curriculum Vitae — Page 1 of 2', {
    x: marginX,
    y: 18,
    size: 8,
    font: fontRegular,
    color: colorMuted,
  });
  page1.drawText('akash31.vercel.app', {
    x: marginX + contentWidth - 75,
    y: 18,
    size: 8,
    font: fontRegular,
    color: colorPrimary,
  });

  // -------------------------------------------------------------
  // PAGE 2
  // -------------------------------------------------------------
  const page2 = doc.addPage([pageWidth, pageHeight]);

  let y2 = pageHeight - 38;

  // Top Accent Bar
  page2.drawRectangle({
    x: 0,
    y: pageHeight - 6,
    width: pageWidth,
    height: 6,
    color: colorPrimary,
  });

  // Page 2 Mini Header
  page2.drawText('ARIYAN AKASH', {
    x: marginX,
    y: y2,
    size: 13,
    font: fontBold,
    color: colorDark,
  });
  page2.drawText('Full Stack Web Developer  |  ariyanakash01303@gmail.com  |  +880 1303-489232', {
    x: marginX + 115,
    y: y2 + 1,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });
  y2 -= 16;

  page2.drawLine({
    start: { x: marginX, y: y2 },
    end: { x: marginX + contentWidth, y: y2 },
    thickness: 0.75,
    color: colorLine,
  });
  y2 -= 16;

  // 6. Key Selected Projects
  y2 = drawSectionHeader(page2, 'Key Web Development Projects', y2);

  const projects = [
    {
      name: 'Ecobazar — Fresh Grocery E-Commerce Platform',
      tech: 'React.js, Tailwind CSS, Node.js, Express, MongoDB, REST API',
      links: 'Live: ecobazar-rho.vercel.app  |  GitHub: github.com/ariyanakashbd/ecobazar',
      bullets: [
        'Engineered a comprehensive modern grocery shopping platform with dynamic product catalogs, category filtering, and instant search.',
        'Implemented responsive cart drawer, checkout flows, order calculation, user reviews, and responsive mobile-first UI.',
        'Designed database schemas with MongoDB & Mongoose for robust product indexing, customer orders, and category management.',
      ],
    },
    {
      name: 'Exclusive — Electronics & Lifestyle E-Commerce Store',
      tech: 'React.js, Tailwind CSS, Context API, RESTful APIs, LocalStorage Persistence',
      links: 'Live: exclusive-ecommerce.vercel.app  |  GitHub: github.com/ariyanakashbd/exclusive',
      bullets: [
        'Crafted a high-converting retail storefront featuring interactive flash deals countdown timers, wishlist management, and quick product modals.',
        'Built full cart management with subtotal calculations, coupon verification, and comprehensive responsive breakpoint testing.',
      ],
    },
    {
      name: 'DevPulse — Developer Portfolio & Analytics Dashboard',
      tech: 'TypeScript, React 19, Express, Tailwind CSS, Recharts, Gemini AI Integration',
      links: 'Live: devpulse.vercel.app  |  GitHub: github.com/ariyanakashbd/devpulse',
      bullets: [
        'Developed an interactive personal portfolio with real-time AI assistant for instant recruiter queries, project showcases, and resume preview.',
        'Integrated responsive dark/light mode toggles, multilingual support (English, Bengali, Banglish), and server-side API proxy routing.',
      ],
    },
    {
      name: 'EduSphere — Course Discovery & Student Dashboard',
      tech: 'React.js, Tailwind CSS, REST APIs, Lucide Icons, Headless UI',
      links: 'Live: edusphere.vercel.app  |  GitHub: github.com/ariyanakashbd/edusphere',
      bullets: [
        'Created an online learning portal supporting dynamic course categorization, lesson overview syllabus, and student progress tracking.',
      ],
    },
  ];

  for (const proj of projects) {
    // Project Box Header
    page2.drawText(proj.name, {
      x: marginX,
      y: y2,
      size: 9.5,
      font: fontBold,
      color: colorDark,
    });
    y2 -= 11;

    page2.drawText('Tech Stack: ' + proj.tech, {
      x: marginX,
      y: y2,
      size: 8,
      font: fontBold,
      color: colorPrimary,
    });
    y2 -= 10;

    page2.drawText(proj.links, {
      x: marginX,
      y: y2,
      size: 8,
      font: fontOblique,
      color: colorMuted,
    });
    y2 -= 10;

    for (const b of proj.bullets) {
      page2.drawText('•', {
        x: marginX + 6,
        y: y2,
        size: 8.5,
        font: fontBold,
        color: colorPrimary,
      });
      y2 = drawParagraph(page2, b, y2, 8, 10.5);
      y2 -= 1;
    }
    y2 -= 7;
  }

  y2 -= 4;

  // 7. Education & Training
  y2 = drawSectionHeader(page2, 'Education & Credentials', y2);

  const eduItems = [
    {
      degree: 'Bachelor of Science in Computer Science & Engineering (B.Sc in CSE)',
      institution: 'Higher Educational Institution',
      period: 'Graduated / Completed',
      details: 'Core Coursework: Data Structures, Algorithms, Web Engineering, Database Management Systems, Software Engineering.',
    },
    {
      degree: 'Full Stack Web Development Certification (MERN Stack)',
      institution: 'Professional Web Development Program',
      period: 'Certified',
      details: 'Comprehensive training in modern JavaScript, React ecosystem, Node.js API development, MongoDB, and production deployment.',
    },
  ];

  for (const edu of eduItems) {
    page2.drawText(edu.degree, {
      x: marginX,
      y: y2,
      size: 9,
      font: fontBold,
      color: colorDark,
    });
    const pW = fontBold.widthOfTextAtSize(edu.period, 8);
    page2.drawText(edu.period, {
      x: marginX + contentWidth - pW,
      y: y2,
      size: 8,
      font: fontBold,
      color: colorPrimary,
    });
    y2 -= 11;

    page2.drawText(edu.institution, {
      x: marginX,
      y: y2,
      size: 8,
      font: fontOblique,
      color: colorMuted,
    });
    y2 -= 9;

    y2 = drawParagraph(page2, edu.details, y2, 8, 10.5);
    y2 -= 8;
  }

  // 8. Languages & Professional Values
  y2 = drawSectionHeader(page2, 'Languages & Key Attributes', y2);

  const langText =
    'Languages: English (Fluent Professional), Bengali (Native). Key Attributes: Clean Modular Code, Agile Collaboration, Fast Learner, Detail-Oriented UI Craftsman, 100% On-Time Delivery Guarantee.';
  y2 = drawParagraph(page2, langText, y2, 8.5, 11);

  // Page 2 Footer
  page2.drawText('Ariyan Akash • Curriculum Vitae — Page 2 of 2', {
    x: marginX,
    y: 18,
    size: 8,
    font: fontRegular,
    color: colorMuted,
  });
  page2.drawText('Verified Developer Resume • 2026', {
    x: marginX + contentWidth - 145,
    y: 18,
    size: 8,
    font: fontRegular,
    color: colorMuted,
  });

  // Save to both public and dist
  const pdfBytes = await doc.save();
  const tempPath = path.resolve('/tmp/temp_resume.pdf');
  fs.writeFileSync(tempPath, pdfBytes);

  // Distill to standard PDF 1.4 for 100% universal browser and PDFium viewer compatibility
  const targetPublic = path.resolve('public/resume.pdf');
  const targetDist = path.resolve('dist/resume.pdf');

  try {
    const { execSync } = await import('child_process');
    execSync(
      `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${targetPublic}" "${tempPath}"`
    );
    console.log('Distilled public/resume.pdf to PDF 1.4 successfully');
  } catch (err) {
    console.warn('Ghostscript distillation fallback to raw bytes:', err.message);
    fs.writeFileSync(targetPublic, pdfBytes);
  }

  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    try {
      fs.copyFileSync(targetPublic, targetDist);
      console.log('Copied to dist/resume.pdf');
    } catch (e) {
      fs.writeFileSync(targetDist, pdfBytes);
    }
  }
}

generateResume().catch((err) => {
  console.error('Error generating resume PDF:', err);
  process.exit(1);
});
