-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "coverImage" TEXT;

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "heroImage" TEXT,
    "aboutImage" TEXT,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
