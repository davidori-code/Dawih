import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Reuse the same client across hot reloads in development so we don't
// open a new database connection on every file save.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
