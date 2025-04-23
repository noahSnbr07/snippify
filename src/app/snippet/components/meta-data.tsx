import Divider from "@/app/components/divider";
import endpoints from "@/assets/constants/endpoints";
import getAuthentication from "@/functions/get-authentication";
import SnippetWithUser from "@/interfaces/snippet-with-user";
import { Tag } from "@prisma/client";
import { ExternalLink, Trash } from "lucide-react";
import Link from "next/link";
import ShareButton from "./share-button";

interface props {
    item: SnippetWithUser;
}
export default async function MetaData({ item }: props) {

    const authentication = await getAuthentication();

    //check owner status
    const isOwner = authentication?.id === item.user.id;

    return (
        <div className="flex-1 px-4 flex flex-col gap-4">
            <h1 className="font-bold text-xl"> {item.title} </h1>
            <p> {item.description} </p>
            <Divider />
            <Link
                className="underline flex gap-2"
                href={`/user/${item.user.name}`}>
                <ExternalLink size={20} />
                <b> user: {item.user.name} </b> </Link>
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
            {isOwner && (
                <>
                    <form
                        className="flex bg-stack rounded-lg p-2 gap-2"
                        method="POST"
                        action={endpoints(null, item.slug).snippet.post.delete}>
                        <button
                            type="submit"
                            className="bg-stack rounded-lg p-2">
                            <Trash />
                        </button>
                        <input
                            required
                            type="password"
                            name="authorization"
                            placeholder="your password"
                            className="flex-1 px-4 py-1 bg-background rounded-md" />
                    </form>
                    <Divider />
                </>
            )}
            <ShareButton url={`https://snippify-beta.vercel.app/snippet/${item.slug}`} />
        </div>
    );
}