"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import {
  Code2,
  Menu,
  X,
  Keyboard,
  Trophy,
  LayoutDashboard,
  User,
  Zap,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home", icon: Code2 },
  { href: "/practice", label: "Practice", icon: Keyboard },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
]

function UserAvatar({ user, size = 32 }: { user: { name: string; image?: string | null }; size?: number }) {
  if (user.image) {
    return (
      <Image
        src={user.image}
        alt="Profile"
        width={size}
        height={size}
        className="rounded-full ring-2 ring-primary/30"
      />
    )
  }
  return (
    <motion.div
      className="rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30"
      style={{ width: size, height: size }}
    >
      <User className="w-4 h-4 text-primary" />
    </motion.div>
  )
}

function ProfileDropdown({
  user,
  onLogout,
  align = "right",
}: {
  user: { name: string; email: string; image?: string | null }
  onLogout: () => void
  align?: "right" | "full"
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div className={align === "full" ? "w-full" : "relative"}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 p-1.5 rounded-xl hover:bg-secondary transition-colors ${
          align === "full" ? "w-full" : ""
        }`}
      >
        <UserAvatar user={user} />
        <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ml-auto ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`z-20 glass border border-border rounded-xl shadow-xl overflow-hidden ${
                align === "full"
                  ? "relative mt-2 w-full"
                  : "absolute right-0 top-12 w-56"
              }`}
            >
              <motion.div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </motion.div>

              <motion.div className="py-1">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </motion.div>

              <motion.div className="border-t border-border py-1">
                <button
                  onClick={() => {
                    setOpen(false)
                    onLogout()
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <motion.div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
              <Zap className="relative w-8 h-8 text-primary" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight">
              Code<span className="text-primary">Typing</span>
            </span>
          </Link>

          <motion.div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </motion.div>

          <motion.div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
            ) : isAuthenticated && user ? (
              <ProfileDropdown user={user} onLogout={logout} />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                    <User className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <motion.div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}

              <motion.div className="pt-4 border-t border-border space-y-2">
                {isLoading ? (
                  <motion.div className="h-10 rounded-lg bg-secondary animate-pulse" />
                ) : isAuthenticated && user ? (
                  <ProfileDropdown
                    user={user}
                    onLogout={() => {
                      setIsOpen(false)
                      logout()
                    }}
                    align="full"
                  />
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground">Sign Up</Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
