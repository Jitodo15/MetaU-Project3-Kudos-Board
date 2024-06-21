-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_authorId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
