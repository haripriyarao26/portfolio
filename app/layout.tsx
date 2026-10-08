import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Syne } from 'next/font/google'
import './globals.css'
import ResourceHints from '@/components/ResourceHints'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://haripriyarao26.github.io'),
  title: 'Haripriya Rao — Applied AI & Founding Engineer',
  description: 'Applied AI and Full-Stack Founding Engineer specializing in multi-agent orchestration (LangGraph, Claude SDK, Anthropic API, MCP), token optimization (96% cost cut), and production systems at 99.98% uptime.',
  keywords: [
    'Haripriya Rao',
    'Applied AI Engineer',
    'LangGraph',
    'Multi-Agent Systems',
    'Claude Certified Architect',
    'CCA-F',
    'Agentic AI',
    'Founding Engineer',
    'USA AI Engineer'
  ],
  authors: [{ name: 'Haripriya Rao', url: 'https://haripriyarao26.github.io/portfolio' }],
  openGraph: {
    title: 'Haripriya Rao — Applied AI & Founding Engineer',
    description: 'I cut LLM inference costs 96% and orchestration latency 40% in production agent systems. Claude Certified Architect (CCA-F), AWS Certified AI Practitioner.',
    url: 'https://haripriyarao26.github.io/portfolio',
    siteName: 'Haripriya Rao Portfolio',
    images: [
      {
        url: '/linkedin-banner.png',
        width: 1200,
        height: 630,
        alt: 'Haripriya Rao — Applied AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haripriya Rao — Applied AI & Founding Engineer',
    description: 'Applied AI Engineer specializing in multi-agent orchestration, token optimization, and high-uptime production systems.',
    images: ['/linkedin-banner.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ResourceHints />
        {children}
      </body>
    </html>
  )
}
