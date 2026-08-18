-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VALID', 'PREPARE_TO_VALIDATION', 'IN_VALIDATION', 'LOST', 'INVALID', 'CANCELED');

-- CreateTable
CREATE TABLE "Instrument" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "clinicId" TEXT,
    "categoryId" TEXT,
    "modelId" TEXT,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
