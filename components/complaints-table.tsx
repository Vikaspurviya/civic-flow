"use client"

import { useMemo, useState } from "react"
import { ArrowUpDown, ChevronUp, Search } from "lucide-react"
import { PriorityBadge, StatusBadge } from "@/components/status-badges"
import {
  CATEGORIES,
  type Complaint,
  type ComplaintPriority,
  type ComplaintStatus,
  DISTRICTS,
  formatDate,
  PRIORITIES,
  PRIORITY_LABELS,
  STATUS_LABELS,
  STATUSES,
} from "@/lib/complaints"
import { cn } from "@/lib/utils"

const fieldClass =
  "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

type SortKey = "createdAt" | "priority" | "upvotes" | "status"

const PRIORITY_ORDER: Record<ComplaintPriority, number> = {
  critical: 3,
  high: 2,
  medium: 1,
  low: 0,
}

const STATUS_ORDER: Record<ComplaintStatus, number> = {
  open: 0,
  "in-progress": 1,
  resolved: 2,
  closed: 3,
}

export function ComplaintsTable({
  complaints,
  onSelect,
}: {
  complaints: Complaint[]
  onSelect: (c: Complaint) => void
}) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | ComplaintStatus>("all")
  const [priority, setPriority] = useState<"all" | ComplaintPriority>("all")
  const [category, setCategory] = useState<"all" | string>("all")
  const [district, setDistrict] = useState<"all" | string>("all")
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = complaints.filter((c) => {
      if (status !== "all" && c.status !== status) return false
      if (priority !== "all" && c.priority !== priority) return false
      if (category !== "all" && c.category !== category) return false
      if (district !== "all" && c.district !== district) return false
      if (q) {
        const hay = `${c.title} ${c.description} ${c.location} ${c.id} ${c.reporter}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    const dir = sortDir === "asc" ? 1 : -1
    return list.sort((a, b) => {
      let cmp = 0
      if (sortKey === "createdAt") cmp = a.createdAt.localeCompare(b.createdAt)
      else if (sortKey === "priority") cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      else if (sortKey === "upvotes") cmp = a.upvotes - b.upvotes
      else if (sortKey === "status") cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      return cmp * dir
    })
  }, [complaints, query, status, priority, category, district, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const activeFilters =
    (status !== "all" ? 1 : 0) +
    (priority !== "all" ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (district !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0)

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className={cn(fieldClass, "w-full pl-9")}
              placeholder="Search complaints, locations, IDs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search complaints"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className={fieldClass}
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <select
              className={fieldClass}
              value={priority}
              onChange={(e) => setPriority(e.target.value as typeof priority)}
              aria-label="Filter by priority"
            >
              <option value="all">All priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
            <select
              className={fieldClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className={fieldClass}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              aria-label="Filter by district"
            >
              <option value="all">All districts</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {complaints.length} complaints
          {activeFilters > 0 ? ` · ${activeFilters} filter${activeFilters === 1 ? "" : "s"} active` : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Complaint</th>
              <th className="px-4 py-3 font-medium">
                <SortButton label="Status" active={sortKey === "status"} dir={sortDir} onClick={() => toggleSort("status")} />
              </th>
              <th className="px-4 py-3 font-medium">
                <SortButton label="Priority" active={sortKey === "priority"} dir={sortDir} onClick={() => toggleSort("priority")} />
              </th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">District</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                <SortButton label="Reported" active={sortKey === "createdAt"} dir={sortDir} onClick={() => toggleSort("createdAt")} />
              </th>
              <th className="px-4 py-3 text-right font-medium">
                <SortButton label="Upvotes" active={sortKey === "upvotes"} dir={sortDir} onClick={() => toggleSort("upvotes")} align="end" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelect(c)}
                className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-card-foreground">{c.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    <span className="font-mono">{c.id}</span> · {c.category} · {c.location}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={c.priority} />
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{c.district}</td>
                <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                  {formatDate(c.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center justify-end gap-1 font-medium text-card-foreground">
                    <ChevronUp className="size-3.5 text-muted-foreground" />
                    {c.upvotes}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No complaints match your filters.
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SortButton({
  label,
  active,
  dir,
  onClick,
  align = "start",
}: {
  label: string
  active: boolean
  dir: "asc" | "desc"
  onClick: () => void
  align?: "start" | "end"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 font-medium transition-colors hover:text-foreground",
        active && "text-foreground",
        align === "end" && "flex-row-reverse",
      )}
    >
      {label}
      <ArrowUpDown className={cn("size-3", active && dir === "asc" && "rotate-180")} />
    </button>
  )
}
