import { Tag } from "@prisma/client";
import SnippetList from "./components/snippet-list";
import Pagination from "./layout/components/pagination";

export default async function page({ searchParams }: { searchParams: Promise<{ query?: string; tag?: Tag; page?: number; }> }) {
  const { query, tag, page = 0 } = await searchParams;

  return (
    <div className="flex-1 overflow-y-auto p-4 flex-col gap-4 items-center">
      <SnippetList page={page} query={query} tag={tag} />
      <Pagination />
    </div>
  );
}