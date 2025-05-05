'use server';

import getAuthentication from "@/functions/get-authentication";
import { FileWarning } from "lucide-react";
import { redirect } from "next/navigation";

export default async function page() {

    const auth = await getAuthentication();
    if (!auth || !auth.isAdmin) return redirect("/error?status=403&message=auth+failed");

    return (
        <div className="size-full grid place-content-center">
            <div className="flex gap-2 opacity-50">
                <FileWarning />
                <b> Site currently unavailable </b>
            </div>
        </div>
    );
}