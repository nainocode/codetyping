"use client"

import { motion } from "framer-motion"
import { TypingStats } from "@/hooks/use-typing-game"
import { Gauge, Target, AlertCircle, Clock, Keyboard } from "lucide-react"

interface StatsDisplayProps {
  stats: TypingStats
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const statItems = [
    {
      icon: Gauge,
      label: "WPM",
      value: stats.wpm.toString(),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${stats.accuracy}%`,
      color: stats.accuracy >= 95 ? "text-primary" : stats.accuracy >= 80 ? "text-warning" : "text-destructive",
      bgColor: stats.accuracy >= 95 ? "bg-primary/10" : stats.accuracy >= 80 ? "bg-warning/10" : "bg-destructive/10",
    },
    {
      icon: AlertCircle,
      label: "Errors",
      value: stats.errors.toString(),
      color: stats.errors === 0 ? "text-primary" : stats.errors <= 5 ? "text-warning" : "text-destructive",
      bgColor: stats.errors === 0 ? "bg-primary/10" : stats.errors <= 5 ? "bg-warning/10" : "bg-destructive/10",
    },
    {
      icon: Clock,
      label: "Time",
      value: formatTime(stats.timeElapsed),
      color: "text-muted-foreground",
      bgColor: "bg-secondary",
    },
    {
      icon: Keyboard,
      label: "Characters",
      value: `${stats.correctChars}/${stats.totalChars}`,
      color: "text-muted-foreground",
      bgColor: "bg-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-4 text-center"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.bgColor} mb-2`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
