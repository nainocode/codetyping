"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CharacterState } from "@/hooks/use-typing-game"
import { cn } from "@/lib/utils"

interface TypingAreaProps {
  characterStates: CharacterState[]
  onKeyPress: (key: string) => void
  isComplete: boolean
  language: string
}

export function TypingArea({ characterStates, onKeyPress, isComplete, language }: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  // Focus on mount and keep focus
  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  // Auto-scroll to cursor
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
    }
  }, [characterStates])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault()
    
    if (e.key === "Tab") {
      onKeyPress("Tab")
      return
    }
    
    onKeyPress(e.key)
  }

  // Group characters by lines for better display
  const lines: CharacterState[][] = []
  let currentLine: CharacterState[] = []
  
  characterStates.forEach((cs) => {
    if (cs.char === "\n") {
      currentLine.push(cs)
      lines.push(currentLine)
      currentLine = []
    } else {
      currentLine.push(cs)
    }
  })
  if (currentLine.length > 0) {
    lines.push(currentLine)
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "glass rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
        "min-h-[300px] max-h-[500px] overflow-y-auto code-scrollbar",
        isComplete && "ring-2 ring-primary/50"
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-warning/80" />
        <div className="w-3 h-3 rounded-full bg-primary/80" />
        <span className="ml-2 text-muted-foreground text-sm font-mono">
          practice.{language === "cpp" ? "cpp" : language === "javascript" ? "js" : language === "typescript" ? "ts" : language === "python" ? "py" : language}
        </span>
      </div>

      {/* Code Display */}
      <div className="font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            <span className="text-muted-foreground w-8 select-none shrink-0 text-right pr-4">
              {lineIndex + 1}
            </span>
            <span className="flex-1">
              {line.map((cs, charIndex) => {
                const globalIndex = lines
                  .slice(0, lineIndex)
                  .reduce((acc, l) => acc + l.length, 0) + charIndex

                if (cs.char === "\n") {
                  return cs.state === "current" ? (
                    <span
                      key={globalIndex}
                      ref={cursorRef}
                      className="relative"
                    >
                      <motion.span
                        className="absolute left-0 top-0 w-0.5 h-5 bg-primary"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    </span>
                  ) : null
                }

                return (
                  <span
                    key={globalIndex}
                    ref={cs.state === "current" ? cursorRef : undefined}
                    className={cn(
                      "relative transition-colors duration-75",
                      cs.state === "correct" && "text-primary",
                      cs.state === "incorrect" && "text-destructive bg-destructive/20 rounded",
                      cs.state === "pending" && "text-muted-foreground",
                      cs.state === "current" && "text-foreground"
                    )}
                  >
                    {cs.state === "current" && (
                      <motion.span
                        className="absolute left-0 top-0 w-0.5 h-5 bg-primary"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                    {cs.char === " " ? "\u00A0" : cs.char}
                  </span>
                )
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Click to focus hint */}
      {characterStates.length > 0 && characterStates[0].state === "pending" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-muted-foreground text-sm">Click here and start typing...</span>
        </div>
      )}
    </div>
  )
}
