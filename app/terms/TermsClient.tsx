"use client";


import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────
interface SectionItem {
  term: string;
  detail: string;
}

interface Section {
  id: string;
  title: string;
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
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By accessing or using CodeTyping, you confirm that you are at least 13 years old, have read and understood these Terms of Service, and agree to be bound by them.\n\nIf you are using CodeTyping on behalf of an organization, you represent that you have authority to bind that organization to these terms.`,
  },
  {
    id: "description",
    title: "Description of Service",
    content: `CodeTyping is a web-based platform that helps developers and programmers improve their typing speed and accuracy using real code snippets across multiple programming languages.\n\nWe offer:\n• Free tier with access to core typing practice features\n• Account-based progress tracking and leaderboards\n• Statistics, WPM history, and accuracy analytics\n• Language-specific snippet libraries`,
  },
  {
    id: "accounts",
    title: "User Accounts",
    items: [
      { term: "Registration", detail: "You must provide accurate and complete information when creating an account. You are responsible for keeping your credentials secure." },
      { term: "One Account", detail: "Each person may maintain only one free account. Creating multiple accounts to abuse leaderboard rankings is prohibited." },
      { term: "Account Security", detail: "You are responsible for all activity that occurs under your account. Notify us immediately at " + CONTACT_EMAIL + " if you suspect unauthorized access." },
      { term: "Termination", detail: "We reserve the right to suspend or terminate accounts that violate these Terms, with or without prior notice." },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: `You agree NOT to:\n\n• Attempt to reverse-engineer, scrape, or copy our snippet library for commercial use\n• Use automated bots or scripts to artificially inflate WPM scores or leaderboard rankings\n• Harass, abuse, or harm other users in any community features\n• Upload or transmit malicious code, viruses, or harmful content\n• Use CodeTyping for any unlawful purpose or in violation of any regulations\n• Attempt to gain unauthorized access to our systems or other users' accounts`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    items: [
      { term: "Our Content", detail: "The CodeTyping platform, design, logo, and original content are owned by CodeTyping and protected by copyright and trademark laws." },
      { term: "Code Snippets", detail: "Snippets sourced from open-source projects retain their original licenses. We do not claim ownership of third-party code." },
      { term: "Your Data", detail: "You retain ownership of any personal data you provide. By using CodeTyping, you grant us a limited license to process your data to provide the service." },
      { term: "Feedback", detail: "Any feedback or suggestions you provide may be used by us to improve the service without obligation or compensation to you." },
    ],
  },
  {
    id: "leaderboards",
    title: "Leaderboards & Rankings",
    content: `Leaderboard participation is optional. By opting in, you agree that:\n\n• Your username and WPM scores will be publicly visible\n• We may feature top performers in promotional content (with notice)\n• Rankings may be reset periodically at our discretion\n• Cheating, scripting, or score manipulation will result in permanent disqualification and account termination`,
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: `CodeTyping is provided "as is" and "as available" without warranties of any kind, either express or implied.\n\nWe do not warrant that:\n• The service will be uninterrupted or error-free\n• Results from using the service will meet your specific requirements\n• Any errors in the service will be corrected on a specific timeline\n\nYour use of CodeTyping is at your sole risk.`,
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by law, CodeTyping and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.\n\nOur total liability for any claim related to the service shall not exceed the amount you paid us in the 12 months preceding the claim (or $10 USD if you are a free user).`,
  },
  {
    id: "termination",
    title: "Termination",
    content: `You may delete your account at any time from your account settings. Upon deletion, your personal data will be removed within 30 days per our Privacy Policy.\n\nWe may suspend or terminate your access to CodeTyping at any time if we believe you have violated these Terms. We will make reasonable efforts to notify you unless doing so would cause harm or is prohibited by law.`,
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: `We may update these Terms of Service periodically. When we make significant changes:\n\n• We will update the "Last Updated" date on this page\n• We will notify registered users via email at least 14 days before changes take effect\n• Continued use of CodeTyping after the effective date constitutes acceptance of the new Terms`,
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: `These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of CodeTyping shall be resolved through good-faith negotiation first, and if unresolved, through binding arbitration.`,
  },
  {
    id: "contact",
    title: "Contact",
    content: `Questions about these Terms? We're happy to clarify.`,
    isContact: true,
  },
];

// ─── Component ───────────────────────────────────────────
export default function TermsClient() {
  const [activeId, setActiveId] = useState<string>("acceptance");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
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
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#090910] text-slate-200 font-sans">

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-400 focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm"
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

        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-amber-400/80" aria-current="page">Terms of Service</span>
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
                      ? "bg-amber-400/10 text-amber-400 font-medium border border-amber-400/20"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-50 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main */}
        <main id="main-content" className="py-12 lg:py-16 lg:pl-12" tabIndex={-1}>

          {/* Hero */}
          <div className="mb-14">
            <p className="font-mono text-xs text-amber-400 tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-amber-400" aria-hidden="true" />
              Legal Document
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 leading-tight">
              Terms of Service
            </h1>

            {/* Notice banner */}
            <div className="mb-6 flex items-start gap-3 bg-amber-400/5 border border-amber-400/15 rounded-xl px-4 py-3">
              <span className="text-amber-400 text-sm mt-0.5 shrink-0" aria-hidden="true">⚠</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Please read these Terms carefully before using CodeTyping. By using our service, you agree to be bound by these Terms.
              </p>
            </div>

            <dl className="flex flex-wrap gap-3">
              {[
                { label: "Effective", value: EFFECTIVE_DATE },
                { label: "Updated", value: LAST_UPDATED },
                { label: "Version", value: "1.2" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
                  <dt className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{label}:</dt>
                  <dd className="font-mono text-[11px] text-slate-300">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sections */}
          <article aria-label="Terms of Service content">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`heading-${s.id}`}
                className="mb-10 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-amber-400/50 tabular-nums shrink-0" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`heading-${s.id}`} className="text-lg font-semibold tracking-tight text-slate-100">
                    {s.title}
                  </h2>
                </div>

                <div className="bg-[#0f0f1a] border border-white/6 rounded-xl overflow-hidden hover:border-white/10 transition-colors duration-200">

                  {/* Text */}
                  {s.content && !s.isContact && (
                    <p className="p-5 sm:p-6 text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                      {s.content}
                    </p>
                  )}

                  {/* Contact */}
                  {s.isContact && (
                    <div className="p-5 sm:p-6">
                      <p className="text-sm text-slate-400 leading-relaxed mb-5">
                        Questions about these Terms? We&apos;re happy to clarify.
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
                      <p className="mt-4 text-xs text-slate-600 font-mono">Response time: within 5 business days</p>
                    </div>
                  )}

                  {/* List */}
                  {s.items && (
                    <dl className="divide-y divide-white/4">
                      {s.items.map((item) => (
                        <div
                          key={item.term}
                          className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 p-4 sm:p-5 hover:bg-white/5 transition-colors"
                        >
                          <dt className="font-mono text-xs font-medium text-amber-400 pt-0.5 shrink-0">
                            {item.term}
                          </dt>
                          <dd className="text-sm text-slate-400 leading-relaxed">{item.detail}</dd>
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
              <Link href="/privacy" className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2">
                Privacy Policy
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
