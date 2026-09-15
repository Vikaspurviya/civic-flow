"use client"

import { useState } from "react"
import { Building2, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEMO_CREDENTIALS, useAuth } from "@/components/auth-store"

export function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    // Simulate a brief network round-trip for a realistic feel.
    setTimeout(() => {
      const result = signIn(email, password)
      if (!result.ok) {
        setError(result.error ?? "Unable to sign in.")
        setLoading(false)
      }
    }, 500)
  }

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setError(null)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/15">
            <Building2 className="size-5" />
          </div>
          <span className="text-base font-semibold">CityDesk</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-pretty text-3xl font-semibold leading-tight">
            Keep the city running, one resolved complaint at a time.
          </h2>
          <p className="max-w-md text-sm text-primary-foreground/80">
            Track, triage, and resolve civic issues across every district with live stats and analytics in a single
            operations hub.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
          <ShieldCheck className="size-4" />
          Authorized municipal staff only
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary-foreground/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-primary-foreground/10 blur-3xl"
        />
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">CityDesk</h1>
              <p className="text-xs text-muted-foreground">Smart City Complaint Dashboard</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold text-foreground">Sign in</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@citydesk.gov"
                className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus-visible:ring-2"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 w-full rounded-md border border-input bg-card px-3 pr-10 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus-visible:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
            <p className="mb-1 font-medium text-foreground">Demo credentials</p>
            <p>Email: {DEMO_CREDENTIALS.email}</p>
            <p>Password: {DEMO_CREDENTIALS.password}</p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2 font-medium text-primary underline-offset-2 hover:underline"
            >
              Fill demo credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
