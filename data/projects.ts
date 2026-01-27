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
