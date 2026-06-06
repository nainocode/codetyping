"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  ArrowUp,
  ArrowDown,
  Minus,
  Loader2,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardPlayer {
  rank: number
  id: string
  name: string
  avatar: string
  wpm: number
  accuracy: number
  streak: number
  change: "up" | "down" | "same"
}

type TabKey = "daily" | "weekly" | "allTime"

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />
    default:
      return <span className="text-muted-foreground font-mono">{rank}</span>
  }
}

const getChangeIcon = (change: string) => {
  switch (change) {
    case "up":
      return <ArrowUp className="w-4 h-4 text-primary" />
    case "down":
      return <ArrowDown className="w-4 h-4 text-destructive" />
    default:
      return <Minus className="w-4 h-4 text-muted-foreground" />
  }
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("allTime")
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLeaderboard = useCallback(async (period: TabKey) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/leaderboard?period=${period}`)
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setPlayers(json.data)
      } else {
        setPlayers([])
      }
    } catch {
      setPlayers([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeaderboard(activeTab)
  }, [activeTab, fetchLeaderboard])

  const topThree = players.slice(0, 3)
  const first = topThree[0]
  const second = topThree[1]
  const third = topThree[2]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <motion.div className="flex-1 pt-24 pb-16">
        <motion.div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Global Rankings</span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">
              Real rankings from developers on CodeTyping
            </p>
          </motion.div>

          {isLoading ? (
            <motion.div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading rankings...</p>
            </motion.div>
          ) : (
            <>
              {first && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12"
                >
                  <motion.div className="flex items-end justify-center gap-4 sm:gap-8">
                    {second && (
                      <motion.div className="flex flex-col items-center">
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-400 mb-2">
                          <AvatarImage src={second.avatar} />
                          <AvatarFallback className="bg-secondary text-lg">
                            {getInitials(second.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm sm:text-base truncate max-w-[100px]">
                          {second.name}
                        </span>
                        <span className="text-primary font-bold">{second.wpm} WPM</span>
                        <motion.div className="mt-2 w-20 sm:w-24 h-24 sm:h-28 bg-linear-to-t from-gray-500/20 to-gray-400/10 rounded-t-lg flex items-center justify-center">
                          <Medal className="w-8 h-8 text-gray-400" />
                        </motion.div>
                      </motion.div>
                    )}

                    <motion.div className="flex flex-col items-center -mb-4">
                      <motion.div className="relative">
                        <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-500" />
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-yellow-500 mb-2">
                          <AvatarImage src={first.avatar} />
                          <AvatarFallback className="bg-secondary text-xl">
                            {getInitials(first.name)}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <span className="font-semibold text-base sm:text-lg truncate max-w-[120px]">
                        {first.name}
                      </span>
                      <span className="text-primary font-bold text-lg">{first.wpm} WPM</span>
                      <motion.div className="mt-2 w-24 sm:w-28 h-32 sm:h-36 bg-linear-to-t from-yellow-500/20 to-yellow-400/10 rounded-t-lg flex items-center justify-center">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                      </motion.div>
                    </motion.div>

                    {third && (
                      <motion.div className="flex flex-col items-center">
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-amber-600 mb-2">
                          <AvatarImage src={third.avatar} />
                          <AvatarFallback className="bg-secondary text-lg">
                            {getInitials(third.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm sm:text-base truncate max-w-[100px]">
                          {third.name}
                        </span>
                        <span className="text-primary font-bold">{third.wpm} WPM</span>
                        <motion.div className="mt-2 w-20 sm:w-24 h-20 sm:h-24 bg-linear-to-t from-amber-600/20 to-amber-500/10 rounded-t-lg flex items-center justify-center">
                          <Medal className="w-8 h-8 text-amber-600" />
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as TabKey)}
                  className="w-full"
                >
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="allTime">All Time</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab}>
                    {players.length === 0 ? (
                      <motion.div className="glass rounded-xl p-12 text-center">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">No rankings yet</p>
                        <p className="text-muted-foreground text-sm mb-6">
                          Complete a practice session to appear on the leaderboard.
                        </p>
                        <Link href="/practice">
                          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                            Start Practicing
                          </Button>
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div className="glass rounded-xl overflow-hidden">
                        <motion.div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-medium text-muted-foreground">
                          <motion.div className="col-span-1 text-center">Rank</motion.div>
                          <motion.div className="col-span-4 sm:col-span-5">Player</motion.div>
                          <motion.div className="col-span-2 text-center">WPM</motion.div>
                          <motion.div className="col-span-2 text-center hidden sm:block">
                            Accuracy
                          </motion.div>
                          <motion.div className="col-span-2 text-center">Tests</motion.div>
                          <motion.div className="col-span-1 text-center">Trend</motion.div>
                        </motion.div>

                        {players.map((player, index) => (
                          <motion.div
                            key={player.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                              "grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/30 transition-colors",
                              index !== players.length - 1 && "border-b border-border",
                              player.rank <= 3 && "bg-primary/5"
                            )}
                          >
                            <motion.div className="col-span-1 flex justify-center">
                              {getRankIcon(player.rank)}
                            </motion.div>
                            <motion.div className="col-span-4 sm:col-span-5 flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={player.avatar} />
                                <AvatarFallback className="bg-secondary text-xs">
                                  {getInitials(player.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium truncate">{player.name}</span>
                            </motion.div>
                            <motion.div className="col-span-2 text-center">
                              <span className="font-bold text-primary">{player.wpm}</span>
                            </motion.div>
                            <motion.div className="col-span-2 text-center hidden sm:block">
                              <span className="text-muted-foreground">{player.accuracy}%</span>
                            </motion.div>
                            <motion.div className="col-span-2 flex items-center justify-center gap-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              <span>{player.streak}</span>
                            </motion.div>
                            <motion.div className="col-span-1 flex justify-center">
                              {getChangeIcon(player.change)}
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Want to see your name on the leaderboard?
            </p>
            <Link href="/practice">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                Start Practicing Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </main>
  )
}
