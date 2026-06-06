import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import AuthProvider from './AuthProvider'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'CodeTyping AI - Master Coding Speed Like a Pro',
  description: 'Improve your coding typing speed with AI-powered practice. Real code snippets in JavaScript, Python, C++, PHP, Java, and TypeScript.',
  keywords: ['coding', 'typing', 'practice', 'programming', 'speed', 'wpm', 'developer', 'javascript', 'python'],
  authors: [{ name: 'CodeTyping AI' }],
  openGraph: {
    title: 'CodeTyping AI - Master Coding Speed Like a Pro',
    description: 'Improve your coding typing speed with AI-powered practice sessions',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
         <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-center" richColors closeButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
