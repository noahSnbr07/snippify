'use server';

import database from "@/config/database";
import Snippet from "./components/snippet";

export default async function page({ searchParams }: { searchParams: Promise<{ query: string }> }) {

  //construct database index-query from search
  const query = (await searchParams).query;
  const noQuery: boolean = !query || query.length < 0;

  const snippets = await database.snippet.findMany({
    where: noQuery ? undefined : {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ]
    }
  });

  return (
    <div className="flex-1 content-start grid grid-cols-2 overflow-y-scroll gap-4">
      {snippets.map((snippet, key: number) =>
        <Snippet key={key} snippet={snippet} />)}
    </div>
  );
}