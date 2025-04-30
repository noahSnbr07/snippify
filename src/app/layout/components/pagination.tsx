"use client";

import getDatabaseStats from "@/app/actions/get-database-stats";
import paginationConfig from "@/config/pagination";
import { ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function PaginationComponent() {

    //react hooks
    const searchParams = useSearchParams();
    const router = useRouter();
    const [lastPageIndex, setLastPageIndex] = useState<number>(0);

    useEffect(function (): void {
        async function get() {
            const { totalPages } = await getDatabaseStats();
            setLastPageIndex(totalPages);
        }
        get();
    }, []);

    //determine current page and display number
    const page = parseInt(searchParams.get("page") || "0");
    const currentIndex = page + paginationConfig.startIndex;

    //define navigation functions
    const goPrevious = () => router.push(`?page=${page - 1 < 0 ? 0 : page - 1}`);
    const goNext = () => router.push(`?page=${page + 1}`);
    const goFirst = () => router.push("?page=0");
    const goLast = () => router.push(`?page=${lastPageIndex}`);

    return (
        <div className="flex h-8 gap-2 items-center rounded-lg">
            <NavigationButton title="go first" icon={<ArrowLeftToLine size={20} opacity={.5} />} onClick={goFirst} />
            <NavigationButton title="go previous" icon={<ArrowLeft size={20} opacity={.5} />} onClick={goPrevious} />
            <div className="h-full grid place-content-center aspect-square">
                <b title="current index"> {currentIndex} </b>
            </div>
            <NavigationButton title="go next" icon={<ArrowRight size={20} opacity={.5} />} onClick={goNext} />
            <NavigationButton title="go last" icon={<ArrowRightToLine size={20} opacity={.5} />} onClick={goLast} />
        </div>
    );
}

//button for navigation within pagination
const NavigationButton = ({ onClick, icon, title }: { onClick: () => void; icon: React.JSX.Element; title: string }) => (
    <button
        title={title}
        className="bg-stack p-1 aspect-square rounded-md" onClick={() => onClick()}>
        {icon}
    </button>
);

export default function Pagination() {
    return (
        <Suspense
            fallback={<i className="opacity-50"> loading pagination ... </i>}>
            <PaginationComponent />
        </Suspense>
    );
}