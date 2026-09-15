"use client"

import { useState } from "react"
import { ChevronUp, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { PriorityBadge, StatusBadge } from "@/components/status-badges"
import { useComplaints } from "@/components/complaint-store"
import {
  type Complaint,
  type ComplaintStatus,
  formatDate,
  formatDateTime,
  STATUS_LABELS,
  STATUSES,
} from "@/lib/complaints"

export function ComplaintDetail({
  complaint,
  onClose,
}: {
  complaint: Complaint | null
  onClose: () => void
}) {
  const { updateStatus, upvote } = useComplaints()
  const [note, setNote] = useState("")

  if (!complaint) return null

  return (
    <Modal open={!!complaint} onClose={onClose} title={complaint.title}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            {complaint.category}
          </span>
          <span className="ml-auto font-mono text-xs text-muted-foreground">{complaint.id}</span>
        </div>

        <p className="text-sm leading-relaxed text-card-foreground">{complaint.description}</p>

        <div className="grid grid-cols-1 gap-3 rounded-lg bg-muted/50 p-4 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            <span className="text-card-foreground">
              {complaint.location}, {complaint.district}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="size-4 shrink-0" />
            <span className="text-card-foreground">{complaint.reporter}</span>
          </div>
          <div className="text-muted-foreground">
            Reported <span className="text-card-foreground">{formatDate(complaint.createdAt)}</span>
          </div>
          <div className="text-muted-foreground">
            Updated <span className="text-card-foreground">{formatDate(complaint.updatedAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => upvote(complaint.id)}>
            <ChevronUp className="size-4" />
            Upvote
          </Button>
          <span className="text-sm text-muted-foreground">
            {complaint.upvotes} resident{complaint.upvotes === 1 ? "" : "s"} affected
          </span>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-card-foreground">Activity timeline</h3>
          <ol className="space-y-3">
            {complaint.updates.map((u, i) => (
              <li key={u.id} className="relative flex gap-3 pl-1">
                <div className="flex flex-col items-center">
                  <span className="mt-1 size-2.5 rounded-full bg-primary" aria-hidden />
                  {i < complaint.updates.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-border" aria-hidden />
                  ) : null}
                </div>
                <div className="pb-1">
                  <p className="text-sm text-card-foreground">{u.note}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {u.author} · {formatDateTime(u.at)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-2 text-sm font-semibold text-card-foreground">Update status</h3>
          <textarea
            className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            rows={2}
            placeholder="Add an optional note about this change…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={complaint.status === s ? "default" : "outline"}
                disabled={complaint.status === s}
                onClick={() => {
                  updateStatus(complaint.id, s as ComplaintStatus, note)
                  setNote("")
                }}
              >
                {STATUS_LABELS[s]}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
