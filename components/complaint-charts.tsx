"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  CATEGORIES,
  type Complaint,
  STATUS_LABELS,
  STATUSES,
} from "@/lib/complaints"

const STATUS_COLORS: Record<string, string> = {
  open: "var(--chart-5)",
  "in-progress": "var(--chart-4)",
  resolved: "var(--chart-3)",
  closed: "var(--chart-2)",
}

function ChartCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 h-64">{children}</div>
    </div>
  )
}

function TooltipBox({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-popover-foreground">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-muted-foreground">
          <span
            className="mr-1.5 inline-block size-2 rounded-full align-middle"
            style={{ backgroundColor: entry.color || entry.payload?.fill }}
          />
          {entry.name}: <span className="font-medium text-popover-foreground">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export function ComplaintCharts({ complaints }: { complaints: Complaint[] }) {
  const byCategory = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        name: category.replace(/ &.*/, ""),
        full: category,
        value: complaints.filter((c) => c.category === category).length,
      })).filter((d) => d.value > 0),
    [complaints],
  )

  const byStatus = useMemo(
    () =>
      STATUSES.map((status) => ({
        name: STATUS_LABELS[status],
        key: status,
        value: complaints.filter((c) => c.status === status).length,
      })).filter((d) => d.value > 0),
    [complaints],
  )

  const trend = useMemo(() => {
    const now = new Date("2026-09-15T09:00:00Z")
    const buckets: { name: string; reported: number; resolved: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now)
      day.setDate(day.getDate() - i)
      const key = day.toISOString().slice(0, 10)
      const label = day.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      const reported = complaints.filter((c) => c.createdAt.slice(0, 10) === key).length
      const resolved = complaints.filter(
        (c) =>
          (c.status === "resolved" || c.status === "closed") &&
          c.updatedAt.slice(0, 10) === key,
      ).length
      buckets.push({ name: label, reported, resolved })
    }
    return buckets
  }, [complaints])

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard title="Complaints by Category" description="Distribution across service areas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byCategory} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={54}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip content={<TooltipBox />} cursor={{ fill: "var(--muted)", opacity: 0.5 }} />
            <Bar dataKey="value" name="Complaints" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="By Status" description="Current pipeline breakdown">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<TooltipBox />} />
            <Pie
              data={byStatus}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={88}
              paddingAngle={2}
              strokeWidth={2}
              stroke="var(--card)"
            >
              {byStatus.map((entry) => (
                <Cell key={entry.key} fill={STATUS_COLORS[entry.key]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="-mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {byStatus.map((entry) => (
            <span key={entry.key} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[entry.key] }}
              />
              {entry.name}
            </span>
          ))}
        </div>
      </ChartCard>

      <ChartCard
        title="7-Day Trend"
        description="Reported vs. resolved over the last week"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="gReported" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip content={<TooltipBox />} />
            <Area
              type="monotone"
              dataKey="reported"
              name="Reported"
              stroke="var(--chart-1)"
              fill="url(#gReported)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="var(--chart-3)"
              fill="url(#gResolved)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top Districts" description="Where complaints concentrate">
        <DistrictBars complaints={complaints} />
      </ChartCard>
    </div>
  )
}

function DistrictBars({ complaints }: { complaints: Complaint[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>()
    for (const c of complaints) {
      map.set(c.district, (map.get(c.district) ?? 0) + 1)
    }
    return [...map.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [complaints])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 12, left: 8, bottom: 0 }}
      >
        <XAxis type="number" hide allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          width={72}
        />
        <Tooltip content={<TooltipBox />} cursor={{ fill: "var(--muted)", opacity: 0.5 }} />
        <Bar dataKey="value" name="Complaints" fill="var(--chart-2)" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
