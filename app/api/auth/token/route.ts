import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import { generateToken } from "@/lib/jwt"
import crypto from "crypto"

export async function GET(req: NextRequest) {
  try {
    const sessionToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!sessionToken?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    if (sessionToken.backendToken) {
      return NextResponse.json({ token: sessionToken.backendToken })
    }

    await connectDB()
    let user = sessionToken.userId
      ? await User.findById(sessionToken.userId as string)
      : await User.findOne({ email: (sessionToken.email as string).toLowerCase() })

    if (!user) {
      user = await User.create({
        name: (sessionToken.name as string) || "User",
        email: (sessionToken.email as string).toLowerCase(),
        password: crypto.randomBytes(32).toString("hex"),
        avatar: (sessionToken.picture as string) ?? undefined,
      })
    }

    return NextResponse.json({ token: generateToken(user) })
  } catch {
    return NextResponse.json({ error: "Failed to issue token" }, { status: 500 })
  }
}
