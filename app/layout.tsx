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
  metadataBase: new URL('https://haripriyarao26.github.io'),
  title: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
  description:
    'Full-stack and founding engineer building products end-to-end: from customer conversations and architecture to full-stack code and production AI.',
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
  ],
  authors: [{ name: 'Haripriya Rao', url: 'https://haripriyarao26.github.io/portfolio' }],
  openGraph: {
    title: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
    description:
      'I don’t just build AI. I build the whole product around the problem: customer conversations, architecture, full-stack code, production support, with AI where it helps.',
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
    title: 'Haripriya Rao — Founding & Forward-Deployed Engineer',
    description:
      'I don’t just build AI. I build the whole product around the problem: customer conversations, architecture, full-stack code, production support, with AI where it helps.',
    images: ['/linkedin-banner.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ResourceHints />
        {children}
      </body>
    </html>
  )
}
