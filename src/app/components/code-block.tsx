'use client';

import { BundledLanguage, codeToHtml } from 'shiki';
import getRawBody from '@/functions/get-raw-body';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
    code: string;
    language: BundledLanguage;
}

export default function CodeBlock({ code, language }: Props) {
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        async function getHtml() {
            const newRaw = getRawBody(code);
            const newHtml = await codeToHtml(newRaw, {
                lang: language as string,
                theme: "dark-plus",
            });
            setHtml(newHtml);
        }
        getHtml();
    }, [code, language]);

    if (!html || html.length < 1) return
    <div className='bg-stack h-[300px] w-full rounded-lg animate-pulse'>
        <ClipLoader />
    </div>;

    return (
        <div
            className="shiki flex-1 max-w-full overflow-auto rounded-lg text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}