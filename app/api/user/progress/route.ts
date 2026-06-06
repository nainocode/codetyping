import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import { getAuthUserId } from "@/lib/auth-request"

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthUserId(req)
    if (!userId) {
      return NextResponse.json({ success: false, error: "Login karo pehle" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get("days") || "7", 10)

    await connectDB()
    const user = await User.findById(userId).select("typingStats createdAt")
    if (!user) {
      return NextResponse.json({ success: false, error: "User nahi mila" }, { status: 404 })
    }

    const today = new Date()
    const progress = Array.from({ length: days }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (days - 1 - i))
      return {
        date: date.toISOString().split("T")[0],
        wpm: user.typingStats.averageWPM,
        accuracy: user.typingStats.accuracy,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        progress,
        days,
        currentWPM: user.typingStats.wpm,
        averageWPM: user.typingStats.averageWPM,
        bestWPM: user.typingStats.bestWPM,
        totalTests: user.typingStats.totalTests,
        accuracy: user.typingStats.accuracy,
        memberSince: user.createdAt,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: "Progress fetch nahi ho sake" }, { status: 500 })
  }
}
