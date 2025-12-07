export interface ResumeData {
  name: string;
  location: string;
  email: string;
  linkedin: string;
  education: Education[];
  skills: Skills;
  experience: Experience[];
  honors: Honor[];
  certifications: Certification[];
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  imageUrl?: string;
  skills?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  libraries: string[];
  databases: string[];
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
  location: "Los Angeles, CA",
  email: "haripriyaraov@gmail.com",
  linkedin: "linkedin.com/in/haripriya-rao",
  education: [
    {
      institution: "University of Southern California",
      degree: "Master of Science in Computer Science",
      location: "Los Angeles, CA",
      period: "Aug 2022 - May 2024"
    },
    {
      institution: "Visvesvaraya Technological University",
      degree: "Bachelor of Engineering in Computer Science",
      location: "Bengaluru, India",
      period: "Aug 2017 - Aug 2021"
    }
  ],
  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "C", "Java", "SQL", "HTML", "CSS", "GraphQL"],
    frameworks: ["Next.js", "Flask", "Django", "Node.js", "Express", "CircleCI", "Vercel", "Render", "AWS", "Supabase", "LangGraph"],
    libraries: ["React", "Chakra UI", "Bootstrap", "Scikit-Learn", "NLTK"],
    databases: ["PostgreSQL", "MongoDB", "Supabase", "ClickHouse"]
  },
  experience: [
    {
      company: "Onetera Technologies",
      position: "Lead / Software Engineer 2",
      location: "Los Angeles, CA",
      period: "Sep 2024 - Present",
      achievements: [
        "Built and optimized Onetera, improving reliability and performance, which directly contributed to attracting investor confidence and securing a $3M seed raise.",
        "Architected a zero-downtime CI/CD pipeline with CircleCI, Vercel, and Render; reduced deployment time from 20 to 10 minutes and eliminated prior 10-minute downtime.",
        "Designed AI Agent workflows for general task planning and multi-language translation, reducing municipal one-time operational costs by 60-70% and freeing resources for high-impact services.",
        "Monitored ClickHouse pipelines and integrated BetterStack alerts, reducing incident resolution by 40%.",
        "Launched Onetera Studio, a no-code configuration platform for program managers to manage logic, FAQs, and workflows independently, reducing engineering support requests by 60%.",
        "Developed core components of Onetera's Agent Library, enabling cities to deploy pre-built AI agents for ADU permitting, business licensing, and rental programs. Cut service launch times from months to weeks and provided residents 24/7 self-service access.",
        "Serving as a forward-deployed engineer, attending city meetings and demos to gather requirements directly from stakeholders; translated civic needs into technical features that accelerated partnership adoption across multiple cities."
      ]
    },
    {
      company: "Onetera Technologies",
      position: "Founding Software Engineer",
      location: "Los Angeles, CA",
      period: "Jan 2024 - Aug 2024",
      achievements: [
        "Laid the foundation of Onetera's core architecture as a founding engineer, ensuring seamless integration of design and functionality with UI/UX teams, and establishing a scalable infrastructure.",
        "Partnered directly with the Founder/CEO to conceptualize system architecture, define product roadmap, and coordinate with external vendors to integrate emerging GenAI technologies.",
        "Took the product from 0 to 1 by setting up the entire system architecture from scratch—including repository structure, Git workflows, deployment strategy, and CI/CD integration—laying the foundation for a scalable product ecosystem.",
        "Overhauled documentation standards, improving internal annotations and external developer guides, resulting in a 100% faster onboarding process for new team members.",
        "Developed and launched www.onetera.com, ensuring responsive, accessible and visually cohesive UI/UX using customized Chakra UI components."
      ]
    },
    {
      company: "Provenir",
      position: "Full Stack Engineering Intern",
      location: "New Jersey, USA",
      period: "May 2023 - Dec 2023",
      achievements: [
        "Developed and maintained an end-to-end credit risk decision-making SaaS platform using Angular and Spring Boot, covering the full SDLC and achieving a 95% on-time deployment rate.",
        "Enhanced platform reliability by executing comprehensive code reviews and handling a large volume of test cases with a 98% success rate.",
        "Collaborated with Quality Engineers to optimize internal review tools, resolving potential deployment issues by 100% before release."
      ]
    },
    {
      company: "Deloitte",
      position: "Software Engineer 1",
      location: "Bengaluru, India",
      period: "Jun 2021 - Jul 2022",
      achievements: [
        "Collaborated with cross-functional teams to build an enterprise recruitment platform supporting 4K+ employees, improving hiring visibility and data workflows.",
        "Developed two major system modules: a Hiring Flow for streamlined onboarding and a Candidate Portal, enhancing UI/UX with responsive front-end design.",
        "Built an Analytics Dashboard with ANT Design, enabling executives to visualize hiring data through pie, line, and bar charts."
      ]
    }
  ],
  honors: [
    {
      title: "Excellency Award",
      organization: "Deloitte",
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
      title: "Agentic AI for Developers: Concepts and Application for Enterprises",
      issuer: "LinkedIn",
      issueDate: "Nov 2025",
      skills: ["AI Software Development", "Generative AI", "Artificial Intelligence (AI)", "AI Agents"],
      imageUrl: "/certifications/agentic-ai-developers.png"
    },
    {
      title: "Hands-On Agentic AI: Building AI Agents with LlamaIndex",
      issuer: "LinkedIn",
      issueDate: "Nov 2025",
      skills: ["LLaMA", "AI Agents"],
      imageUrl: "/certifications/hands-on-agentic-ai.png"
    },
    {
      title: "Generative AI: Introduction to Large Language Models",
      issuer: "LinkedIn",
      issueDate: "Mar 2024",
      skills: ["Large Language Models (LLM)", "Generative AI"],
      imageUrl: "/certifications/generative-ai-llm.png"
    },
    {
      title: "What Is Generative AI?",
      issuer: "LinkedIn",
      issueDate: "Feb 2024",
      skills: ["Artificial Intelligence for Business", "Generative AI"],
      imageUrl: "/certifications/what-is-generative-ai.png"
    },
    {
      title: "Microsoft Certified - Python",
      issuer: "Microsoft",
      issueDate: "2019"
    },
    {
      title: "Microsoft Certified - JavaScript",
      issuer: "Microsoft",
      issueDate: "2019"
    }
  ]
};

