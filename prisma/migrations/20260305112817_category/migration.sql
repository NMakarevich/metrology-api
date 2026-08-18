/*
  Warnings:

  - You are about to drop the `CategoriesInClinic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesInClinic" DROP CONSTRAINT "CategoriesInClinic_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesInClinic" DROP CONSTRAINT "CategoriesInClinic_clinicId_fkey";

-- DropTable
DROP TABLE "CategoriesInClinic";

-- CreateTable
CREATE TABLE "_CategoryToClinic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToClinic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToClinic_B_index" ON "_CategoryToClinic"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToClinic" ADD CONSTRAINT "_CategoryToClinic_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToClinic" ADD CONSTRAINT "_CategoryToClinic_B_fkey" FOREIGN KEY ("B") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
