import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const ministrySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(2, "Description is required"),
  leader: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
});

export async function GET() {
  const ministries = await prisma.ministry.findMany();
  return NextResponse.json({ ministries });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = ministrySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { name, description, leader, coverImage } = parsed.data;
  const ministry = await prisma.ministry.create({
    data: { name, description, leader: leader || null, coverImage: coverImage || null },
  });

  return NextResponse.json({ ministry }, { status: 201 });
}
