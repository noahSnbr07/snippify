/*
  Warnings:

  - The `tags` column on the `Snippet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "tags",
ADD COLUMN     "tags" "Tag"[];
