import { Tag } from "@prisma/client";
import Snippet from "./components/snippet";
import database from "@/config/database";
import paginationConfig from "@/config/pagination";

export default async function index({ searchParams }: { searchParams: Promise<{ query?: string; tag?: Tag; page?: number; }> }) {
  const { query, tag, page = 0 } = await searchParams;

  const limit = paginationConfig.results;
  const safeQuery = query ?? "";

  const snippets = await database.snippet.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: safeQuery,
                mode: "insensitive"
              }
            },
            {
              description: {
                contains: safeQuery,
                mode: "insensitive"
              }
            },
          ],
        },
        ...(tag ? [
          {
            tags: {
              has: tag
            }
          }] : []),
      ],
    },
    take: limit,
    skip: page * limit,
  });

  return (
    <div className="flex-1 content-start grid grid-cols-2 overflow-y-scroll gap-4">
      {snippets.map((snippet, key) => (
        <Snippet
          index={key}
          description={snippet.description}
          key={key}
          body={snippet.body}
          language={snippet.language as string}
          slug={snippet.slug}
          title={snippet.title} />
      ))}
    </div>
  );
}