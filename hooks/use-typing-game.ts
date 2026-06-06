"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { CodeSnippet } from "@/lib/code-snippets"

export interface TypingStats {
  wpm: number
  accuracy: number
  errors: number
  correctChars: number
  totalChars: number
  timeElapsed: number
  isComplete: boolean
  isStarted: boolean
}

export interface CharacterState {
  char: string
  state: "pending" | "correct" | "incorrect" | "current"
}

export function useTypingGame(snippet: CodeSnippet | null) {
  const [typedText, setTypedText] = useState("")
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    correctChars: 0,
    totalChars: 0,
    timeElapsed: 0,
    isComplete: false,
    isStarted: false,
  })
  const [characterStates, setCharacterStates] = useState<CharacterState[]>([])
  
  const startTimeRef = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const errorPositionsRef = useRef<Set<number>>(new Set())

  // Initialize character states when snippet changes
  useEffect(() => {
    if (snippet) {
      setCharacterStates(
        snippet.code.split("").map((char) => ({
          char,
          state: "pending" as const,
        }))
      )
      setTypedText("")
      setStats({
        wpm: 0,
        accuracy: 100,
        errors: 0,
        correctChars: 0,
        totalChars: 0,
        timeElapsed: 0,
        isComplete: false,
        isStarted: false,
      })
      startTimeRef.current = null
      errorPositionsRef.current = new Set()
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [snippet])

  // Update timer
  useEffect(() => {
    if (stats.isStarted && !stats.isComplete) {
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000
          setStats((prev) => ({ ...prev, timeElapsed: elapsed }))
        }
      }, 100)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [stats.isStarted, stats.isComplete])

  // Calculate WPM
  const calculateWPM = useCallback((correctChars: number, timeSeconds: number): number => {
    if (timeSeconds === 0) return 0
    // Standard: 5 characters = 1 word
    const words = correctChars / 5
    const minutes = timeSeconds / 60
    return Math.round(words / minutes)
  }, [])

  // Handle key press
  const handleKeyPress = useCallback(
    (key: string) => {
      if (!snippet || stats.isComplete) return

      // Start timer on first keypress
      if (!stats.isStarted) {
        startTimeRef.current = Date.now()
        setStats((prev) => ({ ...prev, isStarted: true }))
      }

      const currentIndex = typedText.length
      const targetChar = snippet.code[currentIndex]

      if (key === "Backspace") {
        if (typedText.length > 0) {
          const newTypedText = typedText.slice(0, -1)
          setTypedText(newTypedText)
          
          // Update character states
          setCharacterStates((prev) => {
            const newStates = [...prev]
            const removedIndex = newTypedText.length
            newStates[removedIndex] = { ...newStates[removedIndex], state: "pending" }
            if (removedIndex < prev.length - 1) {
              newStates[removedIndex] = { ...newStates[removedIndex], state: "current" }
            }
            // Remove current marker from next char
            if (removedIndex + 1 < prev.length) {
              if (newStates[removedIndex + 1].state === "current") {
                newStates[removedIndex + 1] = { ...newStates[removedIndex + 1], state: "pending" }
              }
            }
            return newStates
          })
        }
        return
      }

      // Ignore special keys
      if (key.length > 1 && key !== "Enter" && key !== "Tab") return

      // Convert Enter to newline, Tab to spaces
      let inputChar = key
      if (key === "Enter") inputChar = "\n"
      if (key === "Tab") inputChar = "  " // 2 spaces for tab

      // Handle tab as multiple characters
      if (key === "Tab") {
        // Check if we need spaces
        const spacesToAdd = inputChar.split("")
        let newTypedText = typedText
        
        for (const spaceChar of spacesToAdd) {
          const idx = newTypedText.length
          if (idx >= snippet.code.length) break
          
          const target = snippet.code[idx]
          const isCorrect = spaceChar === target
          
          newTypedText += spaceChar
          
          if (!isCorrect && !errorPositionsRef.current.has(idx)) {
            errorPositionsRef.current.add(idx)
          }
        }
        
        setTypedText(newTypedText)
        updateStatsAndStates(newTypedText)
        return
      }

      // Regular character
      if (currentIndex >= snippet.code.length) return

      const newTypedText = typedText + inputChar
      const isCorrect = inputChar === targetChar

      if (!isCorrect && !errorPositionsRef.current.has(currentIndex)) {
        errorPositionsRef.current.add(currentIndex)
      }

      setTypedText(newTypedText)
      updateStatsAndStates(newTypedText)
    },
    [snippet, typedText, stats.isStarted, stats.isComplete]
  )

  const updateStatsAndStates = useCallback(
    (newTypedText: string) => {
      if (!snippet) return

      // Update character states
      setCharacterStates(
        snippet.code.split("").map((char, index) => {
          if (index < newTypedText.length) {
            return {
              char,
              state: newTypedText[index] === char ? "correct" : "incorrect",
            }
          } else if (index === newTypedText.length) {
            return { char, state: "current" }
          }
          return { char, state: "pending" }
        })
      )

      // Calculate stats
      const correctChars = newTypedText.split("").filter((char, index) => char === snippet.code[index]).length
      const totalTyped = newTypedText.length
      const errors = errorPositionsRef.current.size
      const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100
      const timeElapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0
      const wpm = calculateWPM(correctChars, timeElapsed)
      const isComplete = newTypedText.length >= snippet.code.length

      if (isComplete && timerRef.current) {
        clearInterval(timerRef.current)
      }

      setStats({
        wpm,
        accuracy,
        errors,
        correctChars,
        totalChars: totalTyped,
        timeElapsed,
        isComplete,
        isStarted: true,
      })
    },
    [snippet, calculateWPM]
  )

  const reset = useCallback(() => {
    if (snippet) {
      setCharacterStates(
        snippet.code.split("").map((char) => ({
          char,
          state: "pending" as const,
        }))
      )
      setTypedText("")
      setStats({
        wpm: 0,
        accuracy: 100,
        errors: 0,
        correctChars: 0,
        totalChars: 0,
        timeElapsed: 0,
        isComplete: false,
        isStarted: false,
      })
      startTimeRef.current = null
      errorPositionsRef.current = new Set()
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [snippet])

  return {
    typedText,
    stats,
    characterStates,
    handleKeyPress,
    reset,
  }
}
