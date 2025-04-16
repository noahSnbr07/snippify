import database from '@/config/database';
import getAuthenticationState from '@/functions/get-authentication';
import getPrefix from '@/functions/get-prefix';
import getSlug from '@/functions/get-slug';
import { Language } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {

    const authenticationState = await getAuthenticationState();
    if (!authenticationState) redirect("/error?status=401&message=authenticate+to+post");

    //get prefix
    const prefix = getPrefix();

    //get body/ form data
    const formData = await _request.formData();

    const userId: string = authenticationState.id;
    const user = await database.user.findUnique({ where: { id: userId } });

    //get auth key
    const key = user?.password || "";

    // Get form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const body = formData.get('body') as string;
    const language = formData.get('language') as string;
    const authorization = formData.get('authorization') as string;

    // Check for missing detail/ auth
    const missingDetail: boolean = !title || !description || !body || !language || !authorization;
    const invalidAuth: boolean = authorization != key;

    //invalid body || auth -> redirect
    if (missingDetail) return redirect(`/error?status=500&message=invalid+form`);
    if (invalidAuth) return redirect(`/error?status=401&message=credential+mismatch`);

    // Generate slug by title
    const slug = getSlug(title);

    // Construct new snippet
    const newSnippet = {
        title,
        slug,
        description,
        language: language as Language,
        body: JSON.stringify(body),
        tags: [],
    };

    try {
        // Insert item
        const inserted = await database.snippet.create({
            data: {
                ...newSnippet,
                user: {
                    connect: { id: userId }
                }
            }
        });

        // Clear cache on items
        revalidatePath('/', 'layout')

        // Redirect with NextResponse
        return NextResponse.redirect(`${prefix}/snippet/${inserted.slug}`);
    } catch {
        return NextResponse.redirect(`${prefix}/error`)
    }
}