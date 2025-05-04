'use server';

import { codersResources } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default async function Partner() {


    return (
        <div className="relative inline-block">
            <Link
                target="_blank"
                title="also visit coders-resources"
                href="https://codersresources.vercel.app"
            >
                <Image
                    className="rounded-sm"
                    src={codersResources}
                    height={32}
                    width={32}
                    title="Coders Resources"
                    alt="Coders Resources"
                />
            </Link>
            <div className="absolute top-0 right-0 size-2 bg-orange-400 rounded-full animate-ping"></div>
        </div>
    );
}