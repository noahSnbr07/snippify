import Divider from "@/app/components/divider";
import getAuthentication from "@/functions/get-authentication";
import SnippetWithUser from "@/interfaces/snippet-with-user";
import { Tag } from "@prisma/client";
import { ExternalLink, Trash } from "lucide-react";
import Link from "next/link";
import ShareButton from "./share-button";
import ActionButton from "@/app/components/action-button";

interface props {
    item: SnippetWithUser;
}

export default async function MetaData({ item }: props) {

    //check owner status
    const authentication = await getAuthentication();
    const isOwner = authentication && authentication.id === item.user.id;

    return (
        <div className="flex-1 px-4 flex flex-col gap-4">
            <b className="text-xl"> {item.title} </b>
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
                    <ActionButton
                        icon={<Trash />}
                        title="Delete Snippet"
                        endpoint={`/api/snippet/delete/${item.slug}`} />
                    <Divider />
                </>
            )}
            <ShareButton url={`https://snippify-beta.vercel.app/snippet/${item.slug}`} />
        </div>
    );
}