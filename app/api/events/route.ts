import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const eventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(2, "Location is required"),
  coverImage: z.string().url().optional().or(z.literal("")),
});

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { date: "asc" } });
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { title, description, date, location, coverImage } = parsed.data;
  const event = await prisma.event.create({
    data: {
      title,
      description: description || null,
      date: new Date(date),
      location,
      coverImage: coverImage || null,
    },
  });

  return NextResponse.json({ event }, { status: 201 });
}
