"use client"

import { Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-store"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export function AuthGate() {
  const { user, ready } = useAuth()

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading</span>
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginPage />
}
