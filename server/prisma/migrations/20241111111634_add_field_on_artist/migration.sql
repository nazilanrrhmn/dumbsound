/*
  Warnings:

  - You are about to drop the column `profileUrl` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `age` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "typeArtist" AS ENUM ('SOLO', 'DUO', 'GROUP');

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "profileUrl",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "type" "typeArtist" NOT NULL;
