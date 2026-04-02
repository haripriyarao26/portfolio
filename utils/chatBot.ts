import { resumeData } from '@/data/resume';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const initialPrompts = [
  "Tell me about your work at Onetera Technologies",
  "What technologies do you work with?",
  "What projects have you built?",
  "Tell me about your education background",
  "What are your key achievements?",
  "How did you scale Onetera to $3M ARR?",
];

export function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();
  
  // Education queries
  if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('study')) {
    const edu = resumeData.education.map(e => 
      `**${e.degree}** from ${e.institution}, ${e.location} (${e.period})`
    ).join('\n\n');
    return `I have the following educational background:\n\n${edu}`;
  }

  // Skills queries
  if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || message.includes('programming language') || message.includes('framework')) {
    const skills = resumeData.skills;
    return `Here are my technical skills:\n\n**Languages:** ${skills.languages.join(', ')}\n\n**Frameworks/Tools:** ${skills.frameworks.join(', ')}\n\n**Libraries:** ${skills.libraries.join(', ')}\n\n**Databases:** ${skills.databases.join(', ')}`;
  }

  // Job search / opportunities
  if (
    message.includes('opportunit') ||
    message.includes('looking for') ||
    message.includes('open to') ||
    message.includes('hiring') ||
    message.includes('available for work')
  ) {
    return `I'm **actively looking for new opportunities** in **software engineering (SDE)** and **AI**—roles where I can contribute to distributed systems, agentic workflows, and production-grade full-stack platforms.\n\nYou can reach me via **${resumeData.email}** or **${resumeData.linkedin}**.`;
  }

  // Onetera queries
  if (message.includes('onetera')) {
    const oneteraExp = resumeData.experience.find(
      (e) => e.company === 'Onetera Technologies' && e.position === 'Software Engineer 2'
    );
    if (oneteraExp) {
      return `I most recently worked as a **${oneteraExp.position}** at ${oneteraExp.company} (${oneteraExp.period}). Highlights include:\n\n${oneteraExp.achievements.map((a) => `• ${a}`).join('\n\n')}`;
    }
  }

  // ARR / Revenue queries
  if (message.includes('arr') || message.includes('revenue') || message.includes('$3m') || message.includes('3 million')) {
    return `I scaled Onetera's engineering platform to achieve **$3M ARR** by leading product, DevOps, and AI initiatives. This involved:\n\n• Architecting zero-downtime CI/CD pipelines\n• Developing AI-powered tools for municipal services\n• Building no-code platforms to reduce engineering overhead\n• Implementing comprehensive monitoring and observability\n• Working directly with city stakeholders as a forward-deployed engineer`;
  }

  // Projects queries
  if (message.includes('project') || message.includes('built') || message.includes('develop') || message.includes('create')) {
    const projects = [
      "**OpenAI Cookbook** (PR #2568, https://github.com/openai/openai-cookbook/pull/2568): LangChain RunnableWithMessageHistory deserialization repro and mitigation guidance",
      "**Evolutionary-SDE** (https://github.com/haripriyarao26/Evolutionary-SDE): Evolutionary methods with stochastic differential equation experiments",
      "**Dev-Log Architect** — repo https://github.com/haripriyarao26/devlog-architect-extension · VSIX releases https://github.com/haripriyarao26/devlog-architect-extension/releases: VS Code/Cursor extension for case studies from git diffs + LLM/Mermaid",
      "**Spatial Analysis Tool for City of San Jose**: Processes site plans to auto-generate compliance reports with zoning validations",
      "**AI-powered Service & Permit Guide**: Uses GPT-4 to crawl municipal websites and generate structured documentation",
      "**Onetera Studio**: A no-code configuration platform that reduced engineering support requests by 60%",
      "**www.onetera.com**: Responsive, accessible website built with Next.js and Chakra UI",
      "**Credit Risk Decision Platform** (at Provenir): End-to-end SaaS platform using Angular and Spring Boot",
      "**Enterprise Recruitment Platform** (at Deloitte): Supporting 4K+ employees with 90% reduction in cycle time"
    ];
    return `Here are some key projects I've worked on:\n\n${projects.map(p => `• ${p}`).join('\n\n')}`;
  }

  // Experience / Work history
  if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('career')) {
    const expList = resumeData.experience.map(e => 
      `**${e.position}** at ${e.company}\n${e.location} | ${e.period}`
    ).join('\n\n');
    return `Here's my professional experience:\n\n${expList}\n\nWould you like to know more about any specific role?`;
  }

  // Achievements
  if (message.includes('achievement') || message.includes('accomplish') || message.includes('impact') || message.includes('result')) {
    const achievements = [
      "Scaled Onetera to $3M ARR",
      "Reduced deployment time from 20 to 10 minutes with zero downtime",
      "Reduced engineering support requests by 60% with Onetera Studio",
      "100% faster onboarding process through improved documentation",
      "90% reduction in recruitment cycle time at Deloitte",
      "95% on-time deployment rate at Provenir",
      "98% test case success rate at Provenir"
    ];
    return `Some of my key achievements include:\n\n${achievements.map(a => `• ${a}`).join('\n\n')}`;
  }

  // CI/CD / DevOps
  if (message.includes('ci/cd') || message.includes('devops') || message.includes('deployment') || message.includes('pipeline')) {
    return `I architected a **zero-downtime CI/CD pipeline** using CircleCI, Vercel, and Render. This achievement:\n\n• Reduced deployment time from 20 to 10 minutes\n• Eliminated the prior 10-minute downtime\n• Enabled seamless updates to production systems\n\nI also integrated BetterStack for real-time incident alerts and implemented comprehensive ClickHouse monitoring for LangGraph nodes.`;
  }

  // AI / GPT queries
  if (message.includes('ai') || message.includes('gpt') || message.includes('llm') || message.includes('langgraph') || message.includes('machine learning')) {
    return `I've worked extensively with AI technologies:\n\n• **AI-powered Service & Permit Guide**:** Built using GPT-4 to crawl municipal websites, parse content into MongoDB, and generate structured business and permit documentation\n\n• **ClickHouse Monitoring**: Implemented comprehensive monitoring for LangGraph nodes to track latency, token usage, and agent performance in real time\n\n• **GenAI Integration**: As a founding engineer, I coordinated with external vendors to integrate emerging GenAI technologies into Onetera's platform`;
  }

  // Awards / Honors
  if (message.includes('award') || message.includes('honor') || message.includes('recognition')) {
    const honors = resumeData.honors.map(h => 
      `**${h.title}** - ${h.organization} (${h.year})\n${h.description}`
    ).join('\n\n');
    return `I've received the following recognition:\n\n${honors}`;
  }

  // About / Who are you
  if (message.includes('who are you') || message.includes('about you') || message.includes('introduce') || message.includes('tell me about yourself')) {
    return `Hi! I'm **${resumeData.name}**, a Software Engineer based in ${resumeData.location}. I specialize in distributed AI infrastructure and high-performance full-stack systems, most recently at **Onetera Technologies** (through Mar 2026), where I helped scale the platform and architect agentic workflows and observability.\n\nI'm **actively looking for new opportunities in SDE and AI**. Ask me about my experience, projects, or tech stack.`;
  }

  // Contact
  if (message.includes('contact') || message.includes('email') || message.includes('linkedin') || message.includes('reach')) {
    return `You can reach me at:\n\n**Email:** ${resumeData.email}\n**LinkedIn:** ${resumeData.linkedin}\n**Location:** ${resumeData.location}`;
  }

  // Default response
  return `I'd be happy to help! I can tell you about:\n\n• My recent experience at Onetera Technologies (through Mar 2026)\n• That I'm actively looking for SDE/AI opportunities\n• Projects I've built (AI tools, platforms, websites)\n• My technical skills and technologies I work with\n• My education background\n• Key achievements and impact\n• How I scaled Onetera to $3M ARR\n\nWhat would you like to know more about?`;
}

