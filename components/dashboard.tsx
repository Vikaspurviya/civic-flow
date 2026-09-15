"use client"

import { useMemo, useState } from "react"
import { Building2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCards } from "@/components/stat-cards"
import { ComplaintCharts } from "@/components/complaint-charts"
import { ComplaintsTable } from "@/components/complaints-table"
import { ComplaintDetail } from "@/components/complaint-detail"
import { SubmitComplaint } from "@/components/submit-complaint"
import { useComplaints } from "@/components/complaint-store"

export function Dashboard() {
  const { complaints } = useComplaints()
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
          <Button onClick={() => setSubmitOpen(true)}>
            <Plus className="size-4" />
            <span className="hidden sm:inline">New complaint</span>
            <span className="sm:hidden">New</span>
          </Button>
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
