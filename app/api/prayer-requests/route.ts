import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  message: z.string().min(2, "Message is required"),
});

// No login required — anyone visiting the site can submit this.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;
  await prisma.prayerRequest.create({
    data: { name: name || null, email: email || null, message },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
