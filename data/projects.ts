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
  category: string;
  status: string;
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
  metrics?: string[];
}

export const projects: Project[] = [
  {
    id: 'procure-loop',
    title: 'Procure-Loop: 3-Agent Contract Intelligence Swarm',
    category: 'Agentic System & Live UI',
    status: 'Flagship Architecture · Full-Stack Demo',
    description:
      'An end-to-end multi-agent orchestration system using LangGraph (StateGraph) in Python to coordinate 3 specialized agents (Ingestion, Scouter, Drafting) with real-time SVG state visualization, Okta seat utilization audits, and automated renewal intervention alerts.',
    images: [],
    github: 'https://github.com/haripriyarao26/Procure-Loop',
    tech: ['Python', 'LangGraph', 'FastAPI', 'React', 'TypeScript', 'Vite', 'SVG State Machine'],
    features: [
      'Designed a 3-agent cooperative swarm (Ingestion, Scouter, Drafting) coordinated through a stateful LangGraph directed DAG',
      'Created a live interactive SVG state machine UI highlighting active execution nodes with synchronized monospace telemetry stream',
      'Built renewal intervention gating: triggers automated non-renewal drafting for contracts within 90 days of renewal with <85% seat utilization'
    ],
    metrics: ['3-Agent Swarm', 'LangGraph DAG', 'Real-time SVG Map'],
    mermaidDiagram: `flowchart TD
  I[Ingestion Agent: Parse Contracts] --> S[Scouter Agent: Audit Seat Utilization]
  S --> C{Intervention Needed?}
  C -->|Renewal < 90d & Seat Use < 85%| D[Drafting Agent: Auto-Generate Notice]
  C -->|Healthy / High Use| H[Flag Safe / Telemetry Log]
  D --> E[Drafts Inbox & Approval Gate]
  H --> M[System Observability Dashboard]`
  },
  {
    id: 'gemini-cookbook',
    title: 'Google Gemini Cookbook: Production Health & Cost Observability',
    category: 'Open Source Contribution',
    status: 'PR #1088 · Merged by Google Maintainers',
    description: 'Contributed error-aware exponential backoff for 429 rate limits, real-time USD cost-tracking, and sub-second health heartbeats for Gemini 2.0/3.0 models — merged into the official Google Gemini Cookbook repository.',
    images: [],
    github: 'https://github.com/google-gemini/cookbook/pull/1088',
    tech: ['Python', 'Google Gemini API', 'LLM Observability', 'Rate Limiting', 'CI/CD'],
    features: [
      'Merged by Google Gemini maintainers: integrated sub-second API health heartbeats and real-time USD cost tracking',
      'Engineered error-aware exponential backoff (30s/60s/90s) handling 429 Resource Exhausted rate limits with graceful degradation',
      'Token-to-cost normalization layer compliant with Google engineering standards and CI workflows'
    ],
    metrics: ['Merged by Google', 'PR #1088', '429 Rate Backoff'],
    mermaidDiagram: `flowchart LR
  G[Gemini API] --> H[Health Heartbeat]
  H --> C[Cost Tracker & Token Normalizer]
  C --> O[Observability & Alerts]
  R[Requests] -->|429 Rate Limit| B[Exponential Backoff 30/60/90s]
  B --> G`
  },
  {
    id: 'openai-cookbook-langchain-rwmh',
    title: 'OpenAI Cookbook: LangChain Security Hardening',
    category: 'Open Source Contribution',
    status: 'PR #2568 · Contributed to OpenAI Cookbook',
    description:
      'Contributed reproduction and in-cookbook security mitigation for unsafe deserialization in RunnableWithMessageHistory to prevent chat history poisoning (langchain-ai/langchain#36380), enforcing strict message allowlists and inert output handling.',
    images: [],
    github: 'https://github.com/openai/openai-cookbook/pull/2568',
    tech: ['Python', 'LangChain', 'langchain-core', 'OpenAI Cookbook', 'Security Hardening'],
    features: [
      'Engineered a reproduction script isolating the unsafe deserialization vulnerability in RunnableWithMessageHistory',
      'Documented and proved safe persistence architecture by enforcing strict message allowlists and inert output handling',
      'Built local virtualenv developer tooling and verification fixtures to standardize OSS contribution testing'
    ],
    metrics: ['PR #2568', 'History Poisoning Fix', 'OpenAI Cookbook'],
    mermaidDiagram: `flowchart LR
  O[Run Outputs] --> D[Deserialize Payload]
  D --> A{Allowlisted Message?}
  A -->|Valid| S[Safe History Storage]
  A -->|Untrusted / Injected| R[Reject / Store as Inert Data]`
  },
  {
    id: 'auto-unit-agent',
    title: 'Auto-Unit-Agent: Autonomous Jest Test Generation',
    category: 'Agentic Framework & CLI',
    status: 'Open Source Agent',
    description: 'Engineered an autonomous agent using LLM feedback loops to self-heal broken Jest test suites, with OS-level sandboxing and child process isolation for secure code validation, reducing manual maintenance overhead by ~25%.',
    images: [],
    github: 'https://github.com/haripriyarao26/auto-unit-agent',
    tech: ['TypeScript', 'Jest', 'LangGraph', 'Node.js', 'OS-level Sandboxing'],
    features: [
      'OS-level sandboxing with child process isolation to execute and validate generated tests safely',
      'Self-healing LangGraph state machine workflow: Generate → Execute → Parse Failures → Self-Repair',
      'Deterministic output guardrails ensuring structured AST validation and preventing hallucinated test mocks'
    ],
    metrics: ['25% Maintenance Saved', 'Child Process Isolation', 'Self-Healing Loop'],
    mermaidDiagram: `flowchart LR
  SRC[Source Code] --> GEN[Generate Tests]
  GEN --> SBX[Sandboxed Runner]
  SBX -->|Test Failures| DBG[Self-Healing Debug Loop]
  DBG --> GEN
  SBX -->|All Passed| OK[Validated Jest Suite]`
  },
  {
    id: 'dev-log-architect',
    title: 'Dev-Log Architect: Engineering Case Study Extractor',
    category: 'Developer Tooling & Extension',
    status: 'VS Code & Cursor Extension · VSIX Releases',
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
      'Mermaid',
      'vsce'
    ],
    features: [
      'Automated PR-to-narrative pipeline extracting architecture trade-offs from AST diffs and module context',
      'Zero-credential storage security design utilizing local environment secrets without persistence vulnerabilities',
      'Packaged and distributed as installable VSIX extensions via automated GitHub Releases CI workflows'
    ],
    metrics: ['VSIX Distribution', 'Mermaid Synthesis', 'Zero-Credential Storage'],
    mermaidDiagram: `flowchart LR
  A[Git Diff + Context] --> B[Dev-Log Architect Engine]
  B --> C[LLM Trade-Off Extractor]
  B --> D[Structured Markdown Case Study]
  B --> E[Mermaid Architecture Synthesizer]
  C & D & E --> F[Interview-Ready Case Study Pack]`
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
