-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL,
    "nanoid" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "useCase" TEXT NOT NULL,
    "monthlyCost" DOUBLE PRECISION NOT NULL,
    "recommendation" TEXT NOT NULL,
    "savings" DOUBLE PRECISION NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audit_nanoid_key" ON "Audit"("nanoid");
