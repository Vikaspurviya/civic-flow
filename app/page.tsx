import { ComplaintStoreProvider } from "@/components/complaint-store"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <ComplaintStoreProvider>
      <Dashboard />
    </ComplaintStoreProvider>
  )
}
