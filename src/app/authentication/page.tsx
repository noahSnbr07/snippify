'use server';

import { banner } from "@/assets/assets";
import Image from "next/image";
import getAuthenticationState from "@/functions/get-authentication";
import { Info } from "lucide-react";
import Link from "next/link";

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
            {!isAuthenticated && (
                <>
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
                    <div className="flex gap-2 items-center">
                        <Info size={16} className="opacity-50" />
                        <i className="opacity-50">
                            An Account has to be requested
                            <Link
                                href={"https://www.instagram.com/noahcodesstuff/"}> here </Link>
                        </i>
                    </div>
                </>
            )}

            {/* Display Authentication Info */}
            {isAuthenticated &&
                <>
                    <div className="flex gap-2 items-center">
                        <Info size={16} className="opacity-50" />
                        <i className="opacity-50"> Your are currently authenticated </i>
                    </div>
                    <form
                        method="POST"
                        action={"/api/user/deauthenticate"}>
                        <button
                            type="submit"
                            className="px-8 py-2 rounded-lg bg-stack font-bold"> log out </button>
                    </form>
                </>
            }
        </div>
    );
}