import Link from "next/link";
import Divider from "./divider";
import CodeBlock from "./code-block";
import { BundledLanguage } from "shiki";

interface props {
    title: string;
    slug: string;
    body: string;
    language: string;
    description: string;
}

export default function Snippet({ slug, title, body, language, description }: props) {

    return (
        <div
            className="bordered h-[400px] w-full p-4 rounded-lg flex gap-2 flex-col">
            <p className="text-sm opacity-50"> {slug} </p>
            <Link href={`/snippet/${slug}`}>
                <b className="text-lg"> {title} </b>
            </Link>

            <Divider />

            <CodeBlock
                code={body}
                language={language as BundledLanguage} />
            <Divider />

            <p className="truncate"> {description} </p>
        </div>
    );
}