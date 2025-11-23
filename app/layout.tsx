import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}

