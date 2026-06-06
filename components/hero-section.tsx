"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Terminal } from "lucide-react"

const codeLines = [
  { content: "function ", keyword: true },
  { content: "quickSort", function: true },
  { content: "(arr) {", normal: true },
  { content: "  if ", keyword: true },
  { content: "(arr.length <= ", normal: true },
  { content: "1", number: true },
  { content: ") ", keyword: true },
  { content: "return ", keyword: true },
  { content: "arr;", normal: true },
  { content: "  const ", keyword: true },
  { content: "pivot = arr[", normal: true },
  { content: "0", number: true },
  { content: "];", normal: true },
  { content: "  const ", keyword: true },
  { content: "left = arr.", normal: true },
  { content: "filter", function: true },
  { content: "(x => x < pivot);", normal: true },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10 font-mono text-sm"
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [-100, -500],
              x: Math.random() * 100 - 50
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: "100%",
            }}
          >
            {`{ code: ${i} }`}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Typing Practice
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            Master Coding Speed{" "}
            <span className="text-primary glow-text">Like a Pro</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Improve your coding typing speed with real programming snippets. 
            Practice in JavaScript, Python, C++, PHP, Java, and TypeScript.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/practice">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2 h-12 px-8 text-base">
                Start Practice
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-border hover:bg-secondary">
                <Terminal className="w-5 h-5" />
                View Leaderboard
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "50K+", label: "Active Users" },
              { value: "1M+", label: "Tests Completed" },
              { value: "6", label: "Languages" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="glass rounded-xl p-6 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-2 text-muted-foreground text-sm font-mono">quicksort.js</span>
            </div>

            {/* Code Content */}
            <div className="font-mono text-sm sm:text-base leading-relaxed">
              <div className="flex">
                <span className="text-muted-foreground w-8 select-none">1</span>
                <span>
                  <span className="syntax-keyword">function </span>
                  <span className="syntax-function">quickSort</span>
                  <span className="text-foreground">(arr) {"{"}</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-muted-foreground w-8 select-none">2</span>
                <span>
                  <span className="text-foreground">{"  "}</span>
                  <span className="syntax-keyword">if </span>
                  <span className="text-foreground">(arr.length {"<="} </span>
                  <span className="syntax-number">1</span>
                  <span className="text-foreground">) </span>
                  <span className="syntax-keyword">return </span>
                  <span className="text-foreground">arr;</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-muted-foreground w-8 select-none">3</span>
                <span>
                  <span className="text-foreground">{"  "}</span>
                  <span className="syntax-keyword">const </span>
                  <span className="syntax-variable">pivot</span>
                  <span className="text-foreground"> = arr[</span>
                  <span className="syntax-number">0</span>
                  <span className="text-foreground">];</span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground w-8 select-none">4</span>
                <span className="flex items-center">
                  <span className="text-foreground">{"  "}</span>
                  <span className="syntax-keyword">const </span>
                  <span className="syntax-variable">left</span>
                  <span className="text-foreground"> = arr.</span>
                  <span className="syntax-function">filter</span>
                  <span className="text-foreground">(</span>
                  <motion.span
                    className="inline-block w-0.5 h-5 bg-primary cursor-blink"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
