'use server';

import getRawBody from "@/functions/get-raw-body";
import { CSSProperties } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface props {
    code: string;
    language: string;
}
export default async function CodeBlock({ code, language }: props) {

    const raw = getRawBody(code);

    const style: CSSProperties = {
        borderRadius: 16,
        flex: 1,
        backgroundColor: 'var(--stack)',
        padding: 16,
    }


    return (
        <SyntaxHighlighter
            showLineNumbers
            customStyle={style}
            style={dark}
            language={language}>
            {raw}
        </SyntaxHighlighter>
    );
}