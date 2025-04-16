import database from "@/config/database";
import getPrefix from "@/functions/get-prefix";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function POST(_request: NextRequest) {


    //get jwt secret
    const jwtSecret = process.env.JWT_SECRET as string;

    //retrieve form data
    const formData = _request.formData();

    const formPassword = (await formData).get("password");

    //determine prefix
    const prefix = getPrefix();

    //get credentials
    const name = (await formData).get("name") as string;
    const password = (await formData).get("password") as string;

    //validate content
    const invalid: boolean = !name || !password || name.length < 1 || password.length < 1;
    if (invalid) return NextResponse.redirect(`${prefix}/error?status=500&message=missing+form+elements`);

    try {

        //find user by name
        const user = await database.user.findUnique({ where: { name: name } });
        if (!user) return NextResponse.redirect(`${prefix}/error?status=404&message=user+not+found`);

        //validate credentials
        const match: boolean = user.password === formPassword;

        if (match) {

            //sign JWT
            const token = jwt.sign({
                name: user.name,
                id: user.id,
                isDeactivated: user.isDeactivated,
            },
                jwtSecret,
                {
                    algorithm: "HS256",
                    issuer: `Snippify`,
                    expiresIn: "1h",
                });

            //construct response 
            const response = NextResponse.redirect(`${prefix}/authentication`);

            response.cookies.set("token", token, {
                httpOnly: true,
                maxAge: 3600,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });


            return response;
        }

        //no match
        return NextResponse.redirect(`${prefix}/error?status=401&message=credential+mismatch`);

    } catch {
        return NextResponse.redirect(`${prefix}/error?status=500&message=uncaught+error`);
    }
}