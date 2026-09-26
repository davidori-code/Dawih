import { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

// Reused by every route that creates/edits/deletes content — anyone can
// READ sermons/events/announcements, but only a signed-in admin can write.
export function requireAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("session")?.value;
  const session = token ? verifySession(token) : null;
  return session !== null;
}
