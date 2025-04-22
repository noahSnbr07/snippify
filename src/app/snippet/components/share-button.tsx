"use client";

import { Share } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShareButton({ url }: { url: string }) {
    const router = useRouter();

    async function copyUrl() {
        navigator.clipboard.writeText(url)
            .catch(function () {
                router.push(`/error?status=500&message=not+allowed`);
            });
    }

    return (
        <button
            onClick={copyUrl}
            className="flex p-4 gap-4 bg-stack rounded-lg">
            <Share />
            Share Snippet
        </button>
    );
}