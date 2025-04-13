import database from '@/config/database';
import getPrefix from '@/functions/get-prefix';
import getSlug from '@/functions/get-slug';
import { Language, Snippet } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    //get body/ form data
    const formData = await request.formData();

    //get auth key
    const key = process.env.API_KEY as string;

    // Get form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const body = formData.get('body') as string;
    const language = formData.get('language') as string;
    const authorization = formData.get('authorization') as string;

    //get prefix for absolute urls
    const prefix = getPrefix();

    // Check for missing detail/ auth
    const missingDetail: boolean = !title || !description || !body || !language || !authorization;
    const invalidAuth: boolean = authorization != key;

    //redirect
    if (missingDetail || invalidAuth) return NextResponse.redirect(prefix, { status: 308 });

    // Generate slug
    const slug = getSlug(title);

    // Construct new snippet
    const newSnippet = {
        title,
        slug,
        description,
        language: language as Language,
        body: JSON.stringify(body),
    } as Snippet;

    try {

        //insert item
        const inserted = await database.snippet.create({ data: newSnippet });

        //clear cache on items
        revalidatePath("/");

        //redirect to inserted item
        const url = new URL(`${prefix}/snippet/${inserted.slug}`);
        return NextResponse.redirect(url, { status: 308 });
    } catch (error) {

        //raw api return
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}