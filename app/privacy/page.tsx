// app/privacy-policy/page.jsx
// ─────────────────────────────────────────────────────────
// SEO:  metadata export, JSON-LD structured data, canonical,
//       OG tags, semantic HTML (article, section, nav, header)
// UI:   Tailwind CSS, dark code-editor theme, sticky sidebar,
//       smooth scroll spy, fully accessible
// ─────────────────────────────────────────────────────────

import PrivacyClient from "./PrivacyClient";

// ── SEO Metadata (App Router) ─────────────────────────────
export const metadata = {
  title: "Privacy Policy | CodeTyping — Type Code. Level Up.",
  description:
    "Read CodeTyping's Privacy Policy to understand how we collect, use, and protect your personal data while you sharpen your coding and typing skills.",
  keywords: [
    "CodeTyping privacy policy",
    "typing practice privacy",
    "code typing privacy",
    "WPM tracker data policy",
  ],
  authors: [{ name: "CodeTyping Team", url: "https://codetyping.dev" }],
  creator: "CodeTyping",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  alternates: { canonical: "https://codetyping.dev/privacy-policy" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codetyping.dev/privacy-policy",
    siteName: "CodeTyping",
    title: "Privacy Policy | CodeTyping",
    description:
      "No ads, no data selling — just fast typing. See exactly how CodeTyping handles your data.",
    images: [
      {
        url: "https://codetyping.dev/og-privacy.png",
        width: 1200,
        height: 630,
        alt: "CodeTyping Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CodeTyping",
    description: "How CodeTyping protects your data.",
    images: ["https://codetyping.dev/og-privacy.png"],
    creator: "@codetyping",
  },
};

// ── JSON-LD Structured Data ───────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: "https://codetyping.dev/privacy-policy",
  description:
    "CodeTyping's Privacy Policy explaining data collection, usage, and user rights.",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "CodeTyping",
    url: "https://codetyping.dev",
  },
  publisher: {
    "@type": "Organization",
    name: "CodeTyping",
    url: "https://codetyping.dev",
    logo: {
      "@type": "ImageObject",
      url: "https://codetyping.dev/logo.png",
    },
  },
  dateModified: "2026-05-01",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://codetyping.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: "https://codetyping.dev/privacy-policy",
      },
    ],
  },
};

// ── Page Component (Server Component) ────────────────────
export default function PrivacyPolicyPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Client component handles interactivity */}
      <PrivacyClient />
    </>
  );
}
