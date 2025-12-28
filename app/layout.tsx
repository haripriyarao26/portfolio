import type { Metadata } from 'next'
import './globals.css'
import ResourceHints from '@/components/ResourceHints'

export const metadata: Metadata = {
  title: 'Haripriya Rao - Portfolio',
  description: 'Interactive portfolio of Haripriya Rao - Lead Software Engineer',
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

