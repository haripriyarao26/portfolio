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
    id: 'evolutionary-sde',
    title: 'Evolutionary-SDE',
    description:
      'Explores evolutionary algorithms together with stochastic differential equation (SDE) formulations for simulation and optimization-style experiments.',
    images: [],
    github: 'https://github.com/haripriyarao26/Evolutionary-SDE',
    tech: ['Python', 'Numerical methods', 'SDEs', 'Evolutionary computation'],
    features: [
      'Evolutionary search strategies over continuous dynamics',
      'Reproducible experiments and clear repository layout',
      'Suited for extending with custom fitness landscapes and noise models'
    ],
    mermaidDiagram: `flowchart LR
  P[Population] --> E[Evolve]
  E --> N[Noise / SDE step]
  N --> F[Fitness]
  F --> P`
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
    github: 'https://github.com/haripriyarao26/Dev-Log-Architect',
    links: [
      {
        label: 'GitHub Releases (VSIX)',
        href: 'https://github.com/haripriyarao26/Dev-Log-Architect/releases'
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
  },
  {
    id: 'moodbite',
    title: 'MoodBite',
    description: 'A mood-driven food recommendation agent powered by AI',
    images: [],
    github: 'https://github.com/haripriyarao26/MoodBite',
    demo: 'https://haripriyarao26.github.io/MoodBite/',
    tech: ['Next.js 14', 'TypeScript', 'Ant Design', 'Hugging Face AI', 'GitHub Pages'],
    features: ['Mood Analysis', 'Time-Aware', 'Energy Level', 'Dietary Preferences', 'Memory'],
    mermaidDiagram: `flowchart LR
  U[User + mood] --> M[HF model]
  M --> R[Recommendations]
  R --> UI[Next.js UI]`
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
