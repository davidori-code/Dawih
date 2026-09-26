import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signSession } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const admin = await prisma.admin.findUnique({ where: { email } });

  // Deliberately vague — we don't want to reveal whether the email
  // exists or the password was wrong.
  const invalidMessage = "Invalid email or password";

  if (!admin) {
    return NextResponse.json({ error: invalidMessage }, { status: 401 });
  }

  const validPassword = await verifyPassword(password, admin.passwordHash);
  if (!validPassword) {
    return NextResponse.json({ error: invalidMessage }, { status: 401 });
  }

  const token = signSession({ adminId: admin.id });

  const response = NextResponse.json({ admin: { id: admin.id, email: admin.email } });

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
