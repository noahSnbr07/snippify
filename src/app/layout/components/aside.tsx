'use server';

import ActionButton from "@/app/components/action-button";
import Divider from "@/app/components/divider";
import { tags } from "@/assets/assets";
import database from "@/config/database";
import getAuthentication from "@/functions/get-authentication";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

export default async function Aside() {

    const authentication = await getAuthentication();

    //get meta data
    const links = await database.snippet.findMany({
        take: 10,
        orderBy: {
            created: "desc"
        },
        select: { slug: true },
    });

    return (
        <aside className="p-4 overflow-y-auto border-r border-stack flex flex-col gap-2 w-1/6 min-w-[200px]">
            <b> 10 most recent </b>
            <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <Link
                        className="hover:opacity-100 opacity-50"
                        href={`/snippet/${link.slug}`}
                        key={index}> {link.slug} </Link>
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
                    title="Logout"
                    icon={<LogOut opacity={.5} />}
                    endpoint={"/api/user/logout"}
                />
                <ActionButton
                    title="Login"
                    icon={<LogIn opacity={.5} />}
                    endpoint={"/authentication"}
                />
                <i className="opacity-50">
                    {authentication ? `Authenticated as ${authentication.name}` : "Not Authenticated"}
                </i>
            </div>
        </aside>
    );
}