import database from "@/config/database";
import getAuthentication from "@/functions/get-authentication";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    const authentication = await getAuthentication();
    if (!authentication) return NextResponse.json(
        {
            message: "Not Authenticated",
            ok: false,
            status: 401,
            data: null,
            error: null,
        }, { status: 401 });

    try {
        const user = await database.user.findUnique({
            where: {
                id: authentication.id
            },
            omit: { password: true }
        });

        if (!user) return NextResponse.json(
            {
                message: "Not Found",
                ok: false,
                status: 404,
                data: null,
                error: null,
            }, { status: 404 });


        return NextResponse.json(
            {
                message: "Success",
                ok: true,
                status: 200,
                data: user,
                error: null,
            }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal Server Error",
                ok: false,
                status: 500,
                data: null,
                error: error,
            }, { status: 500 });
    }
}