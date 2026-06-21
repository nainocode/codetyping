"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Gauge,
  Target,
  Flame,
  Trophy,
  TrendingUp,
  Calendar,
  Code2,
  ArrowRight,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { getToken, removeToken, storeToken } from "@/lib/api"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// ── Types ─────────────────────────────────────────────────────────────────────
interface UserStats {
  streak: number
  rank: number
  totalTests: number
  totalTime: string
  bestWpm: number
  avgWpm: number
  avgAccuracy: number
}

interface Session {
  id: string
  language: string
  wpm: number
  accuracy: number
  date: string
  duration: string
}

interface ProgressData {
  date: string
  wpm: number
  accuracy: number
}

interface Achievement {
  title: string
  description: string
  progress: number
  icon: any
}

const emptyStats: UserStats = {
  streak: 0,
  rank: 0,
  totalTests: 0,
  totalTime: "0h 0m",
  bestWpm: 0,
  avgWpm: 0,
  avgAccuracy: 0,
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [stats, setStats] = useState<UserStats>(emptyStats)
  const [recentSessions, setRecentSessions] = useState<Session[]>([])
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ── Auth Guard (FIXED) ────────────────────────────────────────────────────
  useEffect(() => {
    if (status === "loading") return
    
    // Sirf tab login par bhejein jab Next-Auth pukka keh de ki user logged out hai
    // aur local storage mein bhi koi token na bacha ho
    if (status === "unauthenticated" && !getToken()) {
      console.log("User strictly unauthenticated, redirecting to login...")
      router.push("/login")
    }
  }, [status, router])

  // Sync JWT from OAuth session into localStorage
  useEffect(() => {
    if (session?.backendToken) {
      storeToken(session.backendToken)
    }
  }, [session?.backendToken])

  // ── Achievements build karo ───────────────────────────────────────────────
  const buildAchievements = (s: UserStats) => {
    setAchievements([
      {
        title: "Speed Demon",
        description: "Reach 80 WPM",
        progress: Math.min(100, Math.round((s.bestWpm / 80) * 100)),
        icon: Gauge,
      },
      {
        title: "Accuracy Master",
        description: "95% accuracy in 10 tests",
        progress: Math.min(100, Math.round((s.avgAccuracy / 95) * 100)),
        icon: Target,
      },
      {
        title: "Streak Champion",
        description: "7-day practice streak",
        progress: Math.min(100, Math.round((s.streak / 7) * 100)),
        icon: Flame,
      },
      {
        title: "Code Warrior",
        description: "Complete 500 tests",
        progress: Math.min(100, Math.round((s.totalTests / 500) * 100)),
        icon: Code2,
      },
    ])
  }

  // ── Data Fetch (FIXED 401 HANDLING) ───────────────────────────────────────
  useEffect(() => {
    if (status === "loading") return

    // Don't fetch if completely logged out
    if (status === "unauthenticated" && !getToken()) return

    const fetchDashboard = async () => {
      setIsLoading(true)
      try {
        const resolveToken = async (): Promise<string | null> => {
          const stored = getToken()
          if (stored) return stored
          if (status !== "authenticated") return null

          try {
            const tokenRes = await fetch("/api/auth/token", { credentials: "include" })
            if (!tokenRes.ok) return null
            const { token: newToken } = await tokenRes.json()
            storeToken(newToken)
            return newToken
          } catch {
            return null
          }
        }

        let token = await resolveToken()

        const buildFetchOpts = (authToken: string | null): RequestInit => ({
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
        })

        const fetchUserData = (authToken: string | null) =>
          Promise.all([
            fetch("/api/user/stats", buildFetchOpts(authToken)),
            fetch("/api/user/sessions?limit=5", buildFetchOpts(authToken)),
            fetch("/api/user/progress?days=7", buildFetchOpts(authToken)),
          ])

        let [statsRes, sessionsRes, progressRes] = await fetchUserData(token)

        // Token expired error handle karein bina login page par phekے
        if (statsRes.status === 401 || statsRes.status === 404) {
          removeToken()
          if (status === "authenticated") {
            const tokenRes = await fetch("/api/auth/token", { credentials: "include" })
            if (tokenRes.ok) {
              const { token: newToken } = await tokenRes.json()
              storeToken(newToken)
              token = newToken
              ;[statsRes, sessionsRes, progressRes] = await fetchUserData(token)
            } else {
              ;[statsRes, sessionsRes, progressRes] = await fetchUserData(null)
            }
          }
        }

        // Agar Next-Auth bhi logout ho chuka hai aur token bhi invalid hai, tabhi redirect karein
        if (statsRes.status === 401 && status === "unauthenticated") {
          router.push("/login")
          return
        }

        // Stats Map
        if (statsRes.ok) {
          const data = await statsRes.json()
          if (data.success && data.data) {
            const mapped: UserStats = {
              streak: data.data.streak ?? 0,
              rank: data.data.rank ?? 0,
              totalTests: data.data.totalTests ?? 0,
              totalTime: data.data.totalTime ?? "0h 0m",
              bestWpm: data.data.bestWPM ?? data.data.bestWpm ?? 0,
              avgWpm: data.data.averageWPM ?? data.data.avgWpm ?? 0,
              avgAccuracy: data.data.accuracy ?? data.data.avgAccuracy ?? 0,
            }
            setStats(mapped)
            buildAchievements(mapped)
          }
        }

        // Recent sessions
        if (sessionsRes.ok) {
          const data = await sessionsRes.json()
          if (data.success && data.data) {
            setRecentSessions(data.data?.sessions || [])
          }
        }

        // Progress chart
        if (progressRes.ok) {
          const data = await progressRes.json()
          if (data.success && data.data) {
            setProgressData(data.data?.progress || [])
          }
        }

      } catch (error) {
        console.error("Dashboard fetch error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboard()
  }, [status, session?.backendToken, router])

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const userName = session?.user?.name || "User"
  const userAvatar = session?.user?.image || ""
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  const isNewUser = stats.totalTests === 0

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {isNewUser ? "Welcome, " : "Welcome back, "}
                  <span className="text-primary">{userName.split(" ")[0]}</span>!
                </h1>
                <p className="text-muted-foreground">
                  {isNewUser
                    ? "Start your first practice session to track your progress."
                    : `Keep it up! Your streak is ${stats.streak} day${stats.streak !== 1 ? "s" : ""}.`}
                </p>
              </div>
            </div>
            <Link href="/practice">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2">
                {isNewUser ? "Start Practice" : "Continue Practice"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Best WPM", value: stats.bestWpm || "—", icon: Gauge, color: "primary" },
              { label: "Avg Accuracy", value: stats.avgAccuracy ? `${stats.avgAccuracy}%` : "—", icon: Target, color: "primary" },
              { label: "Day Streak", value: stats.streak || "—", icon: Flame, color: "orange-500" },
              { label: "Global Rank", value: stats.rank ? `#${stats.rank}` : "—", icon: Trophy, color: "yellow-500" },
            ].map((stat, i) => (
              <Card key={i} className="glass border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Rest of the UI remains unchanged */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass border-border h-full lg:col-span-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />Progress This Week</CardTitle></CardHeader>
              <CardContent>
                {progressData.length === 0 ? (
                  <div className="h-75 flex flex-col items-center justify-center gap-3 text-muted-foreground"><TrendingUp className="w-12 h-12 opacity-20" /><p>Complete your first session to see progress here.</p></div>
                ) : (
                  <div className="h-75">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={progressData}>
                        <defs><linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0.3} /><stop offset="95%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0} /></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                        <XAxis dataKey="date" stroke="oklch(0.65 0 0)" />
                        <YAxis stroke="oklch(0.65 0 0)" />
                        <Tooltip contentStyle={{ backgroundColor: "oklch(0.12 0.01 260)", border: "1px solid oklch(0.25 0.02 260)", borderRadius: "8px" }} />
                        <Area type="monotone" dataKey="wpm" stroke="oklch(0.72 0.19 160)" strokeWidth={2} fill="url(#wpmGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass border-border h-full">
              <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" />Achievements</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${achievement.progress === 100 ? "bg-primary/20" : "bg-secondary"}`}><achievement.icon className={`w-4 h-4 ${achievement.progress === 100 ? "text-primary" : "text-muted-foreground"}`} /></div>
                        <div><p className="font-medium text-sm">{achievement.title}</p><p className="text-xs text-muted-foreground">{achievement.description}</p></div>
                      </div>
                      <span className="text-sm font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}