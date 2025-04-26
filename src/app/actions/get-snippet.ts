"use server";

import database from "@/config/database";

export default async function getSnippet(slug: string) {
    try {
        const snippet = await database.snippet.findUnique({
            where: { slug },
            omit: {
                id: true,
                userId: true
            },
            include: { user: { select: { name: true, } } }
        });

        if (!snippet) {
            throw new Error('Snippet not found');
        }

        return snippet;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch snippet');
    }
}