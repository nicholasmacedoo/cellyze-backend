/*
  Warnings:

  - A unique constraint covering the columns `[name_church]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "name_church" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_name_church_key" ON "tenants"("name_church");
