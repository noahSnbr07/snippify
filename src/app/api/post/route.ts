import database from '@/config/database';
import getPrefix from '@/functions/get-prefix';
import getSlug from '@/functions/get-slug';
import { Language, Snippet } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const environment = process.env.NODE_ENV as string;
    const key = process.env.API_KEY as string;

    // Get form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const body = formData.get('body') as string;
    const language = formData.get('language') as string;
    const authorization = formData.get('authorization') as string;

    const prefix = getPrefix();

    // Check for missing parts
    const missingDetail: boolean =
        !title || !description || !body || !language || !authorization;

    if (missingDetail) return NextResponse.redirect(prefix);

    const invalidAuth: boolean = authorization != key;
    if (invalidAuth) return NextResponse.redirect(prefix);

    // Generate slug
    const slug = getSlug(title);

    // Construct new snippet
    const newSnippet = {
        title,
        slug,
        description,
        language: language as Language,
        body: JSON.stringify(body),
    } as Snippet

    try {
        const inserted = await database.snippet.create({ data: newSnippet });

        //get redirection url based on environment
        revalidatePath("/");
        const url = new URL(`${environment === "development" ? "http://localhost:3000" : "https://snippify-beta.vercel.app"}/snippet/${inserted.slug}`);
        return NextResponse.redirect(url);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}