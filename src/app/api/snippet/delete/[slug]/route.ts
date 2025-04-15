import database from "@/config/database";
import getAuthenticationState from "@/functions/get-authentication";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {


    //get authentication state
    const authenticationState = await getAuthenticationState();
    if (!authenticationState) redirect(`/authentication`);

    const userId: string = authenticationState.id;
    const user = await database.user.findUnique({ where: { id: userId } });

    //get slug
    const slug = (await params).slug;

    //get auth key
    const key = user?.password || "";
    const formData = await _request.formData();
    const authorization = formData.get("authorization") as string;


    // redirect if auth fails
    if (authorization != key) redirect("/");

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
        redirect("/");

    } catch {

        redirect("/error");
    }
}