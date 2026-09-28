/*
  Warnings:

  - You are about to drop the column `image` on the `Ministry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ministry" DROP COLUMN "image",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "leader" TEXT;
