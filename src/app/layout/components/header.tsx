'use server';

import BreadCrumb from "@/app/layout/components/bread-crumb";
import Pagination from "@/app/layout/components/pagination";
import { banner, codersResources, icon, links } from "@/assets/assets";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./dropdown";
import Partner from "./partner";

export default async function Header() {


    return (
        <header className="border-b items-center border-stack p-3 gap-3 lg:p-6 lg:gap-6 justify-between flex shrink-0">
            <Link
                href={"/"}>
                <Image
                    className="hidden lg:block"
                    src={banner}
                    priority
                    height={32}
                    alt="Snippify Icon"
                    title="Snippify Icon"
                />
                <Image
                    className="block lg:hidden object-contain aspect-square"
                    src={icon}
                    priority
                    height={32}
                    width={16}
                    alt="Snippify Icon"
                    title="Snippify Icon"
                />
            </Link>
            <div className="hidden lg:block"><Pagination /></div>
            <Partner />
            <BreadCrumb />
            <div className="flex-1 flex justify-center">
                <form
                    className="flex-1 max-w-md flex items-center px-4 gap-4 py-1 bg-stack rounded-full"
                    action={"/"}>
                    <input
                        type="text"
                        name="query"
                        placeholder="search snippets"
                        className="flex-1 w-full"
                    />
                    <Search size={20} opacity={.5} />
                </form>
            </div>

            {/* only rendered if screen width > 1024px */}
            <div className="hidden lg:flex gap-2">
                {links.map((link) =>
                    <Link
                        title={link.title}
                        key={link.key}
                        href={link.href}
                        className="flex hover:opacity-100 rounded-md hover:bg-stack px-4 py-1 gap-2 no-underline items-center opacity-50">
                        {link.icon}
                    </Link>
                )}
            </div>

            {/* only rendered if screen width < 1024px */}
            <Dropdown />

        </header>
    );
}