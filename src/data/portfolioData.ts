export interface Project {
  id: string;
  name: string;
  category: 'E-commerce' | 'Full Stack' | 'Frontend' | 'Web App';
  description: string;
  detailedDescription?: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string;
    description: string;
  }[];
}

export interface Review {
  id: string;
  clientName: string;
  company: string;
  role: string;
  review: string;
  rating: number;
  avatarText: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export const portfolioData = {
  developer: {
    name: 'Ariyan Akash',
    role: 'Full Stack Developer',
    experience: '3+ Years of Experience in Web Development',
    location: 'Remote / Worldwide',
    email: 'ariyanakash01303@gmail.com',
    phone: '01303489232',
    displayPhone: '+880 1303-489232',
    intro: 'I build modern, responsive, scalable and user-friendly web applications using modern frontend and backend technologies.',
    detailedBio: 'Ariyan Akash is a dedicated Full Stack Developer with 3+ years of hands-on experience crafting fast, accessible, and high-performance web applications. Specialized in modern React ecosystems, Node.js, Express, and scalable REST APIs, Ariyan blends clean code standards with minimal, purposeful interface design.',
    profileImage: '/images/main-image.jpg',
    resumeUrl: '/resume.pdf',
    socials: {
      github: 'https://github.com/ariyanakashbd',
      linkedin: 'https://www.linkedin.com/in/ariyan-akash-38496741',
      facebook: 'https://www.facebook.com/profile.php?id=61560219338721',
      instagram: 'https://www.instagram.com/ariyanakash01303',
      portfolio: 'https://akash31.vercel.app/',
      whatsapp: 'https://wa.me/8801303489232',
    },
    taglines: [
      'React Developer',
      'Node.js Engineer',
      'UI Craftsman',
      'Problem Solver'
    ],
    stats: [
      { label: 'Years Experience', value: '3+' },
      { label: 'Completed Projects', value: '25+' },
      { label: 'Client Satisfaction', value: '100%' },
      { label: 'Availability', value: 'Remote' }
    ]
  },

  skills: [
    {
      category: 'Frontend',
      skills: [
        { name: 'React.js', level: 'Advanced', description: 'Component architecture, hooks, state management' },
        { name: 'JavaScript', level: 'Advanced', description: 'ES6+, asynchronous patterns, DOM manipulation' },
        { name: 'TypeScript', level: 'Proficient', description: 'Type safety, interfaces, scalable codebases' },
        { name: 'Next.js', level: 'Proficient', description: 'Server-side rendering, routing, performance' },
        { name: 'Tailwind CSS', level: 'Advanced', description: 'Utility-first styling, dark mode, responsive design' },
        { name: 'HTML5', level: 'Expert', description: 'Semantic structure, accessibility, web standards' },
        { name: 'CSS3', level: 'Advanced', description: 'Flexbox, CSS Grid, custom transitions, animations' },
        { name: 'Bootstrap', level: 'Proficient', description: 'Rapid prototyping, grid systems, components' },
        { name: 'Responsive Web Design', level: 'Advanced', description: 'Mobile-first layouts across all screen sizes' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 'Advanced', description: 'Event-driven server runtime, microservices, CLI' },
        { name: 'Express.js', level: 'Advanced', description: 'RESTful API routing, middleware, server logic' },
        { name: 'REST API', level: 'Advanced', description: 'Clean endpoint architecture, status codes, documentation' },
        { name: 'Authentication', level: 'Proficient', description: 'Secure user login flows, session handling' },
        { name: 'JWT', level: 'Proficient', description: 'Stateless authorization, token refresh patterns' },
        { name: 'API Integration', level: 'Advanced', description: 'Third-party APIs, webhooks, Axios services' }
      ]
    },
    {
      category: 'Database',
      skills: [
        { name: 'MongoDB', level: 'Proficient', description: 'Document models, Mongoose schemas, aggregations' },
        { name: 'Firebase', level: 'Proficient', description: 'Real-time database, Firestore, authentication' },
        { name: 'Supabase', level: 'Proficient', description: 'PostgreSQL backend, relational tables, row level security' }
      ]
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git', level: 'Advanced', description: 'Branch management, merge conflict resolution' },
        { name: 'GitHub', level: 'Advanced', description: 'Version control, repositories, collaboration' },
        { name: 'GitHub Desktop', level: 'Proficient', description: 'Streamlined commit and sync workflows' },
        { name: 'VS Code', level: 'Expert', description: 'Configured development environment, debugging' },
        { name: 'Postman', level: 'Advanced', description: 'API testing, mock servers, request validation' },
        { name: 'npm', level: 'Advanced', description: 'Package resolution, dependency audits, scripts' }
      ]
    }
  ] as SkillCategory[],

