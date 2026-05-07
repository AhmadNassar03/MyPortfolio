/**
 * cv.ts — Typed source of truth for Ahmad Nassar's portfolio.
 *
 * Drives:
 *  - All UI sections (hero, about, skills, experience, etc.)
 *  - /api/cv.json structured endpoint (AI agents)
 *  - JSON-LD Person schema
 *  - Sitemap entries (project case studies)
 *
 * Edit here → entire site updates.
 */

export type SkillCategory =
  | "AI / LLM"
  | "Backend"
  | "Frontend"
  | "Databases"
  | "DevOps / Cloud"
  | "Languages"
  | "Tools"
  | "Soft Skills";

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    website?: string;
  };
  bio: string;
  currentlyExploring: string[];
  nowStudying: string;
  highlights: { value: string; label: string }[];
}

export interface SkillGroup {
  category: SkillCategory;
  items: string[];
  /** AI/LLM gets featured first; lower number = earlier in UI */
  weight: number;
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  highlights: string[];
  /** bento sizing — "wide" = 2 cols, "tall" = 2 rows, "default" = 1x1 */
  bentoSize: "feature" | "wide" | "tall" | "default";
  status: "live" | "private" | "archived";
  year: string;
  accent: "violet" | "cyan" | "pink" | "amber";
}

export interface Certification {
  name: string;
  issuer: "Anthropic" | "Google" | "Coursera";
  year: string;
}

export interface Education {
  degree: string;
  school: string;
  start: string;
  end: string;
  location: string;
}

/* ========================================================== */

export const profile: Profile = {
  name: "Ahmad Nassar",
  headline: "Software Engineer · AI-Focused Full Stack Developer",
  tagline:
    "I ship real AI products — LLM agents, computer vision, agentic automation — backed by solid engineering fundamentals.",
  location: "Amman, Jordan",
  email: "ahmad.nassar5903@gmail.com",
  phone: "+962 795 138 584",
  links: {
    github: "https://github.com/AhmadNassar03",
    linkedin: "https://linkedin.com/in/ahmad-nassar-27275123b",
  },
  bio: "Software Engineering graduate with a genuine passion for AI and applied machine learning. Solid backend and full-stack foundation in ASP.NET Core, Node.js, Next.js, and SQL — now channelled into building real AI-powered products. Shipped multiple live AI SaaS applications integrating LLMs (Groq Llama-3, Gemini, Claude/Anthropic), real-time computer-vision pipelines with TensorFlow.js and YOLOv8, and agentic automation workflows via n8n and MCP. Certified in AI by Google and Anthropic.",
  currentlyExploring: [
    "claude-opus-4-7",
    "mcp",
    "groq-llama-3.3-70b",
    "agentic-eval-harnesses",
  ],
  nowStudying: "agentic eval harnesses · MCP servers · production LLM patterns",
  highlights: [
    { value: "4", label: "live AI products shipped" },
    { value: "7", label: "AI certifications (Anthropic + Google)" },
    { value: "65+", label: "production deployments" },
    { value: "3+", label: "years shipping" },
  ],
};

