"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import {
  type Complaint,
  type ComplaintStatus,
  DEMO_COMPLAINTS,
  newComplaintId,
} from "@/lib/complaints"

type NewComplaintInput = Pick<
  Complaint,
  "title" | "description" | "category" | "priority" | "location" | "district" | "reporter"
>

type StoreValue = {
  complaints: Complaint[]
  addComplaint: (input: NewComplaintInput) => Complaint
  updateStatus: (id: string, status: ComplaintStatus, note?: string) => void
  upvote: (id: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function ComplaintStoreProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(DEMO_COMPLAINTS)

  const addComplaint = useCallback((input: NewComplaintInput) => {
    const now = new Date().toISOString()
    const id = newComplaintId()
    const complaint: Complaint = {
      ...input,
      id,
      status: "open",
      createdAt: now,
      updatedAt: now,
      upvotes: 0,
      updates: [
        {
          id: `${id}-u1`,
          at: now,
          author: "System",
          note: "Complaint received and logged.",
        },
      ],
    }
    setComplaints((prev) => [complaint, ...prev])
    return complaint
  }, [])

  const updateStatus = useCallback((id: string, status: ComplaintStatus, note?: string) => {
    const now = new Date().toISOString()
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        return {
          ...c,
          status,
          updatedAt: now,
          updates: [
            ...c.updates,
            {
              id: `${id}-u${c.updates.length + 1}`,
              at: now,
              author: "Operator",
              note: note?.trim() ? note.trim() : `Status changed to ${status}.`,
            },
          ],
        }
      }),
    )
  }, [])

  const upvote = useCallback((id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c)),
    )
  }, [])

  const value = useMemo(
    () => ({ complaints, addComplaint, updateStatus, upvote }),
    [complaints, addComplaint, updateStatus, upvote],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useComplaints() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useComplaints must be used within ComplaintStoreProvider")
  return ctx
}
