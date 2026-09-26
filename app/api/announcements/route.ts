import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const announcementSchema = z.object({
  title: z.string().min(2, "Title is required"),
  body: z.string().min(2, "Body is required"),
  isPinned: z.boolean().optional(),
});

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ announcements });
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const announcement = await prisma.announcement.create({
    data: parsed.data,
  });

  return NextResponse.json({ announcement }, { status: 201 });
}
