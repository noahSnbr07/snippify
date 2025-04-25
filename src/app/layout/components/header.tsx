'use server';

import BreadCrumb from "@/app/layout/components/bread-crumb";
import Pagination from "@/app/layout/components/pagination";
import { banner, links } from "@/assets/assets";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {


    return (
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
            <BreadCrumb />
            <div className="flex-1 flex justify-center">
                <form
                    className="flex items-center px-4 gap-4 py-1 bg-stack rounded-full"
                    action={"/"}>
                    <input
                        type="text"
                        name="query"
                        placeholder="search snippets"
                        className="w-[300px] flex-1"
                    />
                    <Search size={20} opacity={.5} />
                </form>
            </div>

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
    );
}