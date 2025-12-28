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
    id: 'moodbite',
    title: 'MoodBite',
    description: 'A mood-driven food recommendation agent powered by AI',
    images: [
      {
        src: '/projects/image.png',
        alt: 'MoodBite application interface showing mood-driven food recommendations',
        caption: 'Main interface with mood input and food recommendations'
      },
      {
        src: '/projects/image2.png',
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
