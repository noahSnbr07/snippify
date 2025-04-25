"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {

    //retrieve location
    const path = usePathname();

    const getCrumb = (): string => {
        if (path === "/") return "home";
        return path.replaceAll("/", " ~ ").trim().replace("~", "");
    }

    const crumb = getCrumb();

    return (
        <Link
            className="hover:bg-stack px-4 py-1 rounded-sm"
            href={"/"}>
            <b className="opacity-50">
                {crumb}
            </b>
        </Link>
    );
}