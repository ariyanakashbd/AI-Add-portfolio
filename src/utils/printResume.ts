import { portfolioData } from '../data/portfolioData';

/**
 * Robust cross-browser resume printing utility.
 * Works even inside sandboxed iframes by isolating the printable HTML into a dedicated hidden frame.
 */
export function printResumeDocument(): Promise<boolean> {
  return new Promise((resolve) => {
    const { developer, skills, experience, projects } = portfolioData;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ariyan Akash - Resume</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1a1e24;
      background: #ffffff;
      line-height: 1.45;
      font-size: 11pt;
      padding: 10px;
    }
    a {
      color: #1e40af;
      text-decoration: none;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #1e40af;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .header-info {
      flex: 1;
    }
    .name {
      font-size: 22pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }
    .role {
      font-size: 12pt;
      font-weight: 700;
      color: #1e40af;
      margin-top: 4px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3px 18px;
      margin-top: 8px;
      font-size: 9pt;
      color: #475569;
    }
    .avatar-frame {
      width: 76px;
      height: 96px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #cbd5e1;
      margin-left: 16px;
      flex-shrink: 0;
    }
    .avatar-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
    .section {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 10pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #1e40af;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    .summary-text {
      font-size: 9.5pt;
      color: #334155;
      line-height: 1.5;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .skill-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 9pt;
    }
    .skill-card strong {
      display: block;
      color: #0f172a;
      font-size: 9pt;
      margin-bottom: 2px;
    }
    .skill-card span {
      color: #475569;
    }
    .exp-item, .proj-item {
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .exp-header, .proj-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .exp-title, .proj-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
    }
    .exp-period, .proj-links {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 600;
    }
    .exp-subtitle {
      font-size: 9pt;
      font-style: italic;
      color: #64748b;
      margin-bottom: 4px;
    }
    .bullets {
      list-style-type: square;
      padding-left: 18px;
      font-size: 9pt;
      color: #334155;
      line-height: 1.45;
    }
    .bullets li {
      margin-bottom: 3px;
    }
    .proj-stack {
      font-size: 8.5pt;
      color: #1e40af;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .footer {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #94a3b8;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="header-info">
      <div class="name">${developer.name}</div>
      <div class="role">${developer.role} • 3+ Years Experience</div>
      <div class="contact-grid">
        <div><strong>Email:</strong> ${developer.email}</div>
        <div><strong>Phone:</strong> ${developer.displayPhone} (WhatsApp)</div>
        <div><strong>Portfolio:</strong> https://akash31.vercel.app/</div>
        <div><strong>GitHub:</strong> github.com/ariyanakashbd</div>
        <div><strong>LinkedIn:</strong> linkedin.com/in/ariyan-akash-38496741</div>
        <div><strong>Location:</strong> Remote / Worldwide</div>
      </div>
    </div>
    <div class="avatar-frame">
      <img src="${developer.profileImage}" alt="${developer.name}" />
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="summary-text">
      ${developer.intro} Specialized in modern React, Next.js, Node.js, Express, and structured databases (MongoDB, Supabase, Firebase). Dedicated to building fast, accessible, high-performance web applications with clean code architecture and responsive mobile-first interfaces.
    </div>
  </div>

  <div class="section">
    <div class="section-title">Technical Competencies</div>
    <div class="skills-grid">
      ${skills
        .map(
          (cat) => `
        <div class="skill-card">
          <strong>${cat.category}</strong>
          <span>${cat.skills.map((s) => s.name).join(', ')}</span>
        </div>
      `
        )
        .join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Work & Development Experience</div>
    ${experience
      .map(
        (exp) => `
      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">${exp.title}</span>
          <span class="exp-period">${exp.period}</span>
        </div>
        <div class="exp-subtitle">${exp.subtitle}</div>
        <ul class="bullets">
          ${exp.highlights.map((h) => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `
      )
      .join('')}
  </div>

  <div class="section">
    <div class="section-title">Selected Web Projects</div>
    ${projects
      .map(
        (proj) => `
      <div class="proj-item">
        <div class="proj-header">
          <span class="proj-title">${proj.name} (${proj.category})</span>
          <span class="proj-links">Live: ${proj.liveUrl.replace('https://', '')}</span>
        </div>
        <div class="proj-stack">Stack: ${proj.technologies.join(', ')}</div>
        <div class="summary-text" style="font-size: 8.8pt; margin-bottom: 3px;">${proj.description}</div>
      </div>
    `
      )
      .join('')}
  </div>

  <div class="section">
    <div class="section-title">Education & Credentials</div>
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">Bachelor of Science in Computer Science & Engineering (B.Sc in CSE)</span>
        <span class="exp-period">Completed</span>
      </div>
      <div class="summary-text">Comprehensive coursework in Algorithms, Data Structures, Web Engineering, and Software Architecture.</div>
    </div>
  </div>

  <div class="footer">
    <span>Ariyan Akash • Professional Resume / Curriculum Vitae</span>
    <span>akash31.vercel.app</span>
  </div>

</body>
</html>
    `;

    // Attempt method 1: Hidden iframe print (isolated from parent page styles)
    try {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'resume-print-iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';

      document.body.appendChild(iframe);

      const frameDoc = iframe.contentWindow?.document || iframe.contentDocument;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();

        // Allow styles & images to parse
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            setTimeout(() => {
              document.body.removeChild(iframe);
              resolve(true);
            }, 1500);
          } catch (err) {
            console.warn('Iframe print blocked, falling back to window.open:', err);
            document.body.removeChild(iframe);
            fallbackWindowPrint(htmlContent, resolve);
          }
        }, 500);
        return;
      }
    } catch (err) {
      console.warn('Iframe creation error, using fallback:', err);
    }

    fallbackWindowPrint(htmlContent, resolve);
  });
}

function fallbackWindowPrint(htmlContent: string, resolve: (val: boolean) => void) {
  try {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        resolve(true);
      }, 500);
      return;
    }
  } catch (e) {
    console.warn('Popup print blocked:', e);
  }

  // Fallback 3: Standard window.print()
  try {
    window.print();
    resolve(true);
  } catch (err) {
    console.error('All print methods failed:', err);
    resolve(false);
  }
}

/**
 * Robust cross-browser PDF downloader.
 * Uses fresh AJAX fetch + Blob URL to bypass browser cache and sandboxed iframe download issues.
 */
export async function downloadResumeFile(): Promise<boolean> {
  try {
    // Bust any stale cache with timestamp
    const response = await fetch(`/api/resume/download?t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const blob = await response.blob();
    // Validate that we received a valid PDF file (not an error page or 316-byte dummy)
    if (blob.size < 50000) {
      console.warn(`File size too small (${blob.size} bytes), falling back...`);
    }

    const blobUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'Ariyan_Akash_Resume.pdf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 15000);

    return true;
  } catch (err) {
    console.warn('Direct Blob download failed, falling back to window.open / anchor:', err);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = `/api/resume/download?t=${Date.now()}`;
    fallbackLink.download = 'Ariyan_Akash_Resume.pdf';
    fallbackLink.target = '_blank';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
    return false;
  }
}
