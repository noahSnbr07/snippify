import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import { banner, tags } from "@/assets/assets";
import Link from "next/link";
import Form from "next/form";
import database from "@/config/database";
import { Plus } from "lucide-react";
import Divider from "./components/divider";
import { Tag } from "@prisma/client";
import getPrefix from "@/functions/get-prefix";

export const metadata: Metadata = {
  title: "🌩️ Snippify",
  description: "Open-Source Code Snippet Hub",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  //get meta data
  const items = await database.snippet.findMany();

  //determine prefix
  const prefix = getPrefix();

  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <header className="p-6 gap-6 justify-between flex bordered shrink-0">
          <Link
            href={"/"}>
            <Image
              className="hover:opacity-50"
              src={banner}
              priority
              height={32}
              alt="Snippify Icon"
              title="Snippify Icon"
            />
          </Link>
          <Form
            className="flex-1 flex justify-center"
            action={"/"}>
            <input
              type="text"
              name="query"
              placeholder="search snippets"
              className="px-4 w-[300px] py-1 rounded-full bg-stack"
            />
          </Form>

          <Link
            href={"/post"}>
            <Plus
              size={32}
              className="opacity-50 hover:opacity-100" />
          </Link>
        </header>
        <div className="size-full bordered flex flex-1 overflow-hidden">
          <aside className="p-4 flex flex-col gap-2 bordered w-1/6 min-w-[200px]">
            <b> recently added </b>
            <div className="flex flex-col gap-2">
              {items.map((item, index) => (
                <Link
                  className="hover:opacity-100 opacity-50 cursor-pointer"
                  href={`${prefix}/snippet/${item.slug}`}
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
                  href={`${prefix}/?tag=${encodeURI(tag)}`}> {tag} </Link>)}
            </div>
            <Divider />
          </aside>

          <div className="flex overflow-hidden flex-col bordered flex-1">

            <main className="flex-1 overflow-y-auto flex bordered p-4">
              {children}
            </main>

            <footer className="px-4 py-2 bordered gap-2">
              <i className="text-sm opacity-50"> {items.length} snippets total </i>
            </footer>

          </div>

        </div>

      </body>
    </html>
  );
}