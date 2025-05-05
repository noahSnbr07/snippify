import { Tag } from "@prisma/client";
import Snippet from "./snippet";
import getSnippets from "../actions/get-snippets";

interface props {
    query?: string;
    tag?: Tag;
    page?: number;
}

export default async function SnippetList({ query, tag, page }: props) {

    const snippets = await getSnippets({ query, tag, page });

    return (
        <div className="grid lg:grid-cols-2 flex-1 gap-4">
            {snippets?.map(function (snippet, _index) {
                return (
                    <Snippet
                        key={_index}
                        body={snippet.body}
                        language={snippet.language}
                        slug={snippet.slug}
                        title={snippet.title}
                        description={snippet.description}
                    />
                )
            })}
        </div>
    );
}