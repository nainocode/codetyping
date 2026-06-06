import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import TypingSession from "@/lib/models/TypingSession"
import { getAuthUserId } from "@/lib/auth-request"

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthUserId(req)
    if (!userId) {
      return NextResponse.json({ success: false, error: "Login karo pehle" }, { status: 401 })
    }

    const { wpm, accuracy, language, difficulty } = await req.json()
    if (typeof wpm !== "number" || typeof accuracy !== "number") {
      return NextResponse.json(
        { success: false, error: "Invalid stats data" },
        { status: 400 }
      )
    }

    await connectDB()
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ success: false, error: "User nahi mila" }, { status: 404 })
    }

    const stats = user.typingStats
    const prevTests = stats.totalTests
    stats.totalTests += 1
    stats.wpm = wpm
    if (wpm > stats.bestWPM) stats.bestWPM = wpm
    stats.averageWPM =
      prevTests === 0
        ? wpm
        : Math.round((stats.averageWPM * prevTests + wpm) / stats.totalTests)
    stats.accuracy =
      prevTests === 0
        ? accuracy
        : Math.round((stats.accuracy * prevTests + accuracy) / stats.totalTests)

    await user.save()
    await TypingSession.create({
      userId: user._id,
      wpm,
      accuracy,
      language,
      difficulty,
    })

    return NextResponse.json({
      success: true,
      data: {
        wpm: stats.wpm,
        bestWPM: stats.bestWPM,
        averageWPM: stats.averageWPM,
        accuracy: stats.accuracy,
        totalTests: stats.totalTests,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Stats save nahi ho sake" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthUserId(req)
    if (!userId) {
      return NextResponse.json({ success: false, error: "Login karo pehle" }, { status: 401 })
    }

    await connectDB()
    const user = await User.findById(userId).select("typingStats name email")
    if (!user) {
      return NextResponse.json({ success: false, error: "User nahi mila" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        streak: 0,
        rank: 0,
        totalTests: user.typingStats.totalTests,
        totalTime: "0h 0m",
        bestWPM: user.typingStats.bestWPM,
        bestWpm: user.typingStats.bestWPM,
        averageWPM: user.typingStats.averageWPM,
        avgWpm: user.typingStats.averageWPM,
        accuracy: user.typingStats.accuracy,
        avgAccuracy: user.typingStats.accuracy,
        wpm: user.typingStats.wpm,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: "Stats fetch nahi ho sake" }, { status: 500 })
  }
}
