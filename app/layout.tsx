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

const SITE_URL = 'https://codetyping-xvl3.vercel.app'
const SITE_NAME = 'CodeTyping AI'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'CodeTyping AI - Code Typing Test & Practice for Developers',
    template: '%s | CodeTyping AI',
  },

  description:
    'Practice real code snippets in JavaScript, Python, TypeScript, C++, Java & PHP. Track WPM & accuracy, climb the global leaderboard. Start typing free now.',

  applicationName: SITE_NAME,

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
    'monkeytype for programmers',
    'C++ typing practice',
    'Java typing practice',
    'PHP typing test',
    'typing accuracy tracker',
    'coding leaderboard',
  ],

  authors: [{ name: 'CodeTyping AI', url: SITE_URL }],
  creator: 'CodeTyping AI',
  publisher: 'CodeTyping AI',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',

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
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // NOTE: replace these placeholder values with your real verification codes
  // from Google Search Console / Bing Webmaster Tools once available.
  verification: {
    google: 'google-site-verification-code-here',
    other: {
      'msvalidate.01': 'bing-site-verification-code-here',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'CodeTyping AI - Master Coding Speed Like a Pro',
    description:
      'Improve your coding typing speed with AI-powered practice. Real code snippets in JavaScript, Python, TypeScript, C++, Java & PHP. Join 50K+ developers free.',
    images: [
      {
        url: '/og-image.png',
        secureUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'CodeTyping AI - Master Coding Speed Like a Pro',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@CodeTypingAI',
    creator: '@CodeTypingAI',
    title: 'CodeTyping AI - Master Coding Speed Like a Pro',
    description:
      'Practice typing real code in JavaScript, Python, TypeScript & more. Track your WPM, accuracy & rank on the global leaderboard. Free to start.',
    images: ['/og-image.png'],
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
    },
  },

  category: 'technology',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/manifest.json',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Structured data: WebApplication (core app info)
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CodeTyping AI',
    url: SITE_URL,
    description:
      'Practice real code snippets in JavaScript, Python, TypeScript, C++, Java & PHP. Track WPM & accuracy, climb the global leaderboard. Start typing free now.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Real code snippets in 6 programming languages',
      'AI-powered adaptive practice',
      'WPM and accuracy tracking',
      'Global leaderboard',
      'Multiple game modes',
      'Progress analytics',
    ],
  }

  // Structured data: Organization (brand identity, social profiles)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    sameAs: [
      'https://twitter.com/CodeTypingAI',
      // add other real social profile URLs here, e.g.:
      // 'https://github.com/CodeTypingAI',
      // 'https://www.linkedin.com/company/codetypingai',
    ],
  }

  // Structured data: WebSite (enables sitelinks search box in Google)
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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

