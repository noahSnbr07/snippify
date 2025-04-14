import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import { banner, links, tags } from "@/assets/assets";
import Link from "next/link";
import Form from "next/form";
import database from "@/config/database";
import Divider from "./components/divider";
import getPrefix from "@/functions/get-prefix";
import { Analytics } from "@vercel/analytics/next";

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

      {/* Enable Vercel Analytics */}
      <Analytics mode="auto" />

      <body className="h-full">
        <header className="border-b items-center border-stack p-6 gap-6 justify-between flex shrink-0">
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

          <div className="flex gap-4">
            {links.map((link) =>
              <Link
                key={link.key}
                title={link.title}
                href={link.href}> {link.icon} </Link>)}
          </div>

        </header>
        <div className="size-full flex flex-1 overflow-hidden">
          <aside className="p-4 border-r border-stack flex flex-col gap-2 w-1/6 min-w-[200px]">
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

          <div className="flex overflow-hidden flex-col flex-1">

            <main className="flex-1 overflow-y-auto flex p-4">
              {children}
            </main>

            <footer className="px-4 py-2 gap-2 border-t border-stack">
              <i className="text-sm opacity-50"> {items.length} snippets total </i>
            </footer>

          </div>

        </div>

      </body>
    </html>
  );
}