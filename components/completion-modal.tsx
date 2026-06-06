"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypingStats } from "@/hooks/use-typing-game"
import { Trophy, RotateCcw, ArrowRight, Sparkles } from "lucide-react"

interface CompletionModalProps {
  isOpen: boolean
  stats: TypingStats
  onRestart: () => void
  onNextSnippet: () => void
}

export function CompletionModal({ isOpen, stats, onRestart, onNextSnippet }: CompletionModalProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getPerformanceMessage = () => {
    if (stats.wpm >= 80 && stats.accuracy >= 95) {
      return { message: "Outstanding!", subtext: "You are typing like a pro!" }
    } else if (stats.wpm >= 60 && stats.accuracy >= 90) {
      return { message: "Great Job!", subtext: "Keep up the excellent work!" }
    } else if (stats.wpm >= 40 && stats.accuracy >= 80) {
      return { message: "Good Progress!", subtext: "You are improving steadily!" }
    } else {
      return { message: "Keep Practicing!", subtext: "Practice makes perfect!" }
    }
  }

  const performance = getPerformanceMessage()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-2xl p-8 max-w-md w-full mx-4 text-center"
          >
            {/* Trophy Icon */}
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Sparkles className="w-6 h-6 text-warning" />
              </motion.div>
            </div>

            {/* Performance Message */}
            <h2 className="text-3xl font-bold mb-2">{performance.message}</h2>
            <p className="text-muted-foreground mb-8">{performance.subtext}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary">{stats.wpm}</div>
                <div className="text-sm text-muted-foreground">WPM</div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary">{stats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-muted-foreground">{formatTime(stats.timeElapsed)}</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={onRestart}
                className="flex-1 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </Button>
              <Button
                onClick={onNextSnippet}
                className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Next Snippet
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
