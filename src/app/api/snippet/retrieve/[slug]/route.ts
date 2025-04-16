import database from "@/config/database";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> {
    //get slug
    const slug = (await params).slug;

    if (!slug || slug.length < 1) return NextResponse.json(
        {
            message: "Invalid Slug",
            ok: false,
            status: 500,
            data: null,
            error: null,
        }, { status: 500 });

    try {
        const snippet = await database.snippet.findUnique({
            where: { slug },
            omit: { id: true }
        });

        if (!snippet) return NextResponse.json(
            {
                message: "No Entry",
                ok: false,
                status: 404,
                data: null,
                error: null,
            }, { status: 404 });


        return NextResponse.json({
            message: "success",
            ok: true,
            status: 200,
            data: snippet,
            error: null,
        }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            ok: false,
            status: 500,
            data: null,
            error: error instanceof Error ? error.message : null,
        }, { status: 500 });
    }
}