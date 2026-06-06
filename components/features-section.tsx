"use client"

import { motion } from "framer-motion"
import { 
  Zap, 
  Code2, 
  BarChart3, 
  Trophy, 
  Clock, 
  Sparkles,
  Languages,
  Target
} from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Real Code Snippets",
    description: "Practice with actual programming code, not random text. Improve muscle memory for coding syntax.",
  },
  {
    icon: Languages,
    title: "6 Programming Languages",
    description: "JavaScript, Python, C++, PHP, Java, and TypeScript. Master typing in your favorite language.",
  },
  {
    icon: Zap,
    title: "Real-Time Feedback",
    description: "Instant visual feedback on your typing. See correct and incorrect characters highlighted live.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track your WPM, accuracy, and progress over time with beautiful charts and insights.",
  },
  {
    icon: Trophy,
    title: "Global Leaderboard",
    description: "Compete with developers worldwide. Climb the ranks and show off your typing skills.",
  },
  {
    icon: Clock,
    title: "Multiple Game Modes",
    description: "Beginner, Intermediate, Pro, Time Challenge, and Daily Challenge modes to keep you engaged.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Practice",
    description: "Smart algorithm adapts to your skill level and suggests personalized practice sessions.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Set goals, track streaks, and celebrate achievements as you improve your typing speed.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance"
          >
            Everything You Need to{" "}
            <span className="text-primary">Code Faster</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty"
          >
            Comprehensive tools and features designed to help you improve your coding speed and accuracy.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative glass rounded-xl p-6 h-full hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
