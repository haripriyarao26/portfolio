export interface ResumeData {
  name: string;
  location: string;
  workAuth: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education: Education[];
  skills: {
    frontierAI: string[];
    modelsAndSDKs: string[];
    languagesAndFullStack: string[];
    dataAndCloud: string[];
  };
  experience: Experience[];
  honors: Honor[];
  certifications: Certification[];
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  badgeText?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  skills?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  coursework?: string[];
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Honor {
  title: string;
  organization: string;
  location: string;
  year: string;
  description: string;
}

export const resumeData: ResumeData = {
  name: "Haripriya Rao",
  location: "USA",
  workAuth: "Cap-Exempt H-1B (Eligible for Immediate Transfer)",
  email: "haripriyaraov@gmail.com",
  phone: "(503) 374-6531",
  linkedin: "linkedin.com/in/haripriya-rao",
  github: "github.com/haripriyarao26",
  education: [
    {
      institution: "University of Southern California",
      degree: "Master of Science in Computer Science",
      location: "Los Angeles, CA",
      period: "Aug 2022 – May 2024",
      coursework: [
        "Distributed Systems",
        "Artificial Intelligence & Machine Learning",
        "Analysis of Algorithms",
        "Database Systems"
      ]
    },
    {
      institution: "Visvesvaraya Technological University",
      degree: "Bachelor of Engineering in Computer Science",
      location: "Bengaluru, India",
      period: "Aug 2017 – Aug 2021",
      coursework: [
        "Artificial Intelligence & Expert Systems",
        "Full-Stack Web Development & Technologies",
        "Data Structures & Algorithms",
        "Database Management Systems (DBMS)",
        "Operating Systems & Computer Networks"
      ]
    }
  ],
  skills: {
    frontierAI: [
      "AI Agents",
      "Agentic Workflows",
      "LangGraph",
      "LangChain",
      "Multi-Agent Systems",
      "RAG Pipelines",
      "Tool Use",
      "Prompt Guardrails",
      "AI Evaluation Frameworks"
    ],
    modelsAndSDKs: [
      "Claude",
      "GPT",
      "Anthropic API",
      "Model Context Protocol (MCP)"
    ],
    languagesAndFullStack: [
      "Python",
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "Node.js",
      "Flask"
    ],
    dataAndCloud: [
      "PostgreSQL",
      "Supabase",
      "Redis",
      "ClickHouse",
      "AWS",
      "Vercel",
      "Render",
      "Git",
      "CI/CD"
    ]
  },
  experience: [
    {
      company: "JPMorgan Chase & Co. (via Think41)",
      position: "Senior AI Consultant",
      location: "Remote",
      period: "Jul 2026 – Present",
      achievements: [
        "Accelerating LLM extraction latency by 52% (40.8s to 19.6s) at 95% field agreement by deploying GPT-5.5 and creating automated A/B golden-dataset regression comparison tooling.",
        "Resolving 100% of thread misclassifications (8/8) across 5–6 level nested forwards with zero false positives via targeted prompt overrides and adversarial test suites.",
        "Engineering autonomous Agentic AI workflows to automate multi-tiered document analysis, entity verification, and fiduciary compliance for regulated financial document workflows."
      ]
    },
    {
      company: "Onetera Technologies",
      position: "Software Engineer 2 / Founding Engineer",
      location: "Los Angeles, CA",
      period: "Jan 2024 – Apr 2026",
      achievements: [
        "Delivered an end-to-end multi-tenant platform on schedule across 6 roadmap phases with 99.98% platform uptime, partnering with NVIDIA stakeholders and city officials.",
        "Slashed LLM inference costs by 96% (from 200KB to 8KB/call) by redesigning the transformation pipeline to scale horizontally to 255+ agentic steps.",
        "Cut per-turn orchestrator latency by 40% via a 22-node asynchronous state machine using asyncio.gather parallel scheduling to eliminate serial round-trips.",
        "Engineered a recursive DFS algorithm to extract 100+ React components from Figma design trees, decreasing manual UI scaffolding time by 90%.",
        "Lifted relevant-result rate 20% and halved malformed responses (50%) using grounded citations and safe JSON parsing recovery.",
        "Engineered concurrent request-collapsing middleware and Redis distributed locks, eliminating 100% of double-charge race conditions.",
        "Reduced MTTR by 40% and sustained 99.98% uptime by owning on-call incident response and instrumenting ClickHouse real-time telemetry dashboards.",
        "Built autonomous self-healing Jest test generation agent using LLM feedback loops, reducing manual maintenance overhead by ~25%."
      ]
    },
    {
      company: "Provenir",
      position: "Full Stack Engineering Intern",
      location: "New Jersey, USA",
      period: "May 2023 – Dec 2023",
      achievements: [
        "Maintained 98% CI/CD pass rate and lowered credit risk SaaS regression defects by 40% while achieving a 95% on-time release cadence across regulated credit-decision workflows.",
        "Developed query optimization algorithms and incremental streaming evaluation for high-throughput credit decision workflows, improving response times by 50% under concurrent load.",
        "Validated platform reliability with automated test suites and collaborated with Quality Engineers to eliminate potential deployment regressions prior to release."
      ]
    },
    {
      company: "Deloitte USI",
      position: "Software Engineer 1",
      location: "Bengaluru, India",
      period: "Jun 2021 – Jul 2022",
      achievements: [
        "Consolidated 15+ data sources into a unified GraphQL API for 4,000+ users, cutting data retrieval latency by 80% (2s to 400ms) and earning the 2022 Excellency Award.",
        "Built executive analytics dashboards with ANT Design and PostgreSQL, optimizing hiring pipeline visibility and reducing data aggregation times by 80%.",
        "Implemented frontend performance optimizations in Angular (lazy-loaded modules, virtualized tables, memoized pipes), cutting dashboard load times by 50%."
      ]
    }
  ],
  honors: [
    {
      title: "Excellency Award",
      organization: "Hashedin by Deloitte (Deloitte USI)",
      location: "Bengaluru, India",
      year: "2022",
      description: "Recognized for predictive analytics innovation in recruitment software"
    },
    {
      title: "Technical Interview Facilitator",
      organization: "Onetera Technologies",
      location: "Los Angeles, CA",
      year: "2024",
      description: "Led technical interviews and mentoring sessions, improving hiring efficiency and team growth"
    }
  ],
  certifications: [
    {
      title: "Claude Certified Architect – Foundations (CCA-F)",
      issuer: "Anthropic",
      issueDate: "2026",
      badgeText: "CCA-F · Anthropic",
      credentialUrl: "https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile",
      skills: ["Claude", "Anthropic API", "Agentic Systems", "Prompt Guardrails", "LLM Architecture"]
    },
    {
      title: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "2026",
      badgeText: "AWS AI Practitioner",
      credentialUrl: "https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url",
      skills: ["AWS", "AI/ML Fundamentals", "Generative AI", "Responsible AI"]
    }
  ]
};

