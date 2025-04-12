'use server';

import Divider from "@/app/components/divider";
import { Snippet } from "@prisma/client";

interface props {
    item: Snippet;
}
export default async function MetaData({ item }: props) {

    return (
        <div className="flex-1 p-4 flex flex-col gap-4">
            <h1 className="font-bold text-xl"> {item.title} </h1>
            <p> {item.description} </p>
            <Divider />
            <p> created: {item.created.toLocaleDateString()} - {item.created.toLocaleTimeString()} </p>
            <p> updated: {item.updated.toLocaleDateString()} - {item.updated.toLocaleTimeString()} </p>
            <Divider />
        </div>
    );
}