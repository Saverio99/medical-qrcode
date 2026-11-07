/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `MedicalProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MedicalProfile_userId_key" ON "MedicalProfile"("userId");
