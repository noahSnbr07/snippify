'use server';

import React from "react";

interface props {
    children: React.ReactNode;
    totalSnippets: number;
    totalUsers: number;
    totalPages: number
}

export default async function Content({ children, totalSnippets, totalUsers, totalPages }: props) {

    return (
        <div className="flex overflow-hidden flex-col flex-1">

            <main className="flex-1 overflow-y-auto flex p-4">
                {children}
            </main>

            <footer className="px-4 flex py-2 gap-8 border-t border-stack">
                <i className="text-sm opacity-50"> {totalSnippets} snippets total </i>
                <i className="text-sm opacity-50"> {totalUsers} users total </i>
                <i className="text-sm opacity-50"> {totalPages + 1} pages total </i>
            </footer>

        </div>
    );
}