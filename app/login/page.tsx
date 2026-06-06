"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Mail, Lock, ArrowRight, Github } from "lucide-react"
import { login, storeToken, storeUser } from "@/lib/api"
import {
  toastLoginSuccess,
  toastLoginError,
  toastOAuthError,
  toastMissingFields,
  toastInvalidEmail,
} from "@/lib/auth-toasts"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)

  // Controlled inputs — FormData wali problem nahi hogi
  const [form, setForm] = useState({ email: "", password: "" })

  const router = useRouter()

  // ── Email/Password Login ─────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.email.trim() || !form.password) {
      toastMissingFields("login")
      return
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(form.email)) {
      toastInvalidEmail()
      return
    }

    setIsLoading(true)
    try {
      const response = await login(form.email, form.password)
      storeToken(response.token)
      storeUser(response.user)
      toastLoginSuccess(response.user.name)
      router.push("/dashboard")
    } catch (error) {
      toastLoginError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // ── Google OAuth ─────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      })

      if (result?.error) {
        toastOAuthError("Google")
      } else if (result?.url) {
        toastLoginSuccess()
        router.push(result.url)
      }
    } catch {
      toastOAuthError("Google")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  // ── GitHub OAuth ─────────────────────────────────────────────────────────
  const handleGithubLogin = async () => {
    setIsGithubLoading(true)
    try {
      const result = await signIn("github", {
        callbackUrl: "/dashboard",
        redirect: false,
      })

      if (result?.error) {
        toastOAuthError("GitHub")
      } else if (result?.url) {
        toastLoginSuccess()
        router.push(result.url)
      }
    } catch {
      toastOAuthError("GitHub")
    } finally {
      setIsGithubLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            <Zap className="relative w-10 h-10 text-primary" suppressHydrationWarning />
          </div>
          <span className="font-bold text-2xl tracking-tight">
            Code<span className="text-primary">Typing</span>
          </span>
        </Link>

        {/* Card */}
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to continue your typing journey
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 h-12 border-border hover:bg-secondary"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isGithubLoading || isLoading}
            >
              {isGoogleLoading ? (
                <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" suppressHydrationWarning>
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </Button>

            {/* GitHub Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 h-12 border-border hover:bg-secondary"
              onClick={handleGithubLogin}
              disabled={isGithubLoading || isGoogleLoading || isLoading}
            >
              {isGithubLoading ? (
                <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              ) : (
                <Github className="w-5 h-5" suppressHydrationWarning />
              )}
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator className="bg-border" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
              or continue with email
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" suppressHydrationWarning />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-secondary border-border"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" suppressHydrationWarning />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 h-12 bg-secondary border-border"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2"
              disabled={isLoading || isGoogleLoading || isGithubLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" suppressHydrationWarning />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="block text-center text-sm text-muted-foreground mt-6 hover:text-foreground transition-colors"
        >
          Back to home
        </Link>
      </motion.div>
    </main>
  )
}
