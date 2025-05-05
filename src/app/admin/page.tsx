'use server';

import { FileWarning } from "lucide-react";

export default async function page() {


    return (
        <div className="size-full grid place-content-center">
            <div className="flex gap-2 opacity-50">
                <FileWarning />
                <b> Site currently unavailable </b>
            </div>
        </div>
    );
}