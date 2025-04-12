-- CreateEnum
CREATE TYPE "Extension" AS ENUM ('js', 'ts', 'jsx', 'tsx', 'jav', 'cpp', 'cs', 'py', 'php');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('JavaScript', 'TypeScript', 'JavaScript_XML', 'TypeScript_XML', 'JAVA', 'C_PLUS_PLUS', 'CSHARP', 'PYTHON', 'PHP');

-- CreateTable
CREATE TABLE "Snippet" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "extension" "Extension" NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_id_key" ON "Snippet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_slug_key" ON "Snippet"("slug");
