'use server';

import database from "@/config/database";
import CodeBlock from "../components/code-block";
import { redirect } from "next/navigation";
import MetaData from "../components/meta-data";

interface props {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: props) {
    const { slug } = await params;
    const item = await database.snippet.findUnique({ where: { slug: slug } });
    if (!item) redirect("/");

    return (
        <div className="flex-1 flex">
            <CodeBlock language={item.language} code={item.body} />
            <MetaData item={item} />
        </div>
    );
}