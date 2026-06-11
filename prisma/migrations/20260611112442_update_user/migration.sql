/*
  Warnings:

  - You are about to drop the column `updatedBy` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[createdById]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedById]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedBy",
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_createdById_key" ON "User"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "User_updatedById_key" ON "User"("updatedById");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
