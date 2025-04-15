'use server';

import { banner } from "@/assets/assets";
import Image from "next/image";
import getAuthenticationState from "@/functions/get-authentication";
import { Info } from "lucide-react";

export default async function page() {

    const isAuthenticated = await getAuthenticationState();

    return (
        <div className="size-full flex justify-center items-center flex-col gap-8">
            <Image
                className="opacity-50"
                src={banner}
                height={64}
                alt="Banner"
                title="Banner" />
            <form
                method="POST"
                action={`/api/user/authenticate`}
                className="flex flex-col gap-4 p-4 bg-stack w-min rounded-lg"
            >
                <input
                    placeholder="name"
                    className="form-element"
                    type="text"
                    name="name"
                />
                <input
                    placeholder="password"
                    className="form-element"
                    type="password"
                    name="password"
                />
                <button
                    type="submit"
                    className="p-2 border font-bold rounded-lg"> Submit </button>
            </form>

            {/* Display Authentication Info */}
            {isAuthenticated &&
                <div className="flex gap-2 items-center">
                    <Info size={16} className="opacity-50" />
                    <i className="opacity-50"> Your are currently authenticated </i>
                </div>
            }
        </div>
    );
}