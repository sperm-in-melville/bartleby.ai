import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bartleby.ai - The AI that prefers not to',
  description: 'The first AI that prefers not to. Refusal-as-a-Service.',
  keywords: ['AI', 'chatbot', 'refusal', 'bartleby'],
  authors: [{ name: 'Bartleby.ai' }],
  openGraph: {
    title: 'Bartleby.ai',
    description: 'The first AI that prefers not to.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}