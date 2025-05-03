import database from "@/config/database";
import { redirect } from "next/navigation";
import MetaData from "../components/meta-data";
import SnippetWithUser from "@/interfaces/snippet-with-user";
import CodeBlock from "@/app/components/code-block";
import { BundledLanguage } from "shiki";

interface props {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: props) {
    const { slug } = await params;

    //get snippet
    const item = await database.snippet.findUnique({
        where: { slug: slug },
        include: { user: true }
    }) as SnippetWithUser;

    //not found -> redirect
    if (!item) redirect(`/error?status=404&message=not+found`);

    return (
        <div className="size-full flex p-4">
            <CodeBlock
                language={item.language as BundledLanguage}
                code={item.body} />
            <MetaData item={item} />
        </div>
    );
}