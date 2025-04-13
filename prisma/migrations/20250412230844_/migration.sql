/*
  Warnings:

  - The values [JavaScript,TypeScript,JavaScript_XML,TypeScript_XML,JAVA,C_PLUS_PLUS,CSHARP,PYTHON,PHP] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `extension` on the `Snippet` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('js', 'ts', 'jsx', 'tsx', 'jav', 'cpp', 'cs', 'py', 'php', 'css', 'html', 'prisma');
ALTER TABLE "Snippet" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "extension";

-- DropEnum
DROP TYPE "Extension";
