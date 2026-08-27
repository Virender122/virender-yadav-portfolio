export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud & Tools';
  icon: string; // Used to identify icon names
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface Project {
  title: string;
  techStack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Education {
  college: string;
  degree: string;
  duration: string;
  score: string;
  location: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  phone: string;
  email: string;
  linkedIn: string;
  gitHub: string;
  location: string;
  summary: string;
  highlights: { label: string; value: string }[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
}

export const portfolioData: PortfolioData = {
  name: "Virender Yadav",
  role: "MERN Full Stack Developer",
  phone: "7906236590",
  email: "virendaryadav831@gmail.com",
  linkedIn: "https://linkedin.com/in/virender-yadav-2476a4219",
  gitHub: "https://github.com/Virender122",
  location: "Noida / Meerut, India",
  summary:
    "MERN Full Stack Developer with 1.7 years of experience in React.js, Node.js, MongoDB, and MySQL, building responsive and scalable web applications. Experienced in API development, authentication, AWS deployment, CI/CD pipelines, and collaborating with cross-functional teams to deliver business-driven solutions.",
  highlights: [
    { label: "Years Experience", value: "1.7+" },
    { label: "MERN Stack Expertise", value: "Full Stack" },
    { label: "Web Applications", value: "Scalable" },
  ],
  skills: [
    // Frontend
    { name: "React.js", category: "Frontend", icon: "react" },
    { name: "Next.js", category: "Frontend", icon: "nextjs" },
    { name: "TypeScript", category: "Frontend", icon: "typescript" },
    { name: "JavaScript ES6+", category: "Frontend", icon: "javascript" },
    { name: "Tailwind CSS", category: "Frontend", icon: "tailwind" },
    { name: "HTML5", category: "Frontend", icon: "html" },
    { name: "CSS", category: "Frontend", icon: "css" },

    // Backend
    { name: "Node.js", category: "Backend", icon: "nodejs" },
    { name: "Express.js", category: "Backend", icon: "express" },
    { name: "REST APIs", category: "Backend", icon: "api" },
    { name: "JWT Authentication", category: "Backend", icon: "jwt" },
    { name: "Authorization", category: "Backend", icon: "lock" },

    // Database
    { name: "MongoDB", category: "Database", icon: "mongodb" },
    { name: "MySQL", category: "Database", icon: "mysql" },

    // Cloud & Tools
    { name: "AWS EC2", category: "Cloud & Tools", icon: "aws" },
    { name: "AWS S3", category: "Cloud & Tools", icon: "aws-s3" },
    { name: "Git", category: "Cloud & Tools", icon: "git" },
    { name: "GitHub", category: "Cloud & Tools", icon: "github" },
    { name: "Postman", category: "Cloud & Tools", icon: "postman" },
    { name: "Jira", category: "Cloud & Tools", icon: "jira" },
  ],
  experience: [
    {
      company: "SourceryIT",
      role: "MERN Developer",
      duration: "Dec 2024 – Present",
      location: "Noida",
      highlights: [
        "Delivered scalable full-stack applications using React.js, Next.js, Node.js, and databases.",
        "Built secure authentication, APIs, dashboards, and role-based access control systems.",
        "Collaborated with cross-functional teams to deliver high-performance, production-ready features.",
      ],
    },
    {
      company: "ConsultIT",
      role: "Web Developer",
      duration: "Sep 2023 – Feb 2024",
      location: "Noida",
      highlights: [
        "Worked on frontend development using React.js and JavaScript.",
        "Assisted in API integration and bug fixing.",
        "Collaborated with senior developers to develop and maintain web applications.",
      ],
    },
  ],
  projects: [
    {
      title: "Fix & Furnish",
      techStack: ["React.js", "Node.js", "Express.js", "MySQL"],
      description:
        "Built an end-to-end service management platform enabling customers, sellers, admins, and technicians to manage the complete service lifecycle from lead creation to job completion. Designed role-based workflows for lead assignment, service tracking, and technician operations.",
      liveUrl: "https://fix-furnish.example.com", // Realistic fallback links
      githubUrl: "https://github.com/Virender122/fix-furnish",
    },
    {
      title: "Snake & Ladder Multiplayer",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
      description:
        "Built a real-time multiplayer gaming platform enabling players to compete remotely through live game state synchronization and interactive gameplay. Designed scalable game logic with authentication, match history, score tracking, and real-time communication.",
      liveUrl: "https://snake-ladder.example.com",
      githubUrl: "https://github.com/Virender122/snake-ladder-multiplayer",
    },
    {
      title: "Solventum",
      techStack: ["React.js", "TypeScript", "Plotly", "Redux"],
      description:
        "Built healthcare analytics and feedback management modules that enable data-driven insights into medical product usage across hospitals. Developed interactive dashboards, leaderboards, and reporting visualizations to help stakeholders monitor performance and adoption trends.",
      liveUrl: "https://solventum-analytics.example.com",
      githubUrl: "https://github.com/Virender122/solventum",
    },
    {
      title: "SageAI",
      techStack: ["React.js", "Redux"],
      description:
        "Developed a responsive AI chat application with secure login/logout authentication using React.js. Implemented Redux for efficient state management, ensuring a smooth and consistent user experience."
    },
    {
      title: "Calculator Web App",
      techStack: ["React.js"],
      description:
        "Built a responsive calculator application using React.js with a clean and intuitive user interface. Implemented arithmetic operations and optimized the application for a seamless user experience across devices."
    }
  ],
  education: [
    {
      college: "Dewan VS Institute of Engineering & Technology",
      degree: "B.Tech in Computer Science",
      duration: "Aug 2019 – June 2023",
      score: "8.35 CGPA",
      location: "Meerut",
    },
  ],
  achievements: [
    {
      title: "Research Paper Publication",
      description:
        "Published a research paper during graduation and received a participation certificate.",
    },
    {
      title: "Technical Workshops & Events",
      description:
        "Actively participated in technical workshops, events, and college activities.",
    },
  ],
};
