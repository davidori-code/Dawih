import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const sermonSchema = z.object({
  title: z.string().min(2, "Title is required"),
  speaker: z.string().min(2, "Speaker is required"),
  series: z.string().optional(),
  description: z.string().optional(),
  videoUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  coverImage: z.string().url().optional().or(z.literal("")),
  date: z.string().min(1, "Date is required"),
});

// Public — anyone visiting the site can see the sermon list.
export async function GET() {
  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json({ sermons });
}

// Admin-only — creates a new sermon.
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = sermonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { title, speaker, series, description, videoUrl, coverImage, date } = parsed.data;
  const sermon = await prisma.sermon.create({
    data: {
      title,
      speaker,
      series: series || null,
      description: description || null,
      videoUrl: videoUrl || null,
      coverImage: coverImage || null,
      date: new Date(date),
    },
  });

  return NextResponse.json({ sermon }, { status: 201 });
}
