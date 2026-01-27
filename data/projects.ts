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
    description: 'Contributed to the official Google Gemini repository by developing a reusable LLM Observability utility with real-time USD cost tracking and API health monitoring for Gemini 2.0/3.0 models.',
    images: [],
    github: 'https://github.com/google-gemini/cookbook/pull/1088',
    tech: ['Python', 'Google Gemini API', 'LLM Observability', 'Type Hints', 'CI/CD'],
    features: [
      'Real-time USD Cost Tracking',
      'API Health Monitoring',
      'Rate Limit Error Handling (429 Resource Exhausted)',
      'Token-to-Cost Normalization',
      'Google Engineering Standards Compliance'
    ]
  },
  {
    id: 'auto-unit-agent',
    title: 'Auto-Unit-Agent: Autonomous Jest Test Generation',
    description: 'Built an automated unit-test generation agent for TypeScript that synthesizes Jest tests from source code, executes them, and iteratively debugs failures to converge on passing suites.',
    images: [],
    github: 'https://github.com/haripriyarao26/auto-unit-agent',
    tech: ['TypeScript', 'Jest', 'LangGraph', 'Node.js', 'Sandboxing'],
    features: [
      'LangGraph workflow: generate → execute → debug → retry',
      'Sandboxed test execution in isolated temp directories',
      'Guardrails for model outputs (parsing + validation)'
    ]
  },
  {
    id: 'moodbite',
    title: 'MoodBite',
    description: 'A mood-driven food recommendation agent powered by AI',
    images: [
      {
        src: 'https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/moodbite/image.png',
        alt: 'MoodBite application interface showing mood-driven food recommendations',
        caption: 'Main interface with mood input and food recommendations'
      },
      {
        src: 'https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/moodbite/image2.png',
        alt: 'MoodBite form filled with example inputs',
        caption: 'Example form with filled inputs showing time, energy level, and dietary preferences'
      }
    ],
    github: 'https://github.com/haripriyarao26/MoodBite',
    demo: 'https://haripriyarao26.github.io/MoodBite/',
    tech: ['Next.js 14', 'TypeScript', 'Ant Design', 'Hugging Face AI', 'GitHub Pages'],
    features: ['Mood Analysis', 'Time-Aware', 'Energy Level', 'Dietary Preferences', 'Memory']
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
