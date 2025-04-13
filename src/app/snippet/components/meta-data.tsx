'use server';

import Divider from "@/app/components/divider";
import { Snippet, Tag } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";

interface props {
    item: Snippet;
}
export default async function MetaData({ item }: props) {
    console.log(item.tags)
    return (
        <div className="flex-1 p-4 flex flex-col gap-4">
            <h1 className="font-bold text-xl"> {item.title} </h1>
            <p> {item.description} </p>
            <Divider />
            <p> created: {item.created.toLocaleDateString()} - {item.created.toLocaleTimeString()} </p>
            <p> updated: {item.updated.toLocaleDateString()} - {item.updated.toLocaleTimeString()} </p>
            <div className="flex gap-2">
                {item.tags.map((tag: Tag, key: number) =>
                    <Link
                        href={`/?tag=${encodeURI(tag)}`}
                        key={key}
                        className="px-4 py-1 bg-stack rounded-full hover:bg-foreground hover:text-background"
                    > #{tag} </Link>)}
            </div>
            <Divider />
            <form
                className="flex bg-stack rounded-lg p-2 gap-2"
                method="POST"
                action={`/api/delete/${item.slug}`}>
                <button
                    type="submit"
                    className="bg-stack rounded-lg p-2 cursor-pointer">
                    <Trash />
                </button>
                <input
                    required
                    type="password"
                    name="authorization"
                    placeholder="authorization"
                    className="flex-1 px-4 py-1 bg-background rounded-md" />
            </form>
        </div>
    );
}