-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERUSER', 'ADMIN', 'ENGINEER');

-- CreateTable
CREATE TABLE "Engineer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "version" SERIAL NOT NULL,

    CONSTRAINT "Engineer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Engineer_login_key" ON "Engineer"("login");
