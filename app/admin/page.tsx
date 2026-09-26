import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";

// This check now runs on the normal server, not in Next.js's Edge
// Runtime middleware — sidestepping the Edge-compatibility issues
// that were causing the login redirect to silently fail.
export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/login");
  }

  return <AdminDashboardClient />;
}
