"use client"

import { AlertTriangle, CheckCircle2, Clock, Inbox } from "lucide-react"
import type { Complaint } from "@/lib/complaints"
import { cn } from "@/lib/utils"

function useStats(complaints: Complaint[]) {
  const total = complaints.length
  const open = complaints.filter((c) => c.status === "open").length
  const inProgress = complaints.filter((c) => c.status === "in-progress").length
  const resolved = complaints.filter(
    (c) => c.status === "resolved" || c.status === "closed",
  ).length
  const critical = complaints.filter((c) => c.priority === "critical").length
  const resolutionRate = total === 0 ? 0 : Math.round((resolved / total) * 100)
  return { total, open, inProgress, resolved, critical, resolutionRate }
}

export function StatCards({ complaints }: { complaints: Complaint[] }) {
  const stats = useStats(complaints)

  const cards = [
    {
      label: "Total Complaints",
      value: stats.total,
      hint: `${stats.critical} critical`,
      icon: Inbox,
      tone: "text-chart-1",
      bg: "bg-chart-1/10",
    },
    {
      label: "Open",
      value: stats.open,
      hint: "Awaiting triage",
      icon: AlertTriangle,
      tone: "text-chart-5",
      bg: "bg-chart-5/10",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      hint: "Being worked on",
      icon: Clock,
      tone: "text-chart-4",
      bg: "bg-chart-4/10",
    },
    {
      label: "Resolution Rate",
      value: `${stats.resolutionRate}%`,
      hint: `${stats.resolved} resolved`,
      icon: CheckCircle2,
      tone: "text-chart-3",
      bg: "bg-chart-3/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-card-foreground">
                {card.value}
              </p>
            </div>
            <div className={cn("rounded-lg p-2.5", card.bg)}>
              <card.icon className={cn("size-5", card.tone)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{card.hint}</p>
        </div>
      ))}
    </div>
  )
}
