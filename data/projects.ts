export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: ProjectImage[];
  github?: string;
  demo?: string;
  /** Extra outbound links (e.g. GitHub Releases); shown as labeled anchors in the grid and modal. */
  links?: ProjectLink[];
  /** Mermaid source for Technical Deep Dive architecture preview (modal). */
  mermaidDiagram?: string;
  tech: string[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: 'procure-loop',
    title: 'Procure-Loop: Contract Intelligence & Revenue Protection Swarm',
    description:
      'An end-to-end multi-agent orchestration dashboard that automatically scans corporate document repositories to flag upcoming software renewal deadlines, audits real-time seat utilization, and drafts contextual opt-out notices to prevent corporate contract leakage.',
    images: [],
    github: 'https://github.com/haripriyarao26/Procure-Loop',
    tech: ['Python', 'LangGraph', 'FastAPI', 'React', 'TypeScript', 'Vite', 'Vanilla CSS', 'SVG Graphics'],
    features: [
      'Designed a Stateful Agent Swarm: Built a cooperative multi-agent architecture using LangGraph (StateGraph) in Python to coordinate three specialized LLM agents (Ingestion, Scouter, and Drafting) through a directed workflow pipeline.',
      'Implemented Real-Time State Visualization: Created a premium React dashboard featuring a custom interactive SVG-based state machine map that highlights active nodes as they execute, synced with a scrolling monospace developer terminal log.',
      'Engineered Utilization Audits & Arbitrage Logic: Designed data connectors that audit active user counts (mocking Okta directory directories) against seat caps, calculating cost overhead leakage and looking up competitive market rates to suggest lower-cost alternatives.',
      'Automated Renewal Intervention Alerts: Built a router condition that flags contracts within 90 days of renewal with utilization under 85%, initiating the Drafting Agent to auto-generate context-aware non-renewal or negotiation emails.',
      'Developed Full-Stack Architecture: Exposed the LangGraph workspace using FastAPI and Uvicorn to handle CORS request streams, manage in-memory state transactions, and serve dynamic data updates to a modern, glassmorphic React + TypeScript + Vite UI.'
    ],
    mermaidDiagram: `flowchart TD
  I[Ingestion Agent] -->|Parse Contracts & Metadata| S[Scouter Agent]
  S -->|Audit Okta Seat Utilization| C{Intervention Needed?}
  C -->|Renewal < 90d & Seat Use < 85%| D[Drafting Agent]
  C -->|Healthy / High Use| H[Flag Safe / Monitor]
  D -->|Auto-Generate Opt-out/Neg. Email| E[Drafts Inbox]
  H --> M[System Observability Dashboard]`
  },
  {
    id: 'openai-cookbook-langchain-rwmh',
    title: 'OpenAI Cookbook: LangChain RunnableWithMessageHistory hardening',
    description:
      'Contributed a reproduction and in-cookbook mitigation for unsafe deserialization in RunnableWithMessageHistory: constructor-shaped run outputs were being revived into live messages and persisted to chat history (history poisoning), related to langchain-ai/langchain#36380.',
    images: [],
    github: 'https://github.com/openai/openai-cookbook/pull/2568',
    tech: ['Python', 'LangChain', 'langchain-core', 'OpenAI Cookbook', 'Security'],
    features: [
      'Reproduction script under examples/langchain_core documenting the issue',
      'Documents safe persistence when outputs are treated as inert data with an explicit message allowlist',
      'Local LangChain dev ergonomics: ignores for clone/virtualenv paths used in verification'
    ],
    mermaidDiagram: `flowchart LR
  O[Run outputs] --> D[Deserialize]
  D --> A{Allowlisted messages?}
  A -->|yes| S[Safe history]
  A -->|no| R[Reject / inert data]`
  },
  {
    id: 'gemini-cookbook',
    title: 'Google Gemini Cookbook: Cost & Health Monitoring Utility',
    description: 'Architected a cost-tracking utility that handles sub-second API health heartbeats for Gemini 2.0/3.0 models. Contributed to the official Google Gemini repository with production-ready observability tooling.',
    images: [],
    github: 'https://github.com/google-gemini/cookbook/pull/1088',
    tech: ['Python', 'Google Gemini API', 'LLM Observability', 'Type Hints', 'CI/CD'],
    features: [
      'Sub-second API health monitoring',
      'Real-time USD Cost Tracking',
      'Rate Limit Error Handling (429 Resource Exhausted)',
      'Token-to-Cost Normalization',
      'Google Engineering Standards Compliance'
    ],
    mermaidDiagram: `flowchart LR
  G[Gemini API] --> H[Health heartbeat]
  H --> C[Cost tracker]
  C --> O[Observability / alerts]
  R[Requests] --> G`
  },
  {
    id: 'auto-unit-agent',
    title: 'Auto-Unit-Agent: Autonomous Jest Test Generation',
    description: 'Engineered a self-healing agentic framework that generates Jest tests using OS-level sandboxing and child process isolation for secure code validation. Implements LangGraph state machines with conditional routing.',
    images: [],
    github: 'https://github.com/haripriyarao26/auto-unit-agent',
    tech: ['TypeScript', 'Jest', 'LangGraph', 'Node.js', 'OS-level Sandboxing'],
    features: [
      'OS-level sandboxing with child process isolation',
      'LangGraph workflow: generate → execute → debug → retry',
      'Guardrails for model outputs (parsing + validation)'
    ],
    mermaidDiagram: `flowchart LR
  SRC[Source] --> GEN[Generate tests]
  GEN --> SBX[Sandbox run]
  SBX -->|fail| DBG[Debug / fix]
  DBG --> GEN
  SBX -->|pass| OK[Jest output]`
  },
  {
    id: 'dev-log-architect',
    title: 'Dev-Log Architect',
    description:
      'VS Code / Cursor extension (TypeScript) that automates engineering narrative extraction from git diffs and module-level context, producing structured case studies with LLM-authored trade-off analysis and Mermaid architecture views for portfolio- and interview-ready design-review quality.',
    images: [],
    github: 'https://github.com/haripriyarao26/devlog-architect-extension',
    links: [
      {
        label: 'GitHub Releases (VSIX)',
        href: 'https://github.com/haripriyarao26/devlog-architect-extension/releases'
      }
    ],
    tech: [
      'TypeScript',
      'VS Code Extension API',
      'Cursor',
      'OpenAI-compatible APIs',
      'vsce',
      'LLMs',
      'Mermaid'
    ],
    features: [
      'End-to-end ownership for a pre–Marketplace release: OpenAI-compatible integrations and environment-based secrets (no credential storage in-extension)',
      'CI-friendly unit coverage for static-analysis code paths',
      'VSIX distribution via GitHub Releases for controlled beta and QA (vsce packaging)'
    ],
    mermaidDiagram: `flowchart LR
  A[Git diff + context] --> B[Dev-Log Architect]
  B --> C[LLM trade-offs]
  B --> D[Case study MD]
  B --> E[Mermaid synth]
  C --> F[Portfolio pack]
  D --> F
  E --> F`
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
