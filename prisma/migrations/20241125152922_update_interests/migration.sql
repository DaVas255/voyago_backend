/*
  Warnings:

  - You are about to drop the `OrderInterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderInterest" DROP CONSTRAINT "OrderInterest_interestId_fkey";

-- DropForeignKey
ALTER TABLE "OrderInterest" DROP CONSTRAINT "OrderInterest_orderId_fkey";

-- DropIndex
DROP INDEX "Interest_name_key";

-- DropTable
DROP TABLE "OrderInterest";

-- CreateTable
CREATE TABLE "_OrderInterests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderInterests_AB_unique" ON "_OrderInterests"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderInterests_B_index" ON "_OrderInterests"("B");

-- AddForeignKey
ALTER TABLE "_OrderInterests" ADD CONSTRAINT "_OrderInterests_A_fkey" FOREIGN KEY ("A") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderInterests" ADD CONSTRAINT "_OrderInterests_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
