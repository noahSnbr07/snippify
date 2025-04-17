/*
  Warnings:

  - The values [js,ts,jav,py,prisma,c,elixir] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('javascript', 'typescript', 'jsx', 'tsx', 'python', 'java', 'cpp', 'cs', 'csharp', 'php', 'ruby', 'golang', 'rust', 'swift', 'kotlin', 'sql', 'bash', 'shell', 'html', 'css', 'json', 'yaml', 'yml', 'xml');
ALTER TABLE "Snippet" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropTable
DROP TABLE "Comment";
