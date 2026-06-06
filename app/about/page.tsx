"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Zap,
  Code2,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "1M+", label: "Tests Completed" },
  { value: "6", label: "Languages" },
  { value: "99.9%", label: "Uptime" },
]

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former Google engineer with a passion for developer tools.",
    avatar: "AC",
  },
  {
    name: "Sarah Miller",
    role: "Head of Product",
    bio: "Product leader with 10+ years in EdTech.",
    avatar: "SM",
  },
  {
    name: "John Doe",
    role: "Lead Developer",
    bio: "Full-stack developer and typing speed champion.",
    avatar: "JD",
  },
  {
    name: "Emily Wilson",
    role: "UX Designer",
    bio: "Creating beautiful and intuitive user experiences.",
    avatar: "EW",
  },
]

const values = [
  {
    icon: Target,
    title: "Focus on Results",
    description: "We measure success by how much faster you can code, not by vanity metrics.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Our community of developers drives everything we build.",
  },
  {
    icon: Sparkles,
    title: "Continuous Innovation",
    description: "We constantly improve our platform with cutting-edge technology.",
  },
  {
    icon: Code2,
    title: "Developer Experience",
    description: "Every feature is designed with developers in mind.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              About CodeTyping AI
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Helping Developers{" "}
              <span className="text-primary glow-text">Code Faster</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              We believe that typing speed is a superpower for developers. 
              Our mission is to help every developer master their keyboard 
              and become more productive.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="glass rounded-xl p-8 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CodeTyping AI was born from a simple observation: the best developers 
                  we knew could type code as fast as they could think. They spent less 
                  time hunting for keys and more time solving problems.
                </p>
                <p>
                  We started in 2023 with a mission to help every developer unlock their 
                  full potential. Traditional typing tests use random words or sentences, 
                  but coding requires a different muscle memory – special characters, 
                  camelCase, snake_case, and programming syntax.
                </p>
                <p>
                  Today, CodeTyping AI serves over 50,000 developers worldwide, helping 
                  them improve their coding speed by an average of 35% within the first month.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="glass rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="glass rounded-xl p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{member.avatar}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="glass rounded-2xl p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Code Faster?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of developers who have improved their coding speed with CodeTyping AI.
              </p>
              <Link href="/practice">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2 h-12 px-8">
                  Start Practicing Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
