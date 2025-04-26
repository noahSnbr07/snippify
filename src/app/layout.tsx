import "./globals.css";

//vercel
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

//components
import Header from "./layout/components/header";
import Aside from "./layout/components/aside";
import Content from "./layout/components/content";

//meta data
export const metadata: Metadata = {
  title: "Snippify",
  description: "Open-Source Code Snippet Hub",
  category: "Productivity",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" className="h-full">

      {/* Enable Vercel Analytics && Speed Insights */}
      <Analytics mode="auto" />
      <SpeedInsights />

      <body className="h-full">
        <Header />
        <div className="size-full flex flex-1 overflow-hidden">
          <Aside />
          <Content> {children} </Content>
        </div>
      </body>
    </html>
  );
}