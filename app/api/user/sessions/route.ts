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
    const limit = parseInt(searchParams.get("limit") || "5", 10)

    await connectDB()
    const user = await User.findById(userId).select("typingStats")
    if (!user) {
      return NextResponse.json({ success: false, error: "User nahi mila" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        sessions: [],
        limit,
        totalTests: user.typingStats.totalTests,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: "Sessions fetch nahi ho sake" }, { status: 500 })
  }
}
