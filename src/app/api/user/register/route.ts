import { NextRequest, NextResponse } from "next/server";
import database from "@/config/database";
import getPrefix from "@/functions/get-prefix";
import { hash } from "bcrypt";

export async function POST(_request: NextRequest) {
    const formData = await _request.formData();
    const prefix = getPrefix();

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!name || name.length < 1 || !password || password.length < 1)
        return NextResponse.redirect(`${prefix}/error?status=500&message=invalid+inputs`);

    const passwordHash: string = await hash(password, 10);

    try {

        const existingUser = await database.user.findUnique({ where: { name } });
        if (existingUser) return NextResponse.redirect(`${prefix}/error?status=500&message=name+reserved`);

        await database.user.create({ data: { name, password: passwordHash } });

        return NextResponse.redirect(`${prefix}/authentication`);

    } catch {
        return NextResponse.redirect(`${prefix}/error?status=500&message=unexpected+error`);
    }
}