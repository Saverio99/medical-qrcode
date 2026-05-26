-- CreateTable
CREATE TABLE "MedicalProfile" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicalProfile_pkey" PRIMARY KEY ("id")
);
