import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import  connectDB  from "@/lib/mongodb"
import User from "@/lib/models/User"
import jwt from "jsonwebtoken"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB()

        const user = await User.findOne({ email: credentials?.email }).select("+password")
        if (!user) throw new Error("Email ya password galat hai")

        const isMatch = await user.comparePassword(credentials?.password!)
        if (!isMatch) throw new Error("Email ya password galat hai")

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }
      },
    }),
  ],

  callbacks: {
    // ✅ Yahan backendToken banao
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.id
        token.backendToken = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET!,
          { expiresIn: "7d" }
        )
      }
      return token
    },

    // ✅ Session mein backendToken pass karo
    async session({ session, token }: any) {
      session.backendToken = token.backendToken
      session.user.id = token.userId
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)