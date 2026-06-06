"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TypingArea } from "@/components/typing-area"
import { StatsDisplay } from "@/components/stats-display"
import { CompletionModal } from "@/components/completion-modal"
import { Button } from "@/components/ui/button"
import { useTypingGame } from "@/hooks/use-typing-game"
import {
  type Language,
  type Difficulty,
  type CodeSnippet,
  getRandomSnippet,
  getFilteredSnippets,
} from "@/lib/code-snippets"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RotateCcw, Shuffle, Settings2 } from "lucide-react"

const languages: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "php", label: "PHP" },
]

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "pro", label: "Pro" },
]

export default function PracticePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript")
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("beginner")
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet | null>(null)

  const { typedText, stats, characterStates, handleKeyPress, reset } = useTypingGame(currentSnippet)

  // Load initial snippet
  useEffect(() => {
    const snippets = getFilteredSnippets(selectedLanguage, selectedDifficulty)
    if (snippets.length > 0) {
      setCurrentSnippet(snippets[0])
    } else {
      // Fallback to any snippet from that language
      const langSnippets = getFilteredSnippets(selectedLanguage)
      if (langSnippets.length > 0) {
        setCurrentSnippet(langSnippets[0])
      }
    }
  }, [selectedLanguage, selectedDifficulty])

  const handleNextSnippet = useCallback(() => {
    const snippet = getRandomSnippet(selectedLanguage, selectedDifficulty)
    setCurrentSnippet(snippet)
  }, [selectedLanguage, selectedDifficulty])

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as Language)
  }

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value as Difficulty)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Typing <span className="text-primary">Practice</span>
            </h1>
            <p className="text-muted-foreground">
              Improve your coding speed with real code snippets
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-4 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Settings:</span>
                </div>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[140px] bg-secondary border-border">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={handleDifficultyChange}>
                  <SelectTrigger className="w-[140px] bg-secondary border-border">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reset}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextSnippet}
                  className="gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  New Snippet
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <StatsDisplay stats={stats} />
          </motion.div>

          {/* Snippet Info */}
          {currentSnippet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <div className="flex items-center gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {currentSnippet.title}
                </span>
                <span className="text-muted-foreground">
                  {currentSnippet.description}
                </span>
              </div>
            </motion.div>
          )}

          {/* Typing Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TypingArea
              characterStates={characterStates}
              onKeyPress={handleKeyPress}
              isComplete={stats.isComplete}
              language={selectedLanguage}
            />
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            <p>Click on the code area and start typing. Press Enter for new lines, Tab for indentation.</p>
          </motion.div>
        </div>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={stats.isComplete}
        stats={stats}
        onRestart={reset}
        onNextSnippet={handleNextSnippet}
      />

      <Footer />
    </main>
  )
}
