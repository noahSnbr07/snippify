import database from "@/config/database";
import { Prisma, Tag } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query") || "";
    const tag = url.searchParams.get("tag") || "";

    const filters: Prisma.SnippetWhereInput = {};

    try {
        if (query) {
            filters.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ];
        }

        if (tag) filters.tags = { has: tag as Tag };

        const snippets = await database.snippet.findMany({
            where: Object.keys(filters).length > 0 ? filters : undefined,
        });

        return NextResponse.json({
            message: "success",
            ok: true,
            status: 200,
            data: snippets,
            error: null,
        });
    } catch (error) {
        return NextResponse.json({
            message: "error",
            ok: false,
            status: 500,
            data: null,
            error,
        }, { status: 500 });
    }
}