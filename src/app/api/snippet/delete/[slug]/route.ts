import database from "@/config/database";
import getAuthenticationState from "@/functions/get-authentication";
import getPrefix from "@/functions/get-prefix";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {


    //get authentication state
    const authenticationState = await getAuthenticationState();
    if (!authenticationState) redirect(`/error?status=401&message=invalid+auth`);

    //get prefix
    const prefix = getPrefix();

    const userId: string = authenticationState.id;
    const user = await database.user.findUnique({ where: { id: userId } });

    //get slug
    const slug = (await params).slug;

    //get auth key
    const key = user?.password || "";
    const formData = await _request.formData();
    const authorization = formData.get("authorization") as string;


    // redirect if auth fails
    if (authorization != key) redirect(`/error?status=401&message=credentials+mismatch`);

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