import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import { generateToken } from "@/lib/jwt"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        await connectDB()
        let dbUser = await User.findOne({ email: user.email.toLowerCase() })

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name || "User",
            email: user.email.toLowerCase(),
            password: crypto.randomBytes(32).toString("hex"),
            avatar: user.image ?? undefined,
          })
        } else if (user.image && !dbUser.avatar) {
          dbUser.avatar = user.image
          await dbUser.save()
        }

        token.userId = dbUser._id.toString()
        token.backendToken = generateToken(dbUser)
      }
      return token
    },
    async session({ session, token }) {
      if (token.userId && session.user) {
        session.user.id = token.userId as string
      }
      session.backendToken = token.backendToken as string | undefined
      return session
    },
  },
}
