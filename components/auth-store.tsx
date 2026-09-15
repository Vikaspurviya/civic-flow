"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type AuthUser = {
  name: string
  email: string
  role: string
}

type AuthContextValue = {
  user: AuthUser | null
  ready: boolean
  signIn: (email: string, password: string) => { ok: boolean; error?: string }
  signOut: () => void
}

const STORAGE_KEY = "citydesk.auth"

// Demo credentials — client-side only, for preview purposes.
const DEMO_EMAIL = "admin@citydesk.gov"
const DEMO_PASSWORD = "city123"

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as AuthUser)
    } catch {
      // ignore malformed storage
    }
    setReady(true)
  }, [])

  const signIn = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase()
    if (normalized !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return { ok: false, error: "Invalid email or password." }
    }
    const next: AuthUser = { name: "City Administrator", email: DEMO_EMAIL, role: "Operations Lead" }
    setUser(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore storage failures
    }
    return { ok: true }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore storage failures
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}

export const DEMO_CREDENTIALS = { email: DEMO_EMAIL, password: DEMO_PASSWORD }
