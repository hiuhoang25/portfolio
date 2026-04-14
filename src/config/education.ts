// Education Configuration
// Add, edit, or remove education items, certificates, and awards here

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
  gpa?: string;
  courses?: string[];
  logoUrl?: string; // School/institution logo
}

export interface Certificate {
  id: string;
  name: string;
  issuer?: string;
  year: string;
  score?: string;
  url?: string;
  logoUrl?: string;
}

export interface Award {
  id: string;
  title: string;
  organization?: string;
  date: string;
  description?: string;
  url?: string;
}

export const educationConfig = {
  // Section title and subtitle
  title: 'Education',
  subtitle: 'I learned a lot, but the real learning happens in the code editor!',
  description:
    'Education has always been the cornerstone of my journey into the tech world. Pursuing a Bachelor\'s in Computer Science has provided me a strong foundation in computer science and software development.',

  // Education entries (sorted by date, most recent first)
  education: [
    {
      id: 'swinburne-bachelor',
      degree: 'Bachelor of Computer Science - Software Development',
      institution: 'Swinburne University of Technology Vietnam',
      location: 'Hanoi, Vietnam',
      startDate: 'Sep 2023',
      endDate: 'Present',
      isCurrent: true,
      description:
        'Final-year student pursuing Computer Science with a focus on programming, web development, and software engineering.',
      gpa: '2.8/4.0',
      courses: [
        'Data Structures & Algorithms',
        'Database Systems',
        'Software Engineering',
        'Computer Networks',
        'Operating Systems',
      ],
      // logoUrl: 'https://your-image-url.com/swinburne-logo.png',
    },
    // Add more education entries:
    // {
    //   id: 'high-school',
    //   degree: 'High School Diploma',
    //   institution: 'Your High School',
    //   location: 'City, Country',
    //   startDate: '2019',
    //   endDate: '2023',
    //   description: '...',
    // },
  ] as EducationItem[],

  // Certificates
  certificates: {
    enabled: true,
    title: 'Certificates',
    items: [
      {
        id: 'ielts',
        name: 'IELTS 7.0',
        issuer: 'British Council',
        year: '2023',
        score: '7.0',
        // url: 'https://...',
      },
      {
        id: 'jlpt',
        name: 'JLPT N5',
        issuer: 'Japan Foundation',
        year: '2025',
        // url: 'https://...',
      },
      // Add more certificates:
      // {
      //   id: 'aws-certified',
      //   name: 'AWS Certified Developer',
      //   issuer: 'Amazon Web Services',
      //   year: '2024',
      //   url: 'https://...',
      // },
    ] as Certificate[],
  },

  // Awards & Achievements
  awards: {
    enabled: true,
    title: 'Awards',
    items: [
      {
        id: 'future-blue',
        title: 'Top 10 teams of the Future Blue Innovation Competition',
        organization: 'Future Blue',
        date: 'March 2021 - June 2021',
        description:
          'Recognized for innovative project development and teamwork in a national competition.',
        // url: 'https://...',
      },
      // Add more awards:
      // {
      //   id: 'hackathon-winner',
      //   title: 'First Place - University Hackathon',
      //   organization: 'Swinburne University',
      //   date: '2024',
      //   description: '...',
      // },
    ] as Award[],
  },

  // Extracurricular activities
  extracurricular: {
    enabled: true,
    title: 'Extracurricular Activities',
    items: [
      {
        id: 'badminton-club',
        title: 'Swinburne Badminton Club',
        role: 'Graphic Designer',
        period: '2023 - 2024',
        description: 'Design graphics for the club social media posts.',
      },
      {
        id: 'cooking-club',
        title: "Chef's Choice Cooking Club",
        role: 'Fullstack Engineer & Graphic Designer',
        period: '2023 - 2025',
        description:
          "Develop the club's app for ordering food in the campus and manage the club social media.",
      },
    ],
  },

  // Display options
  display: {
    showGpa: true,
    showCourses: true,
    showCertificates: true,
    showAwards: true,
    showExtracurricular: true,
    showLogos: true,
  },
};
