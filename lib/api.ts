const API_BASE =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL ?? "")
    : process.env.NEXT_PUBLIC_API_URL ?? ""

const TOKEN_KEY = "auth_token"
const USER_KEY = "auth_user"

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-change"))
  }
}

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  typingStats?: {
    wpm: number
    accuracy: number
    totalTests: number
    averageWPM: number
    bestWPM: number
  }
  createdAt: string
}

export interface AuthResponse {
  message: string
  user: AuthUser
  token: string
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new ApiError(
      data.error || "Request failed",
      res.status,
      data.code
    )
  }

  return data as T
}

export function storeToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token)
    notifyAuthChange()
  }
}

export function storeUser(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    notifyAuthChange()
  }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function removeStoredUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY)
    notifyAuthChange()
  }
}

export function clearAuth(): void {
  removeToken()
  removeStoredUser()
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY)
    notifyAuthChange()
  }
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
}

export async function getMe(): Promise<{ user: AuthUser }> {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  return request<{ user: AuthUser }>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
}
