/*
  Warnings:

  - The `age` column on the `Artist` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER,
ALTER COLUMN "bio" DROP NOT NULL;
