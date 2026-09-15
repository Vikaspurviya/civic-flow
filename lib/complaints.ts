export type ComplaintStatus = "open" | "in-progress" | "resolved" | "closed"
export type ComplaintPriority = "low" | "medium" | "high" | "critical"

export type ComplaintCategory =
  | "Roads & Potholes"
  | "Street Lighting"
  | "Water Supply"
  | "Waste Management"
  | "Public Safety"
  | "Parks & Trees"
  | "Noise"
  | "Traffic & Parking"

export type ComplaintUpdate = {
  id: string
  at: string
  author: string
  note: string
}

export type Complaint = {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  location: string
  district: string
  reporter: string
  createdAt: string
  updatedAt: string
  upvotes: number
  updates: ComplaintUpdate[]
}

export const CATEGORIES: ComplaintCategory[] = [
  "Roads & Potholes",
  "Street Lighting",
  "Water Supply",
  "Waste Management",
  "Public Safety",
  "Parks & Trees",
  "Noise",
  "Traffic & Parking",
]

export const DISTRICTS = [
  "Downtown",
  "Riverside",
  "Northgate",
  "Eastwood",
  "Westpark",
  "Hillcrest",
]

export const STATUSES: ComplaintStatus[] = ["open", "in-progress", "resolved", "closed"]
export const PRIORITIES: ComplaintPriority[] = ["low", "medium", "high", "critical"]

export const STATUS_LABELS: Record<ComplaintStatus, string> = {
  open: "Open",
  "in-progress": "In Progress",
  resolved: "Resolved",
  closed: "Closed",
}

export const PRIORITY_LABELS: Record<ComplaintPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
}

// deterministic id generator for demo data
let counter = 1000
function nextId() {
  counter += 1
  return `C-${counter}`
}

