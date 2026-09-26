import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Setting maxAge to 0 tells the browser to delete the cookie immediately.
  response.cookies.set("session", "", { path: "/", maxAge: 0 });
  return response;
}
