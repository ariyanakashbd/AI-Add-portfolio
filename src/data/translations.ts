export type Language = 'en' | 'bn' | 'hi';

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    skills: string;
    services: string;
    projects: string;
    experience: string;
    reviews: string;
    contact: string;
    hireMe: string;
    aiAssistant: string;
  };
  hero: {
    badge: string;
    greeting: string;
    role: string;
    intro: string;
    viewProjects: string;
    downloadResume: string;
    viewResume: string;
    contactMe: string;
    availableForWork: string;
  };
  about: {
    sectionTag: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    yearsExp: string;
    completedProjects: string;
    codeQuality: string;
    remoteWork: string;
    coreCompetencies: string;
  };
  skills: {
    sectionTag: string;
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    database: string;
    tools: string;
    noFakeBarsNotice: string;
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    requestService: string;
  };
  projects: {
    sectionTag: string;
    title: string;
    subtitle: string;
    all: string;
    ecommerce: string;
    fullstack: string;
    frontend: string;
    webapp: string;
    viewLive: string;
    viewCode: string;
    details: string;
  };
  experience: {
    sectionTag: string;
    title: string;
    subtitle: string;
    yearsHighlight: string;
    keyAchievements: string;
  };
  reviews: {
    sectionTag: string;
    title: string;
    subtitle: string;
    verifiedFeedback: string;
    previous: string;
    next: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    getInTouch: string;
    contactDesc: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationVal: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submitBtn: string;
      submitting: string;
      successMsg: string;
      errorMsg: string;
      requiredField: string;
      invalidEmail: string;
    };
  };
  ai: {
    buttonTitle: string;
    title: string;
    subtitle: string;
    onlineStatus: string;
    placeholder: string;
    send: string;
    suggestionsPrompt: string;
    clearChat: string;
    closeChat: string;
    defaultGreeting: string;
    sampleQuestions: {
      whoAreYou: string;
      whatTech: string;
      whatProjects: string;
      canIHire: string;
    };
  };
  resumeModal: {
    title: string;
    downloadBtn: string;
    closeBtn: string;
    experienceHeading: string;
    educationSkills: string;
  };
  footer: {
    rights: string;
    designedBuilt: string;
    quickLinks: string;
    backToTop: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      experience: 'Experience',
      reviews: 'Reviews',
      contact: 'Contact',
      hireMe: 'Hire Me',
      aiAssistant: 'AI Representative',
    },
    hero: {
      badge: 'Full Stack Web Developer',
      greeting: "Hi, I'm",
      role: 'Full Stack Developer',
      intro: 'I build modern, responsive, scalable and user-friendly web applications using modern frontend and backend technologies.',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
      viewResume: 'View Resume',
      contactMe: 'Contact Me',
      availableForWork: 'Available for Remote Work',
    },
    about: {
      sectionTag: 'About Me',
      title: 'Passionate about crafting fast, modern web applications.',
      subtitle: 'Based remotely and working with clients worldwide.',
      p1: 'I am Ariyan Akash, a Full Stack Developer focused on building modern, responsive, and scalable web applications. With over 3 years of hands-on experience, I bridge the gap between intuitive user experiences and resilient backend systems.',
      p2: 'My expertise covers frontend engineering with React, JavaScript, TypeScript, Next.js, and Tailwind CSS, coupled with robust server development utilizing Node.js, Express.js, REST APIs, and database architectures with MongoDB, Supabase, and Firebase.',
      yearsExp: '3+ Years Experience',
      completedProjects: '25+ Completed Works',
      codeQuality: '100% Clean Code',
      remoteWork: 'Worldwide / Remote',
      coreCompetencies: 'Core Competencies',
    },
    skills: {
      sectionTag: 'Technical Stack',
      title: 'Skills & Technologies',
      subtitle: 'Engineered with modern industry standards and proven tools.',
      frontend: 'Frontend Development',
      backend: 'Backend Engineering',
      database: 'Database & Cloud',
      tools: 'Tools & Workflow',
      noFakeBarsNotice: 'Real-world competencies developed through continuous production experience.',
    },
    services: {
      sectionTag: 'What I Offer',
      title: 'Tailored Web Services',
      subtitle: 'High-performance web solutions built to scale your digital presence.',
      requestService: 'Inquire About Service',
    },
    projects: {
      sectionTag: 'Selected Works',
      title: 'Featured Projects',
      subtitle: 'A showcase of modern web applications built for optimal performance and user experience.',
      all: 'All Projects',
      ecommerce: 'E-commerce',
      fullstack: 'Full Stack',
      frontend: 'Frontend',
      webapp: 'Web App',
      viewLive: 'Live Demo',
      viewCode: 'GitHub Repo',
      details: 'Overview',
    },
    experience: {
      sectionTag: 'Career Path',
      title: 'Professional Experience',
      subtitle: '3+ Years of Experience in Web Development across full-stack architectures.',
      yearsHighlight: '3+ Years of Continuous Web Engineering Experience',
      keyAchievements: 'Key Technical Highlights',
    },
    reviews: {
      sectionTag: 'Client Feedback',
      title: 'Reviews & Testimonials',
      subtitle: 'What clients and collaborators say about partnering with me.',
      verifiedFeedback: 'Verified Collaboration Feedback',
      previous: 'Previous',
      next: 'Next',
    },
    contact: {
      sectionTag: 'Get In Touch',
      title: "Let's Build Something Together",
      subtitle: 'Have an upcoming project, freelance inquiry, or full-time opportunity? Reach out directly.',
      getInTouch: 'Contact Details',
      contactDesc: 'Feel free to reach out via email, phone, WhatsApp, or through the contact form below. I usually respond within 24 hours.',
      emailLabel: 'Email Address',
      phoneLabel: 'Direct Phone',
      locationLabel: 'Location & Availability',
      locationVal: 'Remote / Worldwide',
      form: {
        name: 'Your Name',
        namePlaceholder: 'John Doe',
        email: 'Email Address',
        emailPlaceholder: 'john@example.com',
        subject: 'Subject',
        subjectPlaceholder: 'Project Inquiry / Job Opportunity',
        message: 'Your Message',
        messagePlaceholder: 'Describe your project requirements, timeline, or questions...',
        submitBtn: 'Send Message',
        submitting: 'Sending Message...',
        successMsg: 'Thank you! Your message has been received. I will get back to you promptly.',
        errorMsg: 'Unable to send message right now. Please email me directly at ariyanakash01303@gmail.com.',
        requiredField: 'This field is required.',
        invalidEmail: 'Please enter a valid email address.',
      },
    },
    ai: {
      buttonTitle: 'Ask Ariyan (AI)',
      title: 'Ariyan Akash',
      subtitle: 'Portfolio Representative',
      onlineStatus: 'Online & Ready to Help',
      placeholder: 'Ask me anything about my work, skills, or projects...',
      send: 'Send',
      suggestionsPrompt: 'Suggested questions:',
      clearChat: 'Reset Chat',
      closeChat: 'Close Assistant',
      defaultGreeting: "Hello! I'm Ariyan Akash. Feel free to ask me anything about my background, skills, projects, or how we can collaborate.",
      sampleQuestions: {
        whoAreYou: 'Who are you?',
        whatTech: 'What technologies do you use?',
        whatProjects: 'What projects have you built?',
        canIHire: 'Can I hire you for a project?',
      },
    },
    resumeModal: {
      title: 'Curriculum Vitae — Ariyan Akash',
      downloadBtn: 'Download Resume (PDF)',
      closeBtn: 'Close',
      experienceHeading: 'Professional Experience & Highlights',
      educationSkills: 'Technologies & Focus Areas',
    },
    footer: {
      rights: 'All rights reserved.',
      designedBuilt: 'Crafted with precision using React, Tailwind CSS, Node.js & Gemini API.',
      quickLinks: 'Quick Navigation',
      backToTop: 'Back to Top',
    },
  },

  bn: {
    nav: {
      home: 'হোম',
      about: 'পরিচিতি',
      skills: 'দক্ষতা',
      services: 'সেবাসমূহ',
      projects: 'প্রজেক্টস',
      experience: 'অভিজ্ঞতা',
      reviews: 'রিভিউ',
      contact: 'যোগাযোগ',
      hireMe: 'হায়ার করুন',
      aiAssistant: 'এআই প্রতিনিধি',
    },
    hero: {
      badge: 'ফুল স্ট্যাক ওয়েব ডেভেলপার',
      greeting: 'হ্যালো, আমি',
      role: 'ফুল স্ট্যাক ডেভেলপার',
      intro: 'আমি আধুনিক ফ্রন্টএন্ড এবং ব্যাকএন্ড প্রযুক্তির সাহায্যে আধুনিক, রেসপন্সিভ, স্কেলযোগ্য এবং ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন তৈরি করি।',
      viewProjects: 'প্রজেক্ট দেখুন',
      downloadResume: 'রিজিউমে ডাউনলোড',
      viewResume: 'রিজিউমে দেখুন',
      contactMe: 'যোগাযোগ করুন',
      availableForWork: 'রিমোট কাজের জন্য প্রস্তুত',
    },
    about: {
      sectionTag: 'আমার সম্পর্কে',
      title: 'দ্রুত এবং আধুনিক ওয়েব অ্যাপ্লিকেশন নির্মাণে নিবেদিতপ্রাণ।',
      subtitle: 'রিমোটভাবে বিশ্বব্যাপী ক্লায়েন্টদের সাথে সফলভাবে কাজ করছি।',
      p1: 'আমি আরিয়ান আকাশ, একজন ফুল স্ট্যাক ডেভেলপার। আমার প্রধান লক্ষ্য আধুনিক, রেসপন্সিভ এবং স্কেলযোগ্য ওয়েব অ্যাপ্লিকেশন তৈরি করা। ৩ বছরেরও বেশি বাস্তব অভিজ্ঞতা নিয়ে আমি নান্দনিক ইন্টারফেস ও শক্তিশালী ব্যাকএন্ড নিশ্চিত করি।',
      p2: 'আমার দক্ষতার মধ্যে রয়েছে React, JavaScript, TypeScript, Next.js, Tailwind CSS এবং শক্তিশালী সার্ভার আর্কিটেকচার যেমন Node.js, Express.js, REST APIs এবং MongoDB, Supabase ও Firebase ডাটাবেস।',
      yearsExp: '৩+ বছরের অভিজ্ঞতা',
      completedProjects: '২৫+ সফল প্রজেক্ট',
      codeQuality: '১০০% ক্লিন কোড',
      remoteWork: 'বিশ্বব্যাপী / রিমোট',
      coreCompetencies: 'মূল সক্ষমতা',
    },
    skills: {
      sectionTag: 'প্রযুক্তিগত দক্ষতা',
      title: 'স্কিলস ও টেকনোলজিস',
      subtitle: 'আধুনিক ইন্ডাস্ট্রি স্ট্যান্ডার্ড এবং নির্ভরযোগ্য টুলের সমন্বয়ে গঠিত।',
      frontend: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
      backend: 'ব্যাকএন্ড ইঞ্জিনিয়ারিং',
      database: 'ডাটাবেস ও ক্লাউড',
      tools: 'টুলস ও ওয়ার্কফ্লো',
      noFakeBarsNotice: 'বাস্তব প্রজেক্টে নিয়মিত কাজের মাধ্যমে অর্জিত প্রকৃত দক্ষতা।',
    },
    services: {
      sectionTag: 'সেবাসমূহ',
      title: 'প্রফেশনাল ওয়েব সার্ভিস',
      subtitle: 'আপনার ডিজিটাল উপস্থিতিকে গতিশীল ও সমৃদ্ধ করতে উচ্চমানের ওয়েব সমাধান।',
      requestService: 'সেবা সম্পর্কে জানতে চান',
    },
    projects: {
      sectionTag: 'নির্বাচিত কাজসমূহ',
      title: 'ফিচার্ড প্রজেক্টস',
      subtitle: 'সর্বোচ্চ পারফরম্যান্স ও চমৎকার ইউজার এক্সপেরিয়েন্স নিশ্চিত করে তৈরি প্রজেক্টসমূহ।',
      all: 'সকল প্রজেক্ট',
      ecommerce: 'ই-কমার্স',
      fullstack: 'ফুল স্ট্যাক',
      frontend: 'ফ্রন্টএন্ড',
      webapp: 'ওয়েব অ্যাপ',
      viewLive: 'লাইভ ডেমো',
      viewCode: 'গিটহাব রেপো',
      details: 'বিস্তারিত',
    },
    experience: {
      sectionTag: 'ক্যারিয়ার পথ',
      title: 'কাজের অভিজ্ঞতা',
      subtitle: 'ওয়েব ডেভেলপমেন্টে ৩+ বছরের অবিচ্ছিন্ন অভিজ্ঞতা।',
      yearsHighlight: 'ফুল স্ট্যাক ওয়েব ইঞ্জিনিয়ারিংয়ে ৩+ বছরের পেশাদার অভিজ্ঞতা',
      keyAchievements: 'মূল প্রযুক্তিগত অর্জনসমূহ',
    },
    reviews: {
      sectionTag: 'ক্লায়েন্ট মতামত',
      title: 'রিভিউ এবং প্রশংসাপত্র',
      subtitle: 'ক্লায়েন্ট এবং সহকর্মীরা আমার কাজের ব্যাপারে যা বলেন।',
      verifiedFeedback: 'যাচাইকৃত প্রশংসাপত্র',
      previous: 'পূর্ববর্তী',
      next: 'পরবর্তী',
    },
    contact: {
      sectionTag: 'যোগাযোগ',
      title: 'একসাথে নতুন কিছু তৈরি করি',
      subtitle: 'আপনার কোনো প্রজেক্ট, ফ্রিল্যান্স বা ফুল-টাইম কাজের প্রস্তাব থাকলে সরাসরি যোগাযোগ করুন।',
      getInTouch: 'যোগাযোগের তথ্য',
      contactDesc: 'ইমেইল, ফোন, হোয়াটসঅ্যাপ অথবা নিচের ফর্মের মাধ্যমে যোগাযোগ করতে পারেন। আমি সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিয়ে থাকি।',
      emailLabel: 'ইমেইল ঠিকানা',
      phoneLabel: 'সরাসরি ফোন',
      locationLabel: 'অবস্থান ও প্রাপ্যতা',
      locationVal: 'রিমোট / বিশ্বব্যাপী',
      form: {
        name: 'আপনার নাম',
        namePlaceholder: 'রহিম আহমেদ',
        email: 'ইমেইল ঠিকানা',
        emailPlaceholder: 'rahim@example.com',
        subject: 'বিষয়',
        subjectPlaceholder: 'নতুন প্রজেক্ট বা কাজের প্রস্তাব',
        message: 'আপনার বার্তা',
        messagePlaceholder: 'আপনার প্রজেক্টের চাহিদা বা প্রশ্ন বিস্তারিত লিখুন...',
        submitBtn: 'বার্তা পাঠান',
        submitting: 'পাঠানো হচ্ছে...',
        successMsg: 'ধন্যবাদ! আপনার বার্তা সফলভাবে পৌঁছেছে। আমি দ্রুতই আপনার সাথে যোগাযোগ করব।',
        errorMsg: 'বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে ariyanakash01303@gmail.com এ সরাসরি ইমেইল করুন।',
        requiredField: 'এই তথ্যটি দেওয়া আবশ্যক।',
        invalidEmail: 'অনুগ্রহ করে একটি সঠিক ইমেইল প্রদান করুন।',
      },
    },
    ai: {
      buttonTitle: 'আরিয়ানকে প্রশ্ন করুন (AI)',
      title: 'আরিয়ান আকাশ',
      subtitle: 'পোর্টফোলিও প্রতিনিধি',
      onlineStatus: 'অনলাইন এবং সহায়তার জন্য প্রস্তুত',
      placeholder: 'আমার কাজ, দক্ষতা বা প্রজেক্ট নিয়ে যেকোনো প্রশ্ন করুন...',
      send: 'পাঠান',
      suggestionsPrompt: 'প্রস্তাবিত প্রশ্ন:',
      clearChat: 'চ্যাট রিসেট',
      closeChat: 'সহকারী বন্ধ করুন',
      defaultGreeting: 'হ্যালো! আমি আরিয়ান আকাশ। আমার দক্ষতা, অভিজ্ঞতা, প্রজেক্ট বা কাজের সুযোগ নিয়ে যেকোনো প্রশ্ন করতে পারেন।',
      sampleQuestions: {
        whoAreYou: 'আপনি কে?',
        whatTech: 'আপনি কোন কোন প্রযুক্তি ব্যবহার করেন?',
        whatProjects: 'আপনি কী কী প্রজেক্ট তৈরি করেছেন?',
        canIHire: 'আমি কি আপনাকে প্রজেক্টের জন্য হায়ার করতে পারি?',
      },
    },
    resumeModal: {
      title: 'জীবনবৃত্তান্ত — আরিয়ান আকাশ',
      downloadBtn: 'রিজিউমে ডাউনলোড (PDF)',
      closeBtn: 'বন্ধ করুন',
      experienceHeading: 'পেশাগত অভিজ্ঞতা ও হাইলাইটস',
      educationSkills: 'প্রযুক্তি এবং দক্ষতার ক্ষেত্র',
    },
    footer: {
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      designedBuilt: 'React, Tailwind CSS, Node.js এবং Gemini API দিয়ে নিখুঁতভাবে নির্মিত।',
      quickLinks: 'দ্রুত লিঙ্কসমূহ',
      backToTop: 'উপরে ফিরে যান',
    },
  },

  hi: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      skills: 'कौशल',
      services: 'सेवाएं',
      projects: 'प्रोजेक्ट्स',
      experience: 'अनुभव',
      reviews: 'समीक्षाएं',
      contact: 'संपर्क',
      hireMe: 'हायर करें',
      aiAssistant: 'एआई प्रतिनिधि',
    },
    hero: {
      badge: 'फुल स्टैक वेब डेवलपर',
      greeting: 'नमस्ते, मैं हूँ',
      role: 'फुल स्टैक डेवलपर',
      intro: 'मैं आधुनिक फ्रंटएंड और बैकएंड तकनीकों का उपयोग करके आधुनिक, उत्तरदायी, स्केलेबल और उपयोगकर्ता-अनुकूल वेब एप्लिकेशन बनाता हूँ।',
      viewProjects: 'प्रोजेक्ट देखें',
      downloadResume: 'रिज्यूमे डाउनलोड करें',
      viewResume: 'रिज्यूमे देखें',
      contactMe: 'संपर्क करें',
      availableForWork: 'रिमोट कार्य के लिए उपलब्ध',
    },
    about: {
      sectionTag: 'मेरे बारे में',
      title: 'तेज़ और आधुनिक वेब एप्लिकेशन बनाने के लिए समर्पित।',
      subtitle: 'रिमोट आधार पर दुनिया भर के ग्राहकों के साथ कार्यरत।',
      p1: 'मैं अरियान आकाश हूँ, एक फुल स्टैक डेवलपर जो आधुनिक, उत्तरदायी और स्केलेबल वेब एप्लिकेशन विकसित करने पर केंद्रित है। 3 से अधिक वर्षों के व्यावहारिक अनुभव के साथ, मैं सहज उपयोगकर्ता अनुभव और मजबूत बैकएंड सिस्टम तैयार करता हूँ।',
      p2: 'मेरी विशेषज्ञता में React, JavaScript, TypeScript, Next.js, Tailwind CSS के साथ-साथ Node.js, Express.js, REST APIs, और MongoDB, Supabase एवं Firebase डेटाबेस शामिल हैं।',
      yearsExp: '3+ वर्ष का अनुभव',
      completedProjects: '25+ पूर्ण किए गए प्रोजेक्ट्स',
      codeQuality: '100% स्वच्छ कोड',
      remoteWork: 'दुनिया भर में / रिमोट',
      coreCompetencies: 'मुख्य क्षमताएं',
    },
    skills: {
      sectionTag: 'तकनीकी दक्षता',
      title: 'कौशल और तकनीकें',
      subtitle: 'आधुनिक उद्योग मानकों और प्रमाणित उपकरणों के साथ निर्मित।',
      frontend: 'फ्रंटएंड डेवलपमेंट',
      backend: 'बैकएंड इंजीनियरिंग',
      database: 'डेटाबेस और क्लाउड',
      tools: 'उपकरण और वर्कफ़्लो',
      noFakeBarsNotice: 'वास्तविक उत्पादन अनुभव और निरंतर अभ्यास के माध्यम से विकसित वास्तविक कौशल।',
    },
    services: {
      sectionTag: 'मेरी सेवाएं',
      title: 'पेशेवर वेब सेवाएं',
      subtitle: 'आपकी डिजिटल उपस्थिति को सशक्त बनाने के लिए उच्च-प्रदर्शन वेब समाधान।',
      requestService: 'सेवा के बारे में पूछताछ करें',
    },
    projects: {
      sectionTag: 'चयनित कार्य',
      title: 'प्रमुख प्रोजेक्ट्स',
      subtitle: 'उत्कृष्ट प्रदर्शन और उपयोगकर्ता अनुभव के लिए विकसित वेब एप्लिकेशन।',
      all: 'सभी प्रोजेक्ट्स',
      ecommerce: 'ई-कॉमर्स',
      fullstack: 'फुल स्टैक',
      frontend: 'फ्रंटएंड',
      webapp: 'वेब ऐप',
      viewLive: 'लाइव डेमो',
      viewCode: 'गिटहब रेपो',
      details: 'विवरण',
    },
    experience: {
      sectionTag: 'करियर यात्रा',
      title: 'व्यावसायिक अनुभव',
      subtitle: 'वेब डेवलपमेंट में 3+ वर्षों का निरंतर व्यावहारिक अनुभव।',
      yearsHighlight: 'फुल स्टैक वेब इंजीनियरिंग में 3+ वर्षों का समर्पित अनुभव',
      keyAchievements: 'मुख्य तकनीकी उपलब्धियां',
    },
    reviews: {
      sectionTag: 'क्लाइंट प्रतिक्रिया',
      title: 'समीक्षाएं और प्रशंसापत्र',
      subtitle: 'मेरे साथ काम करने वाले ग्राहकों और सहयोगियों के विचार।',
      verifiedFeedback: 'सत्यापित क्लाइंट प्रतिक्रिया',
      previous: 'पिछला',
      next: 'अगला',
    },
    contact: {
      sectionTag: 'संपर्क करें',
      title: 'आइए साथ मिलकर कुछ बेहतरीन बनाएं',
      subtitle: 'क्या आपके पास कोई नया प्रोजेक्ट, फ्रीलांस कार्य या पूर्णकालिक अवसर है? सीधे संपर्क करें।',
      getInTouch: 'संपर्क विवरण',
      contactDesc: 'आप ईमेल, फोन, व्हाट्सएप या नीचे दिए गए फॉर्म के माध्यम से संपर्क कर सकते हैं। मैं आमतौर पर 24 घंटे के भीतर उत्तर देता हूँ।',
      emailLabel: 'ईमेल पता',
      phoneLabel: 'सीधा फोन',
      locationLabel: 'स्थान और उपलब्धता',
      locationVal: 'रिमोट / दुनिया भर में',
      form: {
        name: 'आपका नाम',
        namePlaceholder: 'राहुल शर्मा',
        email: 'ईमेल पता',
        emailPlaceholder: 'rahul@example.com',
        subject: 'विषय',
        subjectPlaceholder: 'प्रोजेक्ट या नौकरी का अवसर',
        message: 'आपका संदेश',
        messagePlaceholder: 'अपनी परियोजना की आवश्यकताओं या सवालों का विवरण लिखें...',
        submitBtn: 'संदेश भेजें',
        submitting: 'भेजा जा रहा है...',
        successMsg: 'धन्यवाद! आपका संदेश प्राप्त हो गया है। मैं जल्द ही आपसे संपर्क करूँगा।',
        errorMsg: 'संदेश भेजने में समस्या आई। कृपया सीधे ariyanakash01303@gmail.com पर ईमेल करें।',
        requiredField: 'यह फ़ील्ड आवश्यक है।',
        invalidEmail: 'कृपया एक मान्य ईमेल दर्ज करें।',
      },
    },
    ai: {
      buttonTitle: 'अरियान से पूछें (AI)',
      title: 'अरियान आकाश',
      subtitle: 'पोर्टफोलियो प्रतिनिधि',
      onlineStatus: 'ऑनलाइन और सहायता के लिए तैयार',
      placeholder: 'मेरे काम, कौशल या प्रोजेक्ट्स के बारे में कुछ भी पूछें...',
      send: 'भेजें',
      suggestionsPrompt: 'सुझाए गए प्रश्न:',
      clearChat: 'चैट रीसेट करें',
      closeChat: 'असिस्टेंट बंद करें',
      defaultGreeting: 'नमस्ते! मैं अरियान आकाश हूँ। मेरे काम, प्रोजेक्ट्स, कौशल या सहयोग के बारे में बेझिझक कुछ भी पूछें।',
      sampleQuestions: {
        whoAreYou: 'आप कौन हैं?',
        whatTech: 'आप किन तकनीकों का उपयोग करते हैं?',
        whatProjects: 'आपने कौन-कौन से प्रोजेक्ट बनाए हैं?',
        canIHire: 'क्या मैं आपको प्रोजेक्ट के लिए हायर कर सकता हूँ?',
      },
    },
    resumeModal: {
      title: 'बायोडाटा / सीवी — अरियान आकाश',
      downloadBtn: 'रिज्यूमे डाउनलोड करें (PDF)',
      closeBtn: 'बंद करें',
      experienceHeading: 'व्यावसायिक अनुभव और उपलब्धियां',
      educationSkills: 'तकनीकें और मुख्य क्षेत्र',
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      designedBuilt: 'React, Tailwind CSS, Node.js और Gemini API के साथ सटीकता से निर्मित।',
      quickLinks: 'त्वरित लिंक',
      backToTop: 'शीर्ष पर जाएं',
    },
  },
};
