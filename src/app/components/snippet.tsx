'use server';
import getRawBody from "@/functions/get-raw-body";
import { Snippet as SnippetType } from "@prisma/client";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Divider from "./divider";

interface props {
    snippet: SnippetType;
}
export default async function Snippet({ snippet }: props) {
    const { slug, title, body, language, description } = snippet;
    const raw = getRawBody(body);

    return (
        <div
            className="bordered max-h-[400px] p-4 rounded-lg flex gap-2 flex-col">
            <p className="text-sm opacity-50"> {slug} </p>
            <Link href={`/snippet/${snippet.slug}`}>
                <b className="text-lg"> {title} </b>
            </Link>
            <Divider />
            <SyntaxHighlighter
                showLineNumbers
                customStyle={{ height: 200, backgroundColor: 'transparent', padding: 0 }}
                style={dark}
                language={language}>
                {raw}
            </SyntaxHighlighter>
            <Divider />
            <p> {description} </p>
        </div>
    );
}