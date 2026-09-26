import "dotenv/config";
// Run with: npx tsx prisma/seed.ts
// Creates the single admin account you'll log in with.
// Change the email/password below before running, or set them via
// env vars ADMIN_EMAIL / ADMIN_PASSWORD.

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin ready: ${admin.email}`);
  console.log(`Log in with password: ${password}`);
  console.log("Change this password by re-running the seed with a new ADMIN_PASSWORD.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
