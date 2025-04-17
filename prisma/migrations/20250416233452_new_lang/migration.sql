/*
  Warnings:

  - The values [golang,shell,yaml,yml,xml] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('bash', 'c', 'cpp', 'cs', 'csharp', 'css', 'csv', 'dart', 'go', 'html', 'java', 'javascript', 'json', 'jsx', 'kotlin', 'php', 'prisma', 'python', 'ruby', 'rust', 'sass', 'sql', 'svelte', 'swift', 'tsx', 'typescript');
ALTER TABLE "Snippet" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;
