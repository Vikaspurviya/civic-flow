"use client"

import { useMemo, useState } from "react"
import { Building2, LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCards } from "@/components/stat-cards"
import { ComplaintCharts } from "@/components/complaint-charts"
import { ComplaintsTable } from "@/components/complaints-table"
import { ComplaintDetail } from "@/components/complaint-detail"
import { SubmitComplaint } from "@/components/submit-complaint"
import { useComplaints } from "@/components/complaint-store"
import { useAuth } from "@/components/auth-store"

export function Dashboard() {
  const { complaints } = useComplaints()
  const { user, signOut } = useAuth()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [submitOpen, setSubmitOpen] = useState(false)

  const selected = useMemo(
    () => complaints.find((c) => c.id === selectedId) ?? null,
    [complaints, selectedId],
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">CityDesk</h1>
              <p className="text-xs text-muted-foreground">Smart City Complaint Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button onClick={() => setSubmitOpen(true)}>
              <Plus className="size-4" />
              <span className="hidden sm:inline">New complaint</span>
              <span className="sm:hidden">New</span>
            </Button>
            <div className="hidden items-center gap-2 border-l border-border pl-3 sm:flex">
              <div className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {(user?.name ?? "?")
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-medium text-foreground">{user?.name}</p>
                <p className="text-[11px] text-muted-foreground">{user?.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out" title="Sign out">
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <section>
          <h2 className="sr-only">Overview</h2>
          <StatCards complaints={complaints} />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-foreground">Analytics</h2>
          <ComplaintCharts complaints={complaints} />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-foreground">All complaints</h2>
          <ComplaintsTable complaints={complaints} onSelect={(c) => setSelectedId(c.id)} />
        </section>
      </main>

      <ComplaintDetail complaint={selected} onClose={() => setSelectedId(null)} />
      <SubmitComplaint open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  )
}
