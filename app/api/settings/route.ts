import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const settingsSchema = z.object({
  heroImage: z.string().url().optional().or(z.literal("")),
  aboutImage: z.string().url().optional().or(z.literal("")),
});

// Public — the homepage and about page both read this.
export async function GET() {
  // There's only ever one row. Create it on first request if it
  // doesn't exist yet, so callers don't have to handle "null".
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: {} });
  }
  return NextResponse.json({ settings });
}

// Admin-only — updates whichever image(s) are included in the body.
export async function PUT(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: {} });
  }

  const updated = await prisma.siteSettings.update({
    where: { id: settings.id },
    data: parsed.data,
  });

  return NextResponse.json({ settings: updated });
}
