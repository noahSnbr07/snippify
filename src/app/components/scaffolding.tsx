"use client";

import { CSSProperties } from "react";

interface ScaffoldingProps {
    type?: "text" | "circle" | "rect";
    columns?: number;
    width?: number | string;
    height?: number | string;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

export default function Scaffolding({
    type = "rect",
    columns = 1,
    width = "100%",
    height = 24,
    fullWidth,
    fullHeight,
}: ScaffoldingProps) {
    const style: CSSProperties = {
        width: fullWidth ? "100%" : width,
        height: fullHeight ? "100%" : height,
        borderRadius: type === "circle" ? "50%" : 4,
    };

    return (
        <>
            {Array.from({ length: columns }).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse bg-stack rounded"
                    style={style}
                />
            ))}
        </>
    );
}