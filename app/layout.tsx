import type { Metadata } from 'next'
import './globals.css'
import ResourceHints from '@/components/ResourceHints'

export const metadata: Metadata = {
  title: 'Haripriya Rao',
  description: 'Haripriya Rao — Software Engineer (distributed AI, full-stack). Open to SDE and AI opportunities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ResourceHints />
        {children}
      </body>
    </html>
  )
}

