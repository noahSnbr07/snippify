'use server';
import { Snippet as SnippetInterface } from "@prisma/client";
import Snippet from "./components/snippet";
import endpoints from "@/assets/constants/endpoints";

export default async function page({ searchParams }: { searchParams: Promise<{ query: string; tag: string }> }) {
  const { query, tag } = await searchParams;

  //define type for api response
  type SnippetResponse = { data: SnippetInterface[]; };

  //retrieve data from api
  const dbQuery = endpoints(query, null, true, tag).snippet.get.search;
  const response = await fetch(dbQuery);
  const data: SnippetResponse = await response.json();

  return (
    <div className="flex-1 content-start grid grid-cols-2 overflow-y-scroll gap-4">
      {data.data.map((snippet, key) => (
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