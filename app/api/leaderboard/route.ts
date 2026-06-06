import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import TypingSession from "@/lib/models/TypingSession"

export interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  avatar: string
  wpm: number
  accuracy: number
  streak: number
  change: "up" | "down" | "same"
}

function getTrend(bestWpm: number, avgWpm: number): "up" | "down" | "same" {
  if (bestWpm > avgWpm) return "up"
  if (bestWpm < avgWpm) return "down"
  return "same"
}

function mapUserToEntry(
  user: {
    _id: { toString(): string }
    name: string
    avatar?: string | null
    typingStats: {
      bestWPM: number
      averageWPM: number
      accuracy: number
      totalTests: number
    }
  },
  rank: number,
  wpm: number,
  accuracy: number
): LeaderboardEntry {
  return {
    rank,
    id: user._id.toString(),
    name: user.name,
    avatar: user.avatar || "",
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy * 10) / 10,
    streak: user.typingStats.totalTests,
    change: getTrend(user.typingStats.bestWPM, user.typingStats.averageWPM),
  }
}

export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") || "allTime"
    await connectDB()

    const now = new Date()
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const since = period === "daily" ? dayAgo : period === "weekly" ? weekAgo : null

    if (since) {
      const aggregated = await TypingSession.aggregate([
        { $match: { createdAt: { $gte: since } } },
        {
          $group: {
            _id: "$userId",
            wpm: { $max: "$wpm" },
            accuracy: { $avg: "$accuracy" },
            tests: { $sum: 1 },
          },
        },
        { $sort: { wpm: -1 } },
        { $limit: 50 },
      ])

      if (aggregated.length > 0) {
        const userIds = aggregated.map((r) => r._id)
        const users = await User.find({ _id: { $in: userIds } }).select(
          "name avatar typingStats"
        )
        const userMap = new Map(users.map((u) => [u._id.toString(), u]))

        const entries: LeaderboardEntry[] = aggregated
          .map((row, index) => {
            const user = userMap.get(row._id.toString())
            if (!user) return null
            return mapUserToEntry(user, index + 1, row.wpm, row.accuracy)
          })
          .filter((e): e is LeaderboardEntry => e !== null)

        return NextResponse.json({ success: true, data: entries, period })
      }
    }

    const users = await User.find({
      $or: [
        { "typingStats.totalTests": { $gt: 0 } },
        { "typingStats.bestWPM": { $gt: 0 } },
      ],
    })
      .select("name avatar typingStats updatedAt")
      .sort({ "typingStats.bestWPM": -1 })
      .limit(50)

    const filtered = since
      ? users.filter((u) => u.updatedAt >= since)
      : users

    const entries = filtered.map((user, index) =>
      mapUserToEntry(
        user,
        index + 1,
        period === "weekly"
          ? user.typingStats.averageWPM
          : user.typingStats.bestWPM,
        user.typingStats.accuracy
      )
    )

    return NextResponse.json({ success: true, data: entries, period })
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to load leaderboard" },
      { status: 500 }
    )
  }
}
