-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('READY_TO_VALIDATION', 'IN_VALIDATION', 'PAID', 'DONE');

-- AlterTable
ALTER TABLE "Instrument" ADD COLUMN     "verificationId" TEXT;

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "account" DOUBLE PRECISION,
    "accountId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT,
    "status" "VerificationStatus" NOT NULL DEFAULT 'READY_TO_VALIDATION',

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "Verification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
