"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  getToken,
  getStoredUser,
  getMe,
  storeUser,
  clearAuth,
  type AuthUser,
} from "@/lib/api"

export interface NavUser {
  name: string
  email: string
  image?: string | null
}

export function useAuth() {
  const { data: session, status } = useSession()
  const [jwtUser, setJwtUser] = useState<AuthUser | null>(null)
  const [jwtLoading, setJwtLoading] = useState(true)

  const loadJwtUser = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setJwtUser(null)
      setJwtLoading(false)
      return
    }

    const stored = getStoredUser()
    if (stored) {
      setJwtUser(stored)
      setJwtLoading(false)
      return
    }

    try {
      const { user } = await getMe()
      storeUser(user)
      setJwtUser(user)
    } catch {
      clearAuth()
      setJwtUser(null)
    } finally {
      setJwtLoading(false)
    }
  }, [])

  useEffect(() => {
    loadJwtUser()
    const onAuthChange = () => loadJwtUser()
    window.addEventListener("auth-change", onAuthChange)
    return () => window.removeEventListener("auth-change", onAuthChange)
  }, [loadJwtUser, status])

  const user: NavUser | null = session?.user
    ? {
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
        image: session.user.image,
      }
    : jwtUser
      ? {
          name: jwtUser.name,
          email: jwtUser.email,
          image: jwtUser.avatar ?? null,
        }
      : null

  const isAuthenticated = !!session || !!jwtUser
  const isLoading =
    status === "loading" || (!!getToken() && jwtLoading && !session)

  const logout = async () => {
    clearAuth()
    setJwtUser(null)
    await signOut({ callbackUrl: "/" })
  }

  return { user, isAuthenticated, isLoading, logout }
}
