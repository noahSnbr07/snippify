'use server';

import { BundledLanguage, codeToHtml } from 'shiki';
import getRawBody from '@/functions/get-raw-body';
import React from 'react';

interface Props {
    code: string;
    language: BundledLanguage;
}

export default async function CodeBlock({ code, language }: Props) {
    const raw = getRawBody(code);

    const html = await codeToHtml(raw, {
        lang: language,
        theme: "dark-plus",
    });

    return (
        <div
            className="shiki flex-1 overflow-auto rounded-lg text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}