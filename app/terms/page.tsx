
import TermsClient from "./TermsClient";

export const metadata = {
  title: "Terms of Service | CodeTyping — Type Code. Level Up.",
  description:
    "Read CodeTyping's Terms of Service. Understand your rights and responsibilities when using our code typing practice platform.",
  keywords: ["CodeTyping terms of service", "typing practice terms", "code typing ToS", "user agreement"],
  authors: [{ name: "CodeTyping Team", url: "https://codetyping.dev" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  alternates: { canonical: "https://codetyping.dev/terms" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codetyping.dev/terms",
    siteName: "CodeTyping",
    title: "Terms of Service | CodeTyping",
    description: "CodeTyping's Terms of Service — know your rights and responsibilities.",
    images: [{ url: "https://codetyping.dev/og-terms.png", width: 1200, height: 630, alt: "CodeTyping Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CodeTyping",
    description: "CodeTyping's Terms of Service.",
    images: ["https://codetyping.dev/og-terms.png"],
    creator: "@codetyping",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: "https://codetyping.dev/terms",
  description: "CodeTyping's Terms of Service explaining user rights, responsibilities, and platform rules.",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", name: "CodeTyping", url: "https://codetyping.dev" },
  publisher: {
    "@type": "Organization",
    name: "CodeTyping",
    url: "https://codetyping.dev",
    logo: { "@type": "ImageObject", url: "https://codetyping.dev/logo.png" },
  },
  dateModified: "2026-05-01",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://codetyping.dev" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://codetyping.dev/terms" },
    ],
  },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsClient />
    </>
  );
}