  services: [
    {
      id: 'business-website',
      number: '01',
      title: 'Business Website',
      description: 'Clean, corporate web platforms built to establish credibility, convert visitors, and reflect brand identity with lightning speed.',
      iconName: 'Briefcase'
    },
    {
      id: 'ecommerce-website',
      number: '02',
      title: 'E-commerce Website',
      description: 'End-to-end online storefronts featuring dynamic product catalogs, seamless cart UX, category browsing, and smooth checkout flows.',
      iconName: 'ShoppingBag'
    },
    {
      id: 'school-college-website',
      number: '03',
      title: 'School & College Website',
      description: 'Accessible, structured portals for academic institutions with admission information, notice boards, department pages, and event schedules.',
      iconName: 'GraduationCap'
    },
    {
      id: 'portfolio-website',
      number: '04',
      title: 'Portfolio Website',
      description: 'Distinctive, minimal personal portfolios for creators, engineers, and executives focused on clean typography and proof-of-work.',
      iconName: 'UserCheck'
    },
    {
      id: 'dashboard-application',
      number: '05',
      title: 'Dashboard Application',
      description: 'Data-dense operational dashboards with interactive widgets, filterable tables, activity logs, and real-time visualization.',
      iconName: 'LayoutDashboard'
    },
    {
      id: 'landing-page',
      number: '06',
      title: 'Landing Page',
      description: 'High-converting, performance-optimized marketing landing pages with clear value propositions and zero layout shift.',
      iconName: 'Flame'
    },
    {
      id: 'custom-web-application',
      number: '07',
      title: 'Custom Web Application',
      description: 'Bespoke web software tailored to unique business workflows, featuring complex client state and role-based permissions.',
      iconName: 'Code2'
    },
    {
      id: 'rest-api-development',
      number: '08',
      title: 'REST API Development',
      description: 'Robust, documented backend APIs built with Node.js and Express, equipped with validation, error handling, and security middlewares.',
      iconName: 'Server'
    }
  ] as Service[],

  projects: [
    {
      id: 'ecobazar',
      name: 'Ecobazar',
      category: 'E-commerce',
      description: 'A modern e-commerce web application focused on responsive UI, product browsing and a clean shopping experience.',
      detailedDescription: 'Built with React and Tailwind CSS, Ecobazar delivers smooth product filtering, dynamic cart management, and interactive carousels powered by Swiper.js with optimized image assets.',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Swiper'],
      image: '/images/project-ecobazar.svg',
      liveUrl: 'https://ecobazar-aktu.vercel.app/',
      githubUrl: 'https://github.com/ariyanakashbd',
      featured: true
    },
    {
      id: 'exclusive',
      name: 'Exclusive',
      category: 'E-commerce',
      description: 'A modern e-commerce website with a responsive and user-friendly interface.',
      detailedDescription: 'Exclusive is an elegant retail storefront designed for optimal conversion. It features category navigation, flash sales counters, responsive product grids, and a minimalist black-and-white aesthetic.',
      technologies: ['React', 'Tailwind CSS', 'JavaScript'],
      image: '/images/project-exclusive.svg',
      liveUrl: 'https://exclusive-chi-dun.vercel.app/',
      githubUrl: 'https://github.com/ariyanakashbd',
      featured: true
    },
    {
      id: 'devpulse-dashboard',
      name: 'Google',
      category: 'Full Stack',
      description: 'A developer metrics and application health monitoring dashboard with modular widgets and REST API integration.',
      detailedDescription: 'Full-stack application delivering system metrics, real-time activity streaming, token usage breakdown, and secure authentication.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
      image: '/images/project-dashboard.svg',
      liveUrl: 'https://google-beryl-ten.vercel.app/',
      githubUrl: 'https://github.com/ariyanakashbd',
      featured: true
    },
    {
      id: 'edusphere-portal',
      name: 'EduSphere Academic Portal',
      category: 'Web App',
      description: 'Comprehensive institutional school and college web platform with notice dissemination, faculty directories, and admissions info.',
      detailedDescription: 'Engineered for educational institutions seeking an accessible, accessible web presence with easy-to-update notices, program catalogs, and multi-device compliance.',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
      image: '/images/project-academic.svg',
      liveUrl: 'https://akash31.vercel.app/',
      githubUrl: 'https://github.com/ariyanakashbd',
      featured: false
    }
  ] as Project[],

  experience: [
    {
      period: '2023 — Present',
      title: 'Full Stack Web Developer',
      subtitle: 'Remote / Independent Development',
      description: 'Leading client web development projects from design conceptualization to production deployment, specializing in React and Node.js.',
      highlights: [
        'Built full-featured e-commerce solutions with responsive product catalogs, shopping carts, and checkout flows.',
        'Engineered scalable REST APIs with Express.js incorporating JWT authentication and schema validation.',
        'Optimized frontend loading performance, achieving sub-second first contentful paint across responsive devices.'
      ]
    },
    {
      period: '2022 — 2023',
      title: 'Frontend Developer & UI Specialist',
      subtitle: 'Modern Web Applications',
      description: 'Focused on creating high-fidelity interactive user interfaces with React, modern JavaScript, and Tailwind CSS.',
      highlights: [
        'Developed modular component design systems following clean atomic design principles.',
        'Integrated third-party APIs using Axios with robust interceptors and error handling.',
        'Ensured full cross-browser compatibility and accessible standards (WCAG compliance).'
      ]
    },
    {
      period: '2021 — 2022',
      title: 'Junior Web Developer',
      subtitle: 'Frontend & Responsive Design',
      description: 'Built foundational expertise across HTML5, CSS3, JavaScript, Bootstrap, and Git version control workflows.',
      highlights: [
        'Crafted mobile-first layouts for small businesses, schools, and personal brands.',
        'Collaborated via GitHub workflows, practicing code reviews and branch management.',
        'Mastered responsive CSS grids, flexbox layouts, and custom interactive behaviors.'
      ]
    }
  ] as ExperienceItem[],

  reviews: [
    {
      id: 'rev-1',
      clientName: 'Sarah Jenkins',
      company: 'Digital Solutions Lab',
      role: 'Project Manager',
      review: 'Ariyan delivered our web platform on time with exceptional attention to detail. His understanding of React and clean UI design made the development process seamless.',
      rating: 5,
      avatarText: 'SJ'
    },
    {
      id: 'rev-2',
      clientName: 'Tariq Rahman',
      company: 'Apex Retail Ventures',
      role: 'Founder & CEO',
      review: 'Working with Ariyan was a pleasure. The e-commerce store he built for us is blazing fast, looks stunning on mobile, and works flawlessly. Highly recommended!',
      rating: 5,
      avatarText: 'TR'
    },
    {
      id: 'rev-3',
      clientName: 'Marcus Vance',
      company: 'Novus Media Group',
      role: 'Technical Lead',
      review: 'Ariyan brings clean code, reliable communication, and strong full-stack capability to the table. His REST API implementation was well-structured and easy to integrate.',
      rating: 5,
      avatarText: 'MV'
    },
    {
      id: 'rev-4',
      clientName: 'Elena Rostova',
      company: 'BrightEdu Systems',
      role: 'Operations Director',
      review: 'The academic portal Ariyan designed for our institution exceeded our expectations. Clean navigation, responsive layouts, and great support throughout.',
      rating: 5,
      avatarText: 'ER'
    }
  ] as Review[]
};
