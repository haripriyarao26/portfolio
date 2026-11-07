import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'
import ResourceHints from '@/components/ResourceHints'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://haripriyarao26.github.io/portfolio'),
  title: {
    default: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
    template: '%s | Haripriya Rao',
  },
  description:
    'Full-stack and founding engineer building products end-to-end: from customer conversations and architecture to full-stack code and production AI.',
  alternates: {
    canonical: 'https://haripriyarao26.github.io/portfolio',
  },
  icons: {
    icon: [
      {
        url: 'https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/icon.png',
        type: 'image/png',
      },
    ],
    shortcut: ['https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/icon.png'],
    apple: [
      {
        url: 'https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/icon.png',
      },
    ],
  },
  keywords: [
    'Haripriya Rao',
    'Founding Engineer',
    'Forward-Deployed Engineer',
    'Full-Stack Engineer',
    'AI Engineer',
    'LangGraph',
    'Next.js',
    'Python',
    'TypeScript',
    'ClickHouse',
    'Redis',
    'LLM Observability',
    'USC Computer Science',
  ],
  authors: [{ name: 'Haripriya Rao', url: 'https://haripriyarao26.github.io/portfolio' }],
  creator: 'Haripriya Rao',
  publisher: 'Haripriya Rao',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
    description:
      'I don’t just build AI. I build the whole product around the problem: customer conversations, architecture, full-stack code, production support, with AI where it helps.',
    url: 'https://haripriyarao26.github.io/portfolio',
    siteName: 'Haripriya Rao Portfolio',
    images: [
      {
        url: 'https://haripriyarao26.github.io/portfolio/linkedin-banner.png',
        width: 1200,
        height: 630,
        alt: 'Haripriya Rao — Founding & Forward-Deployed Engineer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
    description:
      'I don’t just build AI. I build the whole product around the problem: customer conversations, architecture, full-stack code, production support, with AI where it helps.',
    images: ['https://haripriyarao26.github.io/portfolio/linkedin-banner.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://haripriyarao26.github.io/portfolio/#person',
      name: 'Haripriya Rao',
      url: 'https://haripriyarao26.github.io/portfolio',
      image: 'https://vxisxudnyfyksbaktshp.supabase.co/storage/v1/object/public/portfolio/icon.png',
      jobTitle: 'Founding & Forward-Deployed Engineer',
      description:
        'Full-stack and founding engineer building products end-to-end: customer conversations, architecture, full-stack code, production support, and AI.',
      knowsAbout: [
        'Full-Stack Software Engineering',
        'Artificial Intelligence',
        'AI Agents',
        'Agentic Workflows',
        'LangGraph',
        'Python',
        'TypeScript',
        'Next.js',
        'React',
        'ClickHouse',
        'PostgreSQL',
        'Redis',
        'LLM Observability'
      ],
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'University of Southern California',
          sameAs: 'https://www.usc.edu'
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Visvesvaraya Technological University'
        }
      ],
      sameAs: [
        'https://github.com/haripriyarao26',
        'https://linkedin.com/in/haripriya-rao',
        'https://github.com/google-gemini/cookbook/pull/1088',
        'https://github.com/openai/openai-cookbook/pull/2568',
        'https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile'
      ],
      worksFor: [
        {
          '@type': 'Organization',
          name: 'JPMorgan Chase & Co.'
        },
        {
          '@type': 'Organization',
          name: 'Onetera Technologies'
        }
      ]
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://haripriyarao26.github.io/portfolio/#webpage',
      url: 'https://haripriyarao26.github.io/portfolio',
      name: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://haripriyarao26.github.io/portfolio/#website',
        url: 'https://haripriyarao26.github.io/portfolio',
        name: 'Haripriya Rao Portfolio'
      },
      mainEntity: {
        '@id': 'https://haripriyarao26.github.io/portfolio/#person'
      }
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ResourceHints />
        {children}
      </body>
    </html>
  )
}
