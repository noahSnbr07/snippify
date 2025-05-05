'use server';

import { banner } from "@/assets/assets";
import Image from "next/image";
import getAuthentication from "@/functions/get-authentication";
import { Clock, Info } from "lucide-react";
import getTokenExpiration from "@/functions/get-toke-expiration";

export default async function page() {

    const isAuthenticated = await getAuthentication();
    const expiration = await getTokenExpiration();

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
                        action={"/api/user/authenticate"}
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
                        <div className="flex gap-4">
                            <button
                                name="action"
                                value={"register"}
                                type="submit"
                                className="flex-1 font-bold p-2 bg-stack rounded-lg"> Register </button>
                            <button
                                name="action"
                                value={"login"}
                                type="submit"
                                className="flex-1 border font-bold p-2 rounded-lg"> Login </button>
                        </div>
                    </form>
                </>
            )}

            {/* Display Authentication Info */}
            {isAuthenticated &&
                <>
                    <div className="flex gap-2 items-center">
                        <Info size={16} className="opacity-50" />
                        <i className="opacity-50"> Your are currently authenticated </i>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Clock size={16} className="opacity-50" />
                        <i className="opacity-50"> Your token expires at {expiration || "an error occurred"} </i>
                    </div>
                    <form
                        method="POST"
                        action={"/api/user/logout"}>
                        <button
                            type="submit"
                            className="px-8 py-2 rounded-lg bg-stack font-bold"> log out </button>
                    </form>
                </>
            }
        </div>
    );
}