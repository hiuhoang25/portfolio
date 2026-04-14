// Projects Configuration
// Add, edit, or remove projects here - they will be displayed in the Projects section

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  imageUrl?: string; // Project screenshot or thumbnail
  images?: string[]; // Multiple screenshots (shown as carousel)
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string; // Documentation or case study link
  featured?: boolean; // Highlight this project
}

export const projectsConfig = {
  // Section title and subtitle
  title: 'Projects',
  subtitle: 'A lot of ideas, but some are still under construction!',
  description:
    'Here are some of the projects I\'ve worked on. Each one taught me something new and helped me grow as a developer.',

  // Projects list
  projects: [
    {
      id: 'kiri-discord',
      title: 'Kiri Discord',
      subtitle: 'Leader & Fullstack Developer',
      description:
        'Led a 4-member development team to build and scale a Discord bot serving 1M+ users across 250k+ servers. Architected scalable backend systems with WebSocket, Express.js, MongoDB, and Redis. Implemented real-time audio streaming with Opus and event-driven architecture.',
      achievements: [
        'Monetization strategy generating ~$150/month through premium features/subscriptions',
        '1 million servers milestone achieved',
        'Real-time audio streaming with Opus codec',
      ],
      technologies: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'Redis',
        'WebSocket',
        'Opus',
      ],
      images: [
        '/showcase/charts.jpg',
        '/showcase/economy.jpg',
        '/showcase/manga-info.jpg',
        '/showcase/manga-reader.jpg',
        '/showcase/reading-list.jpg',
        '/showcase/get-link.jpg',
        '/showcase/ticket.jpg',
      ],
      demoUrl: 'https://ibb.co/ksYyPSBz',
      featured: true,
    },
    {
      id: 'blockchain-tour',
      title: 'Blockchain Tour Booking Website',
      subtitle: 'Team Lead & Backend Developer',
      description:
        'Led backend development for a blockchain-based tour booking platform with secure smart contracts using Express.js, Redis, PostgreSQL, and OpenZeppelin. Ensured data integrity and trustless transaction handling.',
      achievements: [
        'Supported 300-500 concurrent users with stable performance',
        'Reduced API response time through caching optimization',
        'Smart contract integration with OpenZeppelin',
      ],
      technologies: [
        'Express.js',
        'PostgreSQL',
        'Redis',
        'Solidity',
        'OpenZeppelin',
        'Blockchain',
      ],
      // imageUrl: 'https://your-image-url.com/blockchain-tour.png',
      githubUrl: 'https://github.com/hiuhoang32/asm2-git',
    },
    {
      id: 'pharmacy-system',
      title: 'Pharmacy Product & Online Store Management System',
      subtitle: 'Full-Stack Developer (Academic Project — Long Châu Pharmacy case study)',
      description:
        'Led full-stack development of a web-based pharmacy management system, handling product, inventory, and employee operations, with an API-driven backend built using Vue.js, Express.js, PostgreSQL, and Redis. Integrated Redis for caching and asynchronous job queue processing to optimize system performance and handle concurrent operations efficiently.',
      achievements: [
        'Improved API response time and reduced database load through Redis-based caching strategies',
        'Implemented background job queues (e.g., order processing, inventory updates) to ensure smooth real-time system behavior under concurrent usage',
        'Designed scalable architecture supporting reliable data consistency and future expansion',
      ],
      technologies: [
        'Vue.js',
        'Express.js',
        'PostgreSQL',
        'Redis',
        'Node.js',
      ],
      // imageUrl: 'https://your-image-url.com/pharmacy-system.png',
      githubUrl: 'https://github.com/ryzenix/asm3-swe30003',
    },
    {
      id: 'medcase-ai',
      title: 'MedCase AI-Augmented Platform',
      subtitle: 'Full-Stack Developer (Capstone Project)',
      description:
        'Built a dual-core AI pipeline for clinical case management: an OCR core for extracting and structuring clinical text from scanned documents, and an analysis core for generating dashboard insights, case summaries, and natural-language search reasoning. Designed a natural-language clinical search engine powered by an AI agent, with graceful fallback handling and prompt injection defense (unsafe instruction-follow rate ≤ 2%). Implemented an AI Context Worker for continuous background trend aggregation and an AI Insight Banner surfacing real-time clinical signals in Vietnamese.',
      achievements: [
        'Achieved 88.6% overall AI confidence score (C_total) across 1,470 evaluated samples — rated "Good confidence, production with monitoring"',
        'OCR field mapping Micro F1 ≥ 0.90 and hallucination rate ≤ 3% on dashboard insights',
        'Designed and executed a 10-family confidence test framework (T1–T10) covering OCR accuracy, clinical consistency, adversarial robustness, route reliability, and Vietnamese language quality',
        'AI Context Worker keeps dashboard insights fresh without live DB latency',
      ],
      technologies: [
        'AI/ML',
        'OCR',
        'Natural Language Processing',
        'Vue.js',
        'Express.js',
        'PostgreSQL',
        'Claude API',
      ],
      featured: true,
      githubUrl: 'https://github.com/ryzenix/capstone-project-a-hn3-2',
      images: [
        '/medcase/ai-summary.png',
        '/medcase/ocr-ai-scan.png',
        '/medcase/collab.png',
        '/medcase/inlinecomment.png',
      ],
    },
    // Add more projects here following the same structure:
    // {
    //   id: 'your-project-id',
    //   title: 'Your Project Name',
    //   subtitle: 'Your Role',
    //   description: 'Project description...',
    //   achievements: ['Achievement 1', 'Achievement 2'],
    //   technologies: ['Tech 1', 'Tech 2'],
    //   imageUrl: 'https://your-image-url.com/project.png',
    //   githubUrl: 'https://github.com/yourusername/repo',
    //   demoUrl: 'https://your-demo-link.com',
    //   featured: true,
    // },
  ] as Project[],

  // Display options
  display: {
    showTechnologies: true,
    showAchievements: true,
    showImages: true,
    gridColumns: 2, // 1, 2, or 3
    sortBy: 'featured' as 'featured' | 'date' | 'name',
  },
};

// Helper to sort projects
export const getSortedProjects = (): Project[] => {
  const { projects, display } = projectsConfig;

  if (display.sortBy === 'featured') {
    return [...projects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  return projects;
};

// Helper to get featured projects only
export const getFeaturedProjects = (): Project[] => {
  return projectsConfig.projects.filter((p) => p.featured);
};
