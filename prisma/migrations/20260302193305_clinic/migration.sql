-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_clinicId_fkey";

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "clinicId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
