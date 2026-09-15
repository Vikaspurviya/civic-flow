"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { useComplaints } from "@/components/complaint-store"
import {
  CATEGORIES,
  type ComplaintCategory,
  type ComplaintPriority,
  DISTRICTS,
  PRIORITIES,
  PRIORITY_LABELS,
} from "@/lib/complaints"

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

const labelClass = "mb-1.5 block text-sm font-medium text-foreground"

export function SubmitComplaint({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { addComplaint } = useComplaints()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<ComplaintCategory>(CATEGORIES[0])
  const [priority, setPriority] = useState<ComplaintPriority>("medium")
  const [district, setDistrict] = useState(DISTRICTS[0])
  const [location, setLocation] = useState("")
  const [reporter, setReporter] = useState("")
  const [error, setError] = useState("")

  function reset() {
    setTitle("")
    setDescription("")
    setCategory(CATEGORIES[0])
    setPriority("medium")
    setDistrict(DISTRICTS[0])
    setLocation("")
    setReporter("")
    setError("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !location.trim()) {
      setError("Please fill in the title, description, and location.")
      return
    }
    addComplaint({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      district,
      location: location.trim(),
      reporter: reporter.trim() || "Anonymous",
    })
    reset()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="File a new complaint"
      description="Report a civic issue for the city to review and resolve."
      footer={
        <>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="submit-complaint-form">
            Submit complaint
          </Button>
        </>
      }
    >
      <form id="submit-complaint-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="c-title" className={labelClass}>
            Title
          </label>
          <input
            id="c-title"
            className={fieldClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Pothole on Main Street"
          />
        </div>

        <div>
          <label htmlFor="c-desc" className={labelClass}>
            Description
          </label>
          <textarea
            id="c-desc"
            className={fieldClass}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue, when it started, and any hazards."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-category" className={labelClass}>
              Category
            </label>
            <select
              id="c-category"
              className={fieldClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="c-priority" className={labelClass}>
              Priority
            </label>
            <select
              id="c-priority"
              className={fieldClass}
              value={priority}
              onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-district" className={labelClass}>
              District
            </label>
            <select
              id="c-district"
              className={fieldClass}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="c-location" className={labelClass}>
              Location
            </label>
            <input
              id="c-location"
              className={fieldClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Street & cross street"
            />
          </div>
        </div>

        <div>
          <label htmlFor="c-reporter" className={labelClass}>
            Your name <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="c-reporter"
            className={fieldClass}
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
            placeholder="Anonymous"
          />
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </Modal>
  )
}
