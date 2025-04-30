"use client";

import { Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShareButton({ url }: { url: string }) {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    async function copyUrl() {
        setClicked(true);
        navigator.clipboard.writeText(url)
            .catch(function () {
                router.push(`/error?status=500&message=not+allowed`);
            }).finally(async () => {
                await Promise.resolve(setTimeout(() => setClicked(false), 1500));
            });
    }

    return (
        <button
            disabled={clicked}
            style={{ opacity: clicked ? .5 : 1 }}
            onClick={copyUrl}
            className="flex p-4 gap-4 bg-stack rounded-lg">
            <Share />
            {clicked ? "Copied to Clipboard" : "Copy Permalink"}
        </button>
    );
}