export const skills: SkillGroup[] = [
  {
    category: "AI / LLM",
    weight: 1,
    items: [
      "Groq Llama-3.3-70b",
      "Gemini 2.0 Flash",
      "Claude (Anthropic)",
      "OpenAI GPT",
      "Prompt Engineering",
      "Agentic Pipelines",
      "MCP (Model Context Protocol)",
      "n8n",
      "TensorFlow.js",
      "YOLOv8",
    ],
  },
  {
    category: "Backend",
    weight: 2,
    items: ["ASP.NET Core", "Node.js", "FastAPI", "RESTful APIs", "WebSockets"],
  },
  {
    category: "Frontend",
    weight: 3,
    items: ["Next.js 14+", "TypeScript", "React", "Tailwind CSS", "Recharts"],
  },
  {
    category: "Databases",
    weight: 4,
    items: [
      "SQL Server",
      "MySQL",
      "Oracle",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "Drizzle ORM",
    ],
  },
  {
    category: "DevOps / Cloud",
    weight: 5,
    items: ["Vercel", "Railway", "Docker", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Languages",
    weight: 6,
    items: ["C#", "TypeScript", "JavaScript", "Python", "Java", "HTML", "CSS"],
  },
  {
    category: "Tools",
    weight: 7,
    items: [
      "Visual Studio",
      "VS Code",
      "Postman",
      "Figma",
      "Swagger",
      "Supabase Studio",
    ],
  },
  {
    category: "Soft Skills",
    weight: 8,
    items: [
      "Leadership",
      "Agile / Scrum",
      "Problem Solving",
      "Technical Communication",
      "Project Planning",
    ],
  },
];

export const experience: Experience[] = [
  {
    role: "ASP.NET Developer",
    company: "Orange Jordan",
    start: "March 2025",
    end: "June 2025",
    location: "Amman, Jordan",
    bullets: [
      "Developed and maintained enterprise web applications using ASP.NET Core and SQL Server, improving system reliability and performance.",
      "Designed and implemented RESTful APIs supporting real-time data exchange across internal and customer-facing platforms.",
      "Collaborated within Agile/Scrum cross-functional teams to deliver features on schedule.",
    ],
  },
  {
    role: "ASP.NET Developer Intern",
    company: "Future Advanced Internet Solutions",
    start: "September 2024",
    end: "December 2024",
    location: "Amman, Jordan",
    bullets: [
      "Built and tested backend modules using ASP.NET MVC and Entity Framework against live client databases.",
      "Optimised complex SQL queries and assisted in implementing authentication and role-based authorisation systems.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "SHAI for AI",
    start: "May 2022",
    end: "September 2022",
    location: "Amman, Jordan",
    bullets: [
      "Contributed to full-stack features using JavaScript (frontend) and C# (backend), integrating third-party APIs with secure data handling.",
      "Participated in code reviews and applied software quality practices in an AI-focused product environment.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "omniagent",
    name: "OmniAgent",
    tagline: "Omnichannel AI SaaS — LLM-routed customer conversations",
    description:
      "Production-ready omnichannel AI SaaS routing customer conversations through an LLM-powered agent with Gemini fallback. Multi-tenant, real-time, n8n-orchestrated.",
    longDescription:
      "OmniAgent is a production omnichannel AI platform that unifies customer conversations across channels and routes each message through an LLM-powered agent with intelligent fallback. Multi-tenant Postgres architecture, real-time conversation handling, and automated workflow orchestration via n8n. 65+ Vercel deployments shipped.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Prisma",
      "Groq Llama-3.3-70b",
      "Gemini 2.0 Flash",
      "n8n",
      "Vercel",
    ],
    liveUrl: "https://omnichannel-saas-zeta.vercel.app",
    repoUrl: "https://github.com/AhmadNassar03",
    highlights: [
      "65+ production Vercel deployments",
      "LLM-routed agent with Gemini fallback for resilience",
      "Multi-tenant Postgres architecture with row-level isolation",
      "Real-time conversation handling via WebSockets",
      "n8n workflow orchestration for automated actions",
    ],
    bentoSize: "feature",
    status: "live",
    year: "2025",
    accent: "violet",
  },
  {
    slug: "leadgrade",
    name: "LeadGrade",
    tagline: "AI Lead Scoring SaaS — compliance-first semantic analysis",
    description:
      "AI-powered lead scoring engine for debt-relief intake. Runs every lead through compliance hard stops (TCPA, FTC TSR), then scores 0–100 using Gemini semantic analysis.",
    longDescription:
      "LeadGrade is an AI-powered lead scoring engine purpose-built for debt-relief intake compliance. Each lead passes through TCPA and FTC TSR hard-stop checks, then receives a 0–100 score from Gemini semantic analysis. Role-based dashboards, source performance analytics, and white-label configuration. Fully deployed on Vercel.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Google Gemini API",
      "Supabase",
      "Recharts",
      "Vercel",
    ],
    liveUrl: "https://lead-scoring-rho.vercel.app",
    repoUrl: "https://github.com/AhmadNassar03",
    highlights: [
      "TCPA + FTC TSR compliance hard stops before scoring",
      "Gemini semantic analysis returns 0–100 lead quality score",
      "Role-based dashboards (admin, manager, agent)",
      "Source performance analytics with Recharts visualisations",
      "White-label configuration for multi-client deployment",
    ],
    bentoSize: "wide",
    status: "live",
    year: "2025",
    accent: "cyan",
  },
  {
    slug: "workforce-ai",
    name: "WorkForce AI",
    tagline: "Real-time workplace monitoring with computer vision",
    description:
      "Computer-vision platform tracking attendance and productivity from live camera feeds. WebSocket dashboard, MJPEG ingest, low-latency YOLOv8 inference.",
    longDescription:
      "WorkForce AI is a real-time workplace monitoring platform that uses computer vision to track attendance and productivity from live camera feeds. Built with TensorFlow.js and YOLOv8 for low-latency inference, MJPEG streaming for video ingest, and a WebSocket-based dashboard for live alerting.",
    stack: [
      "TypeScript",
      "TensorFlow.js",
      "YOLOv8",
      "MJPEG Streaming",
      "Drizzle ORM",
      "Railway",
      "WebSockets",
    ],
    repoUrl: "https://github.com/AhmadNassar03",
    highlights: [
      "Real-time YOLOv8 inference on live camera feeds",
      "MJPEG streaming pipeline optimised for low latency",
      "WebSocket dashboard with live alerting",
      "Drizzle ORM on Railway-hosted Postgres",
    ],
    bentoSize: "tall",
    status: "private",
    year: "2024",
    accent: "pink",
  },
  {
    slug: "siyanahjo",
    name: "SiyanahJo",
    tagline: "Vehicle maintenance platform (graduation project)",
    description:
      "Full-stack mobile + web platform connecting Jordanian car owners with auto-maintenance workshops. Booking, payments, ratings, reviews.",
    longDescription:
      "SiyanahJo is a full-stack mobile and web platform connecting car owners with auto-maintenance workshops in Jordan. Built as the graduation project — designed booking flow, payment integration concepts, and a user rating and review system end-to-end.",
    stack: ["ASP.NET Core", "SQL Server", "Flutter"],
    repoUrl: "https://github.com/AhmadNassar03",
    highlights: [
      "Full booking flow with workshop discovery",
      "Payment integration concepts with secure handling",
      "User rating and review system",
      "Cross-platform Flutter mobile + ASP.NET web",
    ],
    bentoSize: "default",
    status: "archived",
    year: "2025",
    accent: "amber",
  },
];

export const certifications: Certification[] = [
  { name: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", year: "2026" },
  { name: "Claude with Amazon Bedrock", issuer: "Anthropic", year: "2026" },
  { name: "Claude with Google Cloud Vertex AI", issuer: "Anthropic", year: "2026" },
  { name: "AI Capabilities and Limitations", issuer: "Anthropic", year: "2026" },
  { name: "Google AI Essentials", issuer: "Google", year: "2026" },
  { name: "Google Prompting Essentials", issuer: "Google", year: "2026" },
  { name: "AI for App Building", issuer: "Coursera", year: "2026" },
];

export const education: Education = {
  degree: "Bachelor of Science in Software Engineering",
  school: "Al-Zaytoonah University of Jordan",
  start: "October 2021",
  end: "July 2025",
  location: "Amman, Jordan",
};

export const leadership = {
  role: "Event Operations & Technical Admin",
  context: "In collaboration with Zain Jordan",
  bullets: [
    "Managed technical operations for a large-scale esports event supporting 400+ participants via Discord, Warlegend.gg match distribution, and live production coordination.",
    "Enforced fair play by identifying rule violations and cheating cases; supported streaming teams during live finals.",
  ],
};

export const languages = ["Arabic (Native)", "English (Professional)"];

/* Computed helpers */
export const sortedSkills = [...skills].sort((a, b) => a.weight - b.weight);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
