import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import { banner, links, tags } from "@/assets/assets";
import Link from "next/link";
import Form from "next/form";
import database from "@/config/database";
import Divider from "./components/divider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Pagination from "./components/pagination";
import getDatabaseStats from "./actions/get-database-stats";

export const metadata: Metadata = {
  title: "🌩️ Snippify",
  description: "Open-Source Code Snippet Hub",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  //get meta data
  const snippets = await database.snippet.findMany({ take: 10, orderBy: { created: "desc" } });
  const { totalUsers, totalSnippets, totalPages } = await getDatabaseStats();

  return (
    <html lang="en" className="h-full">

      {/* Enable Vercel Analytics && Speed Insights */}
      <Analytics mode="auto" />
      <SpeedInsights />

      <body className="h-full">
        <header className="border-b items-center border-stack p-6 gap-6 justify-between flex shrink-0">
          <Link
            href={"/"}>
            <Image
              src={banner}
              priority
              height={32}
              alt="Snippify Icon"
              title="Snippify Icon"
            />
          </Link>
          <Pagination />
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

          <div className="flex gap-2">
            {links.map((link) =>
              <Link
                key={link.key}
                href={link.href}
                className="flex hover:opacity-100 rounded-md hover:bg-stack px-4 py-1 gap-2 no-underline items-center opacity-50">
                {link.icon}
                {link.title}
              </Link>
            )}
          </div>

        </header>
        <div className="size-full flex flex-1 overflow-hidden">
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
          </aside>

          <div className="flex overflow-hidden flex-col flex-1">

            <main className="flex-1 overflow-y-auto flex p-4">
              {children}
            </main>

            <footer className="px-4 flex py-2 gap-8 border-t border-stack">
              <i className="text-sm opacity-50"> {totalSnippets} snippets total </i>
              <i className="text-sm opacity-50"> {totalUsers} users total </i>
              <i className="text-sm opacity-50"> {totalPages + 1} pages total </i>
            </footer>

          </div>

        </div>

      </body>
    </html>
  );
}