function daysAgo(days: number) {
  const d = new Date("2026-09-15T09:00:00Z")
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

const REPORTERS = [
  "A. Sharma",
  "M. Okafor",
  "L. Chen",
  "R. Patel",
  "S. Nguyen",
  "J. Alvarez",
  "K. Novak",
  "T. Iversen",
  "D. Rossi",
  "P. Haddad",
]

type Seed = {
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  location: string
  district: string
  age: number
  upvotes: number
}

const SEEDS: Seed[] = [
  {
    title: "Large pothole on Main St near 4th Ave",
    description:
      "A deep pothole has formed in the eastbound lane. Several cars have been damaged and it is a hazard during rain.",
    category: "Roads & Potholes",
    status: "in-progress",
    priority: "high",
    location: "Main St & 4th Ave",
    district: "Downtown",
    age: 3,
    upvotes: 42,
  },
  {
    title: "Street light out for over a week",
    description: "The light on the corner has been dark for 8 nights, making the crosswalk unsafe.",
    category: "Street Lighting",
    status: "open",
    priority: "medium",
    location: "Elm St & Park Rd",
    district: "Riverside",
    age: 8,
    upvotes: 17,
  },
  {
    title: "Water main leak flooding sidewalk",
    description: "Continuous water flow from under the pavement. Sidewalk is icy in the morning.",
    category: "Water Supply",
    status: "in-progress",
    priority: "critical",
    location: "River Rd 220",
    district: "Riverside",
    age: 1,
    upvotes: 63,
  },
  {
    title: "Missed garbage collection on Cedar Lane",
    description: "Bins were not collected on the scheduled day for the entire block.",
    category: "Waste Management",
    status: "resolved",
    priority: "low",
    location: "Cedar Lane",
    district: "Northgate",
    age: 12,
    upvotes: 9,
  },
  {
    title: "Broken glass in children's playground",
    description: "Shattered bottles near the swings. Needs urgent cleanup before weekend.",
    category: "Public Safety",
    status: "open",
    priority: "high",
    location: "Northgate Community Park",
    district: "Northgate",
    age: 2,
    upvotes: 28,
  },
  {
    title: "Fallen tree blocking bike path",
    description: "A large branch came down after the storm and blocks the entire path.",
    category: "Parks & Trees",
    status: "resolved",
    priority: "medium",
    location: "Greenway Trail km 3",
    district: "Eastwood",
    age: 6,
    upvotes: 21,
  },
  {
    title: "Loud construction before permitted hours",
    description: "Heavy machinery starts at 5:30am, well before the allowed 7am start.",
    category: "Noise",
    status: "closed",
    priority: "low",
    location: "Westpark Ave 88",
    district: "Westpark",
    age: 20,
    upvotes: 6,
  },
  {
    title: "Traffic signal stuck on red",
    description: "Intersection signal not cycling, causing long backups during rush hour.",
    category: "Traffic & Parking",
    status: "in-progress",
    priority: "high",
    location: "Hill Rd & Center St",
    district: "Hillcrest",
    age: 1,
    upvotes: 55,
  },
  {
    title: "Overflowing public trash bins downtown",
    description: "Bins near the transit stop overflow daily and attract pests.",
    category: "Waste Management",
    status: "open",
    priority: "medium",
    location: "Downtown Transit Plaza",
    district: "Downtown",
    age: 4,
    upvotes: 33,
  },
  {
    title: "Cracked and uneven sidewalk",
    description: "Raised slabs are a tripping hazard for elderly residents.",
    category: "Roads & Potholes",
    status: "open",
    priority: "low",
    location: "Eastwood Blvd 12",
    district: "Eastwood",
    age: 15,
    upvotes: 11,
  },
  {
    title: "No water pressure in apartments",
    description: "Entire building reports very low pressure since yesterday morning.",
    category: "Water Supply",
    status: "in-progress",
    priority: "high",
    location: "Hillcrest Towers",
    district: "Hillcrest",
    age: 2,
    upvotes: 47,
  },
  {
    title: "Graffiti on underpass walls",
    description: "Extensive tagging appeared over the weekend on both walls.",
    category: "Public Safety",
    status: "resolved",
    priority: "low",
    location: "5th St Underpass",
    district: "Downtown",
    age: 9,
    upvotes: 8,
  },
  {
    title: "Illegally parked cars blocking hydrant",
    description: "Vehicles repeatedly park in front of the fire hydrant overnight.",
    category: "Traffic & Parking",
    status: "open",
    priority: "medium",
    location: "Riverside Dr 45",
    district: "Riverside",
    age: 5,
    upvotes: 14,
  },
  {
    title: "Dead street light causing dark alley",
    description: "Alley behind the market is completely dark at night.",
    category: "Street Lighting",
    status: "resolved",
    priority: "medium",
    location: "Market Alley",
    district: "Westpark",
    age: 11,
    upvotes: 19,
  },
  {
    title: "Broken park bench and litter",
    description: "Bench is splintered and unusable; surrounding area has trash buildup.",
    category: "Parks & Trees",
    status: "open",
    priority: "low",
    location: "Westpark Green",
    district: "Westpark",
    age: 7,
    upvotes: 5,
  },
  {
    title: "Sinkhole forming on residential road",
    description: "A depression is widening in the middle of the road and looks dangerous.",
    category: "Roads & Potholes",
    status: "in-progress",
    priority: "critical",
    location: "Northgate Cres 30",
    district: "Northgate",
    age: 1,
    upvotes: 71,
  },
  {
    title: "Persistent barking from vacant lot",
    description: "Loud noise late at night from an unattended property.",
    category: "Noise",
    status: "closed",
    priority: "low",
    location: "Eastwood Lane 9",
    district: "Eastwood",
    age: 18,
    upvotes: 3,
  },
  {
    title: "Flooded storm drain after rain",
    description: "Drain is clogged with leaves, causing pooling at the bus stop.",
    category: "Water Supply",
    status: "open",
    priority: "medium",
    location: "Center St & 9th",
    district: "Downtown",
    age: 3,
    upvotes: 22,
  },
  {
    title: "Faded pedestrian crossing markings",
    description: "Crosswalk paint is nearly invisible, unsafe near the school.",
    category: "Traffic & Parking",
    status: "resolved",
    priority: "medium",
    location: "School Zone, Hill Rd",
    district: "Hillcrest",
    age: 14,
    upvotes: 26,
  },
  {
    title: "Dumped furniture on curb",
    description: "Old couch and mattress left on the sidewalk for over a week.",
    category: "Waste Management",
    status: "open",
    priority: "low",
    location: "Riverside Dr 210",
    district: "Riverside",
    age: 6,
    upvotes: 7,
  },
]

function buildUpdates(seed: Seed, id: string): ComplaintUpdate[] {
  const updates: ComplaintUpdate[] = [
    {
      id: `${id}-u1`,
      at: daysAgo(seed.age),
      author: "System",
      note: "Complaint received and logged.",
    },
  ]
  if (seed.status !== "open") {
    updates.push({
      id: `${id}-u2`,
      at: daysAgo(Math.max(0, seed.age - 1)),
      author: "Dispatch",
      note: "Assigned to the responsible city department for review.",
    })
  }
  if (seed.status === "in-progress") {
    updates.push({
      id: `${id}-u3`,
      at: daysAgo(Math.max(0, seed.age - 1)),
      author: "Field Team",
      note: "Crew dispatched; work is underway on site.",
    })
  }
  if (seed.status === "resolved" || seed.status === "closed") {
    updates.push({
      id: `${id}-u3`,
      at: daysAgo(Math.max(0, seed.age - 2)),
      author: "Field Team",
      note: "Issue addressed and verified on site.",
    })
  }
  if (seed.status === "closed") {
    updates.push({
      id: `${id}-u4`,
      at: daysAgo(Math.max(0, seed.age - 3)),
      author: "Supervisor",
      note: "Case closed after confirmation.",
    })
  }
  return updates
}

export const DEMO_COMPLAINTS: Complaint[] = SEEDS.map((seed, i) => {
  const id = nextId()
  const updatedDays = seed.status === "open" ? seed.age : Math.max(0, seed.age - 1)
  return {
    id,
    title: seed.title,
    description: seed.description,
    category: seed.category,
    status: seed.status,
    priority: seed.priority,
    location: seed.location,
    district: seed.district,
    reporter: REPORTERS[i % REPORTERS.length],
    createdAt: daysAgo(seed.age),
    updatedAt: daysAgo(updatedDays),
    upvotes: seed.upvotes,
    updates: buildUpdates(seed, id),
  }
})

export function newComplaintId() {
  return `C-${Date.now().toString().slice(-6)}`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
