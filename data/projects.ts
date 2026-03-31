export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: ProjectImage[];
  github?: string;
  demo?: string;
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
    ]
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
    ]
  },
  {
    id: 'prod-ready-guardrail',
    title: 'prod-ready-guardrail',
    description:
      'Production-oriented guardrails and patterns for safer LLM and agent workflows—validation, policy checks, and defensive handling before responses reach users.',
    images: [],
    github: 'https://github.com/haripriyarao26/prod-ready-guardrail',
    tech: ['Python', 'LLM safety', 'Guardrails', 'Production patterns'],
    features: [
      'Structured checks around model inputs and outputs',
      'Templates for shipping guardrails in real services',
      'Focused, dependency-light building blocks'
    ]
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
    ]
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
    ]
  },
  {
    id: 'moodbite',
    title: 'MoodBite',
    description: 'A mood-driven food recommendation agent powered by AI',
    images: [],
    github: 'https://github.com/haripriyarao26/MoodBite',
    demo: 'https://haripriyarao26.github.io/MoodBite/',
    tech: ['Next.js 14', 'TypeScript', 'Ant Design', 'Hugging Face AI', 'GitHub Pages'],
    features: ['Mood Analysis', 'Time-Aware', 'Energy Level', 'Dietary Preferences', 'Memory']
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
