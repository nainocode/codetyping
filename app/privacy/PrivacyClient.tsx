"use client";

// app/privacy/PrivacyClient.tsx

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────
interface SectionItem {
  term: string;
  detail: string;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  content?: string;
  items?: SectionItem[];
  isContact?: boolean;
}

// ─── Data ────────────────────────────────────────────────
const LAST_UPDATED = "May 1, 2026";
const EFFECTIVE_DATE = "January 1, 2025";
const CONTACT_EMAIL = "husnainrazaghulamraza@gmail.com";
const SITE_URL = "https://codetyping.dev";

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "§",
    content: `Welcome to CodeTyping — a platform built to help developers improve their typing speed with real code snippets. We take your privacy seriously. This policy explains what data we collect, why we collect it, and how we keep it safe. By using CodeTyping you agree to the practices described below.`,
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    icon: "§",
    items: [
      { term: "Account Data", detail: "Email address, username, and bcrypt-hashed password when you create an account." },
      { term: "Typing Statistics", detail: "WPM scores, accuracy percentages, session durations, language/snippet preferences, and leaderboard rankings." },
      { term: "Usage Data", detail: "Pages visited, features clicked, timestamps, and error events — used only to improve the product." },
      { term: "Device & Network", detail: "Browser type, OS, screen resolution, and IP address for security and abuse prevention." },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    icon: "§",
    items: [
      { term: "Progress Tracking", detail: "Display your WPM history, accuracy trends, and leaderboard position." },
      { term: "Service Improvement", detail: "Analyse aggregate usage patterns to improve snippets, UI, and performance." },
      { term: "Security", detail: "Detect and block unauthorized access, rate-limit abuse, and enforce account integrity." },
      { term: "Communications", detail: "Send critical service emails (password reset, policy updates). No marketing without explicit consent." },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Local Storage",
    icon: "§",
    content: `We use first-party cookies and localStorage exclusively to:\n\n• Keep you logged in across sessions\n• Remember your preferred theme, language, and editor settings\n• Store temporary test state (in-progress typing session)\n\nWe do not use third-party advertising or tracking cookies. You can clear all stored data at any time through your browser settings or from your account dashboard.`,
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    icon: "§",
    content: `We do not sell, rent, or trade your personal information — ever.\n\nWe may share data in these limited cases:\n\n• Infrastructure providers (hosting, CDN, error monitoring) under strict data-processing agreements\n• Aggregated, anonymised statistics published publicly (e.g. "average WPM for Python snippets") — no individual is identifiable\n• Law enforcement when legally required, after rigorous verification`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: "§",
    content: `Your data is retained only as long as your account is active.\n\n• Active accounts: data retained indefinitely until deletion is requested\n• Deleted accounts: all personal data permanently erased within 30 days\n• Anonymised performance data (no personal identifiers) may be retained for statistical benchmarking`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: "§",
    items: [
      { term: "Access", detail: "Request a full export of all personal data we hold about you." },
      { term: "Correction", detail: "Update or correct any inaccurate personal information." },
      { term: "Deletion", detail: "Request complete deletion of your account and all associated data." },
      { term: "Portability", detail: "Download your typing history and stats in JSON format from your account settings." },
      { term: "Objection", detail: "Object to processing where we rely on legitimate interest as the legal basis." },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: "§",
    content: `We implement industry-standard security measures:\n\n• TLS 1.3 encryption for all data in transit\n• bcrypt password hashing (no plaintext passwords stored)\n• Regular security audits and dependency updates\n• Strict access controls — only essential team members can access user data\n\nNo system is 100% secure. Please use a strong, unique password and enable two-factor authentication if available.`,
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    icon: "§",
    content: `CodeTyping may integrate with:\n\n• Vercel / hosting providers (infrastructure only)\n• Sentry or similar (error tracking — anonymised)\n• Analytics tools with IP anonymisation enabled\n\nThese services have their own privacy policies. We select partners who meet high privacy standards and sign data-processing agreements with them.`,
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    icon: "§",
    content: `CodeTyping is not directed at children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us immediately at ${CONTACT_EMAIL} and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    icon: "§",
    content: `We may update this policy periodically. When we do:\n\n• The "Last Updated" date at the top of this page will change\n• Significant changes will be notified via email or an in-app banner\n• Continued use of CodeTyping after changes constitutes acceptance of the updated policy`,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: "§",
    content: `For any privacy questions, data requests, or concerns.\n\nWe respond to all privacy inquiries within 5 business days.`,
    isContact: true,
  },
];

// ─── Component ────────────────────────────────────────────
export default function PrivacyClient() {
  const [activeId, setActiveId] = useState<string>("introduction");
  const [scrolled, setScrolled] = useState<boolean>(false);

  // ✅ Fix 1: typed as IntersectionObserver | null
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Navbar scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    // ✅ Fix 2: assign to local variable first, avoids null ref issues
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    observerRef.current = observer;

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ✅ Fix 3: use local variable in cleanup — no null check needed
    return () => observer.disconnect();
  }, []);

  // ✅ Fix 4: typed id parameter
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#090910] text-slate-200 font-sans">

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-emerald-400 focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? "bg-[#090910]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          aria-label="CodeTyping — go to homepage"
          className="flex items-center gap-1 font-mono text-[15px] font-bold tracking-tight"
        >
          <span className="text-slate-500">{"{"}</span>
          <span className="text-emerald-400">Code</span>
          <span className="text-sky-400">Typing</span>
          <span className="text-slate-500">{"}"}</span>
        </Link>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-emerald-400/80" aria-current="page">Privacy Policy</span>
            </li>
          </ol>
        </nav>
      </header>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0">

        {/* Sidebar */}
        <nav
          aria-label="Page sections"
          className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-6 border-r border-white/5"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4 px-3">
            On this page
          </p>
          <ul role="list" className="space-y-0.5">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  aria-current={activeId === s.id ? "location" : undefined}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                    activeId === s.id
                      ? "bg-emerald-400/10 text-emerald-400 font-medium border border-emerald-400/20"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* ✅ Fix 5: shrink-0 instead of flex-shrink-0 (Tailwind v4) */}
                  <span className="font-mono text-[10px] opacity-50 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main id="main-content" className="py-12 lg:py-16 lg:pl-12" tabIndex={-1}>

          {/* Hero */}
          <div className="mb-14">
            <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-emerald-400" aria-hidden="true" />
              Legal Document
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 leading-tight">
              Privacy
              <br />
              {/* ✅ Fix 6: bg-linear-to-r instead of bg-gradient-to-r (Tailwind v4) */}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-sky-400">
                Policy
              </span>
            </h1>

            <dl className="flex flex-wrap gap-3">
              {[
                { label: "Effective", value: EFFECTIVE_DATE },
                { label: "Updated", value: LAST_UPDATED },
                { label: "Version", value: "1.2" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1.5">
                  {/* ✅ Fix 7: shrink-0 instead of flex-shrink-0 */}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                  <dt className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{label}:</dt>
                  <dd className="font-mono text-[11px] text-slate-300">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sections */}
          <article aria-label="Privacy Policy content">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`heading-${s.id}`}
                className="mb-10 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  {/* ✅ Fix 8: shrink-0 */}
                  <span className="font-mono text-[10px] text-emerald-400/50 tabular-nums shrink-0" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`heading-${s.id}`} className="text-lg font-semibold tracking-tight text-slate-100">
                    {s.title}
                  </h2>
                </div>

                <div className="bg-[#0f0f1a] border border-white/6 rounded-xl overflow-hidden hover:border-white/10 transition-colors duration-200">

                  {/* Text content */}
                  {s.content && !s.isContact && (
                    <p className="p-5 sm:p-6 text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                      {s.content}
                    </p>
                  )}

                  {/* Contact section */}
                  {s.isContact && (
                    <div className="p-5 sm:p-6">
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        For any privacy questions, data requests, or concerns:
                      </p>
                      <dl className="space-y-2">
                        <div className="flex items-center gap-3">
                          <dt className="font-mono text-xs text-slate-500 w-16">Email</dt>
                          <dd>
                            <a
                              href={`mailto:${CONTACT_EMAIL}`}
                              className="font-mono text-sm text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors"
                            >
                              {CONTACT_EMAIL}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center gap-3">
                          <dt className="font-mono text-xs text-slate-500 w-16">Website</dt>
                          <dd>
                            <a
                              href={SITE_URL}
                              className="font-mono text-sm text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors"
                            >
                              {SITE_URL}
                            </a>
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-4 text-xs text-slate-600 font-mono">
                        Response time: within 5 business days
                      </p>
                    </div>
                  )}

                  {/* List items */}
                  {s.items && (
                    <dl className="divide-y divide-white/4">
                      {s.items.map((item) => (
                        <div
                          key={item.term}
                          className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 p-4 sm:p-5 hover:bg-white/5 transition-colors"
                        >
                          {/* ✅ Fix 9: shrink-0 */}
                          <dt className="font-mono text-xs font-medium text-sky-400 pt-0.5 shrink-0">
                            {item.term}
                          </dt>
                          <dd className="text-sm text-slate-400 leading-relaxed">
                            {item.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </section>
            ))}
          </article>

          {/* Footer */}
          <footer
            aria-label="Page footer"
            className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="font-mono text-xs text-slate-500">
                © {new Date().getFullYear()}{" "}
                <Link href="/" className="text-emerald-400 hover:underline">CodeTyping</Link>
                . All rights reserved.
              </p>
              <p className="font-mono text-[11px] text-slate-700 mt-1">Last updated: {LAST_UPDATED}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/terms" className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2">
                Terms of Service
              </Link>
              <Link href="/cookies" className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2">
                Cookie Policy
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
