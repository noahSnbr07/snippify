import getPrefix from "@/functions/get-prefix";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {

    //get cookies
    const cookieStore = await cookies();

    //get prefix
    const prefix = getPrefix();

    try {

        //delete token
        cookieStore.delete("token");

        //redirect auth page
        return NextResponse.redirect(`${prefix}/authentication`);
    } catch {

        //redirect error page
        return NextResponse.redirect(`${prefix}/error?status=500?message=uncaught+error`);
    }
}