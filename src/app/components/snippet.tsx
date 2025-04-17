'use server';
import { Snippet as SnippetType } from "@prisma/client";
import Link from "next/link";
import Divider from "./divider";
import CodeBlock from "./code-block";
import { BundledLanguage } from "shiki";

interface props {
    snippet: SnippetType;
}

export default async function Snippet({ snippet }: props) {
    const { slug, title, body, language, description } = snippet;

    return (
        <div
            className="bordered max-h-[400px] p-4 rounded-lg flex gap-2 flex-col">
            <p className="text-sm opacity-50"> {slug} </p>
            <Link href={`/snippet/${snippet.slug}`}>
                <b className="text-lg"> {title} </b>
            </Link>
            <Divider />
            <CodeBlock
                code={body}
                language={language as BundledLanguage} />
            <Divider />
            <p> {description} </p>
        </div>
    );
}