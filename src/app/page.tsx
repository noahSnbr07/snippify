'use server';

import database from "@/config/database";
import Snippet from "./components/snippet";
import { Tag } from "@prisma/client";

export default async function page({ searchParams }: { searchParams: Promise<{ query: string, tag: string }> }) {
  const { query, tag } = await searchParams;

  const filters: any = {};
  if (query) {
    filters.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ];
  }
  if (tag) {
    filters.tags = { has: tag as Tag };
  }

  const snippets = await database.snippet.findMany({
    where: Object.keys(filters).length > 0 ? filters : undefined,
  });

  return (
    <div className="flex-1 content-start grid grid-cols-2 overflow-y-scroll gap-4">
      {snippets.map((snippet, key) =>
        <Snippet key={key} snippet={snippet} />)}
    </div>
  );
}