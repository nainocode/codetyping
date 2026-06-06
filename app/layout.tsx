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
  metadataBase: new URL('https://codetyping-xvl3.vercel.app'),

  title: {
    default: 'CodeTyping AI - Improve Coding Typing Speed | Practice JavaScript, Python & More',
    template: '%s | CodeTyping AI',
  },

  description:
    'CodeTyping AI helps developers improve coding typing speed with AI-powered practice. Type real code snippets in JavaScript, Python, TypeScript, C++, Java, and PHP. Track WPM, accuracy, and compete on a global leaderboard.',

  keywords: [
    'coding typing practice',
    'typing speed for programmers',
    'code typing test',
    'improve coding speed',
    'programming typing practice',
    'javascript typing practice',
    'python typing practice',
    'typescript typing test',
    'WPM for developers',
    'coding speed test',
    'developer typing practice',
    'AI typing practice',
    'coding keyboard practice',
    'learn to type code faster',
    'typing test for coders',
  ],

  authors: [{ name: 'CodeTyping AI', url: 'https://codetyping-xvl3.vercel.app' }],
  creator: 'CodeTyping AI',
  publisher: 'CodeTyping AI',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codetyping-xvl3.vercel.app',
    siteName: 'CodeTyping AI',
    title: 'CodeTyping AI - Master Coding Speed Like a Pro',
    description:
      'Improve your coding typing speed with AI-powered practice. Real code snippets in JavaScript, Python, TypeScript, C++, Java, and PHP. Join 50K+ developers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CodeTyping AI - Master Coding Speed Like a Pro',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@CodeTypingAI',
    creator: '@CodeTypingAI',
    title: 'CodeTyping AI - Master Coding Speed Like a Pro',
    description:
      'Practice typing real code snippets in JavaScript, Python, TypeScript & more. Track your WPM and compete globally.',
    images: ['/og-image.png'],
  },

  alternates: {
    canonical: 'https://codetyping-xvl3.vercel.app',
  },

  category: 'technology',
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href="https://codetyping-xvl3.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'CodeTyping AI',
              url: 'https://codetyping-xvl3.vercel.app',
              description:
                'AI-powered coding typing practice platform. Improve your coding speed with real JavaScript, Python, TypeScript, C++, Java, and PHP snippets.',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1200',
              },
              featureList: [
                'Real code snippets in 6 programming languages',
                'AI-powered adaptive practice',
                'WPM and accuracy tracking',
                'Global leaderboard',
                'Multiple game modes',
                'Progress analytics',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-center" richColors closeButton />
        <Analytics />
      </body>
    </html>
  )
}
