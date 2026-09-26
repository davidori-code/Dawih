import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
