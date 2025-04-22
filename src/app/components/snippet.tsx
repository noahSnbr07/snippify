"use client";

import Link from "next/link";
import Divider from "./divider";
import CodeBlock from "./code-block";
import { BundledLanguage } from "shiki";
import { motion } from "motion/react";

interface props {
    title: string;
    slug: string;
    body: string;
    language: string;
    description: string;
    index: number;
}

export default function Snippet({ slug, title, body, language, description, index }: props) {

    return (
        <motion.div
            /* animation */
            viewport={{ once: true }}
            initial={{ opacity: 0, scale: .75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * .1, type: "tween" }}

            /* props */
            className="bordered h-[400px] p-4 rounded-lg flex gap-2 flex-col">

            <p className="text-sm opacity-50"> {slug} </p>
            <Link href={`/snippet/${slug}`}>
                <b className="text-lg"> {title} </b>
            </Link>

            <Divider />

            <CodeBlock
                code={body}
                language={language as BundledLanguage} />
            <Divider />

            <p className="truncate"> {description} </p>

        </motion.div>
    );
}