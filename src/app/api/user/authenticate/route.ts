import getPrefix from "@/functions/get-prefix";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const prefix = getPrefix();
    const formData = await request.formData();
    const action = formData.get("action");

    switch (action) {
        case "login":
            return NextResponse.redirect(new URL(`${prefix}/api/user/login`, request.url));
        case "register":
            return NextResponse.redirect(new URL(`${prefix}/api/user/register`, request.url));
        default:
            return NextResponse.redirect(new URL(`${prefix}/error?status=404`, request.url));
    }
}