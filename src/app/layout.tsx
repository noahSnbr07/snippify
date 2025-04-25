import "./globals.css";

//static files
import { tags } from "@/assets/assets";

//vercel
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

//functions
import getDatabaseStats from "./actions/get-database-stats";
import database from "@/config/database";

//components
import Header from "./layout/components/header";
import Aside from "./layout/components/aside";
import Content from "./layout/components/content";

//data structures
import { Tag } from "@prisma/client";
import SnippetWithUser from "@/interfaces/snippet-with-user";

//meta data
export const metadata: Metadata = {
  title: "Snippify",
  description: "Open-Source Code Snippet Hub",
  category: "Productivity",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  //get meta data
  const snippets = await database.snippet.findMany({
    take: 10,
    orderBy: {
      created: "desc"
    },
    include: {
      user: true
    }
  });

  const { totalUsers, totalSnippets, totalPages } = await getDatabaseStats();

  return (
    <html lang="en" className="h-full">

      {/* Enable Vercel Analytics && Speed Insights */}
      <Analytics mode="auto" />
      <SpeedInsights />

      <body className="h-full">
        <Header />
        <div className="size-full flex flex-1 overflow-hidden">
          <Aside snippets={snippets as SnippetWithUser[]} tags={tags as Tag[]} />
          <Content
            totalPages={totalPages}
            totalSnippets={totalSnippets}
            totalUsers={totalUsers}> {children} </Content>
        </div>
      </body>
    </html>
  );
}