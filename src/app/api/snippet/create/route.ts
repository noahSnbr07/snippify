import database from '@/config/database';
import getAuthentication from '@/functions/get-authentication';
import getPrefix from '@/functions/get-prefix';
import getSlug from '@/functions/get-slug';
import { Language, Tag } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {

    const authenticationState = await getAuthentication();
    if (!authenticationState) redirect("/error?status=401&message=authenticate+to+post");

    //get prefix
    const prefix = getPrefix();

    //get body/ form data
    const formData = await _request.formData();

    const userId: string = authenticationState.id;

    // Get form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const body = formData.get('body') as string;
    const language = formData.get('language') as string;
    const tags = formData.getAll('tags') || [] as string[];

    // Check for missing detail/ auth
    const missingDetail: boolean = !title || !description || !body || !language;

    //invalid body || auth -> redirect
    if (missingDetail) return redirect(`/error?status=500&message=invalid+form`);

    // Generate slug by title
    const slug = getSlug(title);

    // Construct new snippet
    const newSnippet = {
        title,
        slug,
        description,
        language: language as Language,
        body: JSON.stringify(body),
        tags: tags as Tag[],
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
        revalidatePath('/', 'layout');

        // Redirect with NextResponse
        return NextResponse.redirect(`${prefix}/snippet/${inserted.slug}`);
    } catch {
        return NextResponse.redirect(`${prefix}/error`)
    }
}