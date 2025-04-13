import database from "@/config/database";
import getPrefix from "@/functions/get-prefix";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {

    //get slug
    const slug = (await params).slug;

    //get auth key
    const key = process.env.API_KEY as string;
    const formData = await request.formData();
    const authorization = formData.get("authorization") as string;

    //get prefix for absolute urls
    const prefix = getPrefix();

    // redirect if auth fails
    if (authorization != key) return NextResponse.redirect(prefix, { status: 308 });

    //display raw message
    if (!slug || slug.length < 1) return NextResponse.json({
        message: "Missing/ Invalid Param",
        ok: false,
        status: 404,
        data: null,
        error: null,
    });

    try {

        //delete snippet
        const snippet = await database.snippet.delete({ where: { slug } });

        //display raw message
        if (!snippet) return NextResponse.json({
            message: "failure",
            ok: false,
            status: 500,
            data: null,
            error: null
        });

        //clear cache on items
        revalidatePath("/");

        //redirect to index
        return NextResponse.redirect(prefix, { status: 308 });

    } catch (error) {
        return NextResponse.json({
            message: "Uncaught Exception",
            ok: false,
            status: 500,
            data: null,
            error: error,
        });
    }
}