-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('web', 'native', 'backend', 'frontend', 'fullstack', 'asynchronous', 'database', 'config', 'server', 'client', 'middleware', 'devops', 'auth', 'api');

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "tags" TEXT[];
