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
  title: 'Haripriya Rao — Software Engineer',
  description: 'Haripriya Rao — Software Engineer (distributed AI, full-stack, H1-B cap-exempt). Open to SDE and AI opportunities.',
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

