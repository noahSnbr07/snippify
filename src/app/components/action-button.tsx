"use server";

import React from "react";

type elem = React.JSX.Element;

interface props {
    endpoint: string;
    icon: elem;
    title: string;
}

/**
 * 
 * @param endpoint determines endpoint to reach onclick
 * @param title accessibility+label of button
 * @param icon lucide-react icon component
 * @returns globally usable form-contained button for mutations
 */
export default async function ActionButton({ endpoint, title, icon }: props): Promise<React.JSX.Element> {

    return (
        <form
            className="bg-stack rounded-lg flex p-4 hover:opacity-50"
            method="POST"
            action={endpoint}
        >
            <button
                title={title}
                type="submit"
                className="flex gap-4 flex-1"
            >
                {icon}
                <p> {title} </p>
            </button>
        </form>
    )
}