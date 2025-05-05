import database from "@/config/database";
import getAuthentication from "@/functions/get-authentication";
import getPrefix from "@/functions/get-prefix";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {

    const auth = await getAuthentication();
    if (!auth) redirect(`/error?status=404&message=auth+failed`);

    //get prefix
    const prefix = getPrefix();

    //get slug
    const slug = (await params).slug;

    //display raw message
    if (!slug || slug.length < 1) redirect(`/error?status=404&message=slug+missing`);


    try {

        //delete snippet
        const snippet = await database.snippet.findUnique({ where: { slug }, include: { user: true } });

        if (!snippet)
            return NextResponse.redirect(`${prefix}/error?status=404&message=snippet+not+found`);

        if (!snippet.user)
            return NextResponse.redirect(`${prefix}/error?status=404&message=owner+not+found`);

        if (auth.id !== snippet.user.id)
            return NextResponse.redirect(`${prefix}/error?status=404&message=ownership+auth+failed`);

        await database.snippet.delete({ where: { slug } });

        //clear cache on items
        revalidatePath('/', 'layout')

        //redirect to index
        return NextResponse.redirect(prefix);

    } catch {
        return NextResponse.redirect(`${prefix}/error?status=500&message=uncaught+error`);
    }
}