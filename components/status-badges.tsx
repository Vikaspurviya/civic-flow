import {
  type ComplaintPriority,
  type ComplaintStatus,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/lib/complaints"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<ComplaintStatus, string> = {
  open: "bg-chart-5/12 text-chart-5 ring-chart-5/25",
  "in-progress": "bg-chart-4/15 text-chart-4 ring-chart-4/30",
  resolved: "bg-chart-3/15 text-chart-3 ring-chart-3/30",
  closed: "bg-muted text-muted-foreground ring-border",
}

const PRIORITY_STYLES: Record<ComplaintPriority, string> = {
  low: "bg-muted text-muted-foreground ring-border",
  medium: "bg-chart-2/15 text-chart-2 ring-chart-2/30",
  high: "bg-chart-4/15 text-chart-4 ring-chart-4/30",
  critical: "bg-chart-5/15 text-chart-5 ring-chart-5/30",
}

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        STATUS_STYLES[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: ComplaintPriority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        PRIORITY_STYLES[priority],
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
