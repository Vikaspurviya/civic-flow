import { AuthProvider } from "@/components/auth-store"
import { AuthGate } from "@/components/auth-gate"
import { ComplaintStoreProvider } from "@/components/complaint-store"

export default function Page() {
  return (
    <AuthProvider>
      <ComplaintStoreProvider>
        <AuthGate />
      </ComplaintStoreProvider>
    </AuthProvider>
  )
}
