'use server';

import ActionButton from "@/app/components/action-button";
import Divider from "@/app/components/divider";
import endpoints from "@/assets/constants/endpoints";
import getAuthentication from "@/functions/get-authentication";
import SnippetWithUser from "@/interfaces/snippet-with-user";
import { Tag } from "@prisma/client";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

interface props {
    snippets: SnippetWithUser[];
    tags: Tag[];
}

export default async function Aside({ snippets, tags }: props) {

    const authentication = await getAuthentication();

    return (
        <aside className="p-4 overflow-y-auto border-r border-stack flex flex-col gap-2 w-1/6 min-w-[200px]">
            <b> 10 most recent </b>
            <div className="flex flex-col gap-2">
                {snippets.map((item, index) => (
                    <Link
                        className="hover:opacity-100 opacity-50"
                        href={`/snippet/${item.slug}`}
                        key={index}> {item.slug} </Link>
                ))}
            </div>
            <Divider />
            <b> filter tags </b>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, key) =>
                    <Link
                        className="px-4 py-1 bg-stack hover:bg-foreground hover:text-background rounded-full"
                        key={key}
                        href={`/?tag=${encodeURI(tag)}`}> {tag} </Link>)}
            </div>
            <Divider />
            <div className="flex flex-col gap-2">
                <b> Account </b>
                <ActionButton
                    title="Deauthenticate"
                    icon={<LogOut />}
                    endpoint={endpoints(null, null, false, null).user.post.deauthenticate}
                />
                <ActionButton
                    title="Authenticate"
                    icon={<LogIn />}
                    endpoint={"/authentication"}
                />
                <i className="opacity-50">
                    {authentication ? `Authenticated as ${authentication.name}` : "Not Authenticated"}
                </i>
            </div>
        </aside>
    );
}