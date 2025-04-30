'use client';

import { Snippet as SnippetType, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import getSnippets from "../actions/get-snippets";
import Snippet from "./snippet";
import { ClipLoader } from "react-spinners";

interface props {
    query?: string;
    tag?: Tag;
    page?: number;
}

export default function SnippetList({ query, tag, page }: props) {

    //define interactive variables
    const [snippets, setSnippets] = useState<SnippetType[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(function () {

        //retrieve data from endpoint
        async function get() {
            setLoading(true);
            const snippets = await getSnippets({ query, tag, page });
            setSnippets(snippets);
            setLoading(false);
        }

        //run call
        get();
    }, [page, query, tag]);

    //return loading indicator
    if (loading) return (<div className="size-full grid place-content-center">
        <ClipLoader size={75} color="var(--stack)" />
    </div>);

    return (
        <div className="flex-1 content-start grid lg:grid-cols-2 overflow-y-scroll gap-4">
            {!loading && snippets?.map(function (snippet, _index) {
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