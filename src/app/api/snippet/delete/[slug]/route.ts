import database from "@/config/database";
import getAuthentication from "@/functions/get-authentication";
import getPrefix from "@/functions/get-prefix";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {


    //get authentication state
    const authenticationState = await getAuthentication();
    if (!authenticationState) redirect(`/error?status=401&message=invalid+auth`);

    //get prefix
    const prefix = getPrefix();

    //get slug
    const slug = (await params).slug;

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
        if (!snippet) return redirect(`/error?status=404&message=snippet+not+found`)

        //clear cache on items
        revalidatePath('/', 'layout')

        //redirect to index
        return NextResponse.redirect(prefix);

    } catch {

        return NextResponse.redirect(`${prefix}/error?status=500&message=uncaught+error`);
    }
}