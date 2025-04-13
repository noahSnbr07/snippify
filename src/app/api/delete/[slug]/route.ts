import database from "@/config/database";
import getPrefix from "@/functions/get-prefix";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const key = process.env.API_KEY as string;
    const formData = await request.formData();
    const authorization = formData.get("authorization") as string;

    const prefix = getPrefix();

    if (authorization != key) return NextResponse.redirect(prefix);

    if (!slug || slug.length < 1) return NextResponse.json({
        message: "Missing/ Invalid Param",
        ok: false,
        status: 404,
        data: null,
        error: null,
    });

    try {

        const snippet = await database.snippet.delete({ where: { slug } });
        if (!snippet) return NextResponse.json({
            message: "failure",
            ok: false,
            status: 500,
            data: null,
            error: null
        });

        revalidatePath("/");
        return NextResponse.redirect(prefix);

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