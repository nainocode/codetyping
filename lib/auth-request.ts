import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

async function findOrCreateUser(
  email: string,
  name?: string | null,
  image?: string | null
) {
  await connectDB()
  let user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    user = await User.create({
      name: name || "User",
      email: email.toLowerCase(),
      password: crypto.randomBytes(32).toString("hex"),
      avatar: image ?? undefined,
    })
  }
  return user
}

export async function getAuthUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get("authorization")
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id?: string
        userId?: string
      }
      const id = decoded.id ?? decoded.userId
      if (id) {
        await connectDB()
        const user = await User.findById(id)
        if (user) return id
      }
    } catch {
      // fall through to NextAuth session cookie
    }
  }

  const sessionToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!sessionToken?.email) return null

  if (sessionToken.userId) return sessionToken.userId as string

  const user = await findOrCreateUser(
    sessionToken.email as string,
    sessionToken.name as string | null,
    (sessionToken.picture as string | null) ?? null
  )
  return user._id.toString()
}
