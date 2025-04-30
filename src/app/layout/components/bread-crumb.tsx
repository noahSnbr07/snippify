"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {

    //retrieve location
    const path = usePathname();

    const getCrumb = (): string => {
        if (path === "/") return "Snippify";
        const parts = path.split("/").filter(Boolean);
        return parts[parts.length - 1];
    };

    const crumb = getCrumb();

    return (
        <Link
            title="Route Bread Crumb"
            className="hover:bg-stack hidden xl:block px-4 py-1 rounded-sm"
            href={"/"}>
            <h1 className="opacity-50 font-bold">
                <strong> {crumb} </strong>
            </h1>
        </Link>
    );
}