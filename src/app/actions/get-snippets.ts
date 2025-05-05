"use server";

import database from "@/config/database";
import paginationConfig from "@/config/pagination";
import { Tag } from "@prisma/client";

interface props {
    query?: string;
    tag?: Tag;
    page?: number;
}

export default async function getSnippets({ query, tag, page }: props) {

    //parse variables
    const limit = paginationConfig.results;
    const safeQuery = query ?? "";
    const pageIndex = Number(page);

    //fetch snippets
    const snippets = await database.snippet.findMany({
        orderBy: { created: "desc" },
        where: {
            AND: [
                {
                    OR: [
                        {
                            title: {
                                contains: safeQuery,
                                mode: "insensitive"
                            }
                        },
                        {
                            description: {
                                contains: safeQuery,
                                mode: "insensitive"
                            }
                        },
                    ],
                },
                ...(tag ? [
                    {
                        tags: {
                            has: tag
                        }
                    }] : []),
            ],
        },
        omit: { userId: true },
        take: limit,
        skip: pageIndex * limit,
    });

    return snippets;
}