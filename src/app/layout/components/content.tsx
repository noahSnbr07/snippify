'use server';

import getDatabaseStats from "@/app/actions/get-database-stats";
import React from "react";

interface props {
    children: React.ReactNode;
}

export default async function Content({ children }: props) {

    const { totalUsers, totalSnippets, totalPages } = await getDatabaseStats();

    return (
        <div className="flex overflow-hidden flex-col flex-1">

            <main className="flex-1 overflow-y-auto flex p-4">
                {children}
            </main>

            <footer className="px-4 flex py-2 gap-8 border-t border-stack">
                <span className="text-sm opacity-50"> <b> {totalSnippets} </b> snippets total </span>
                <span className="text-sm opacity-50"> <b> {totalUsers} </b> users total </span>
                <span className="text-sm opacity-50"> <b> {totalPages + 1}</b> pages total </span>
            </footer>

        </div>
    );
}