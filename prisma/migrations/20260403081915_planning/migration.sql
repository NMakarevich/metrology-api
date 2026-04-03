-- AlterTable
ALTER TABLE "Instrument" ADD COLUMN     "planningCategoriesId" TEXT;

-- AlterTable
ALTER TABLE "Verification" ALTER COLUMN "status" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Planning" (
    "year" INTEGER NOT NULL,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "PlanningCategories" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "categoryId" TEXT,
    "planningYear" INTEGER,

    CONSTRAINT "PlanningCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Planning_year_key" ON "Planning"("year");

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_planningCategoriesId_fkey" FOREIGN KEY ("planningCategoriesId") REFERENCES "PlanningCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningCategories" ADD CONSTRAINT "PlanningCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningCategories" ADD CONSTRAINT "PlanningCategories_planningYear_fkey" FOREIGN KEY ("planningYear") REFERENCES "Planning"("year") ON DELETE SET NULL ON UPDATE CASCADE;
