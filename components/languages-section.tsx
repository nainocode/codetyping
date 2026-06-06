"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const languages = [
  {
    name: "JavaScript",
    icon: "JS",
    color: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30",
    textColor: "text-yellow-500",
    description: "Modern ES6+ syntax, async/await, and more",
    snippetCount: 150,
  },
  {
    name: "Python",
    icon: "PY",
    color: "from-blue-500/20 to-green-500/20",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-500",
    description: "Clean syntax, list comprehensions, and decorators",
    snippetCount: 120,
  },
  {
    name: "TypeScript",
    icon: "TS",
    color: "from-blue-600/20 to-blue-700/20",
    borderColor: "border-blue-600/30",
    textColor: "text-blue-600",
    description: "Type annotations, interfaces, and generics",
    snippetCount: 100,
  },
  {
    name: "C++",
    icon: "C++",
    color: "from-indigo-500/20 to-indigo-600/20",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-500",
    description: "Templates, pointers, and STL containers",
    snippetCount: 80,
  },
  {
    name: "Java",
    icon: "JV",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-500",
    description: "OOP concepts, streams, and lambdas",
    snippetCount: 90,
  },
  {
    name: "PHP",
    icon: "PHP",
    color: "from-violet-500/20 to-violet-600/20",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-500",
    description: "Modern PHP 8 syntax and frameworks",
    snippetCount: 70,
  },
]

export function LanguagesSection() {
  return (
    <section className="py-24 relative bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4"
          >
            Languages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance"
          >
            Practice in Your{" "}
            <span className="text-primary">Favorite Language</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Choose from 6 popular programming languages with real-world code snippets.
          </motion.p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/practice?lang=${lang.name.toLowerCase()}`}>
                <div className={`group relative glass rounded-xl p-6 hover:${lang.borderColor} border border-transparent transition-all cursor-pointer h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${lang.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${lang.color} flex items-center justify-center border ${lang.borderColor}`}>
                        <span className={`font-mono font-bold ${lang.textColor}`}>{lang.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{lang.name}</h3>
                        <p className="text-muted-foreground text-sm">{lang.snippetCount}+ snippets</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{lang.description}</p>
                    <div className={`inline-flex items-center gap-1 text-sm font-medium ${lang.textColor} group-hover:gap-2 transition-all`}>
                      Start Practice
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/practice">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2">
              Explore All Languages
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
