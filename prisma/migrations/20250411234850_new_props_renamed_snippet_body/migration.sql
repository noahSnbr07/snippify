/*
  Warnings:

  - You are about to drop the column `snippet` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `body` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "snippet",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
