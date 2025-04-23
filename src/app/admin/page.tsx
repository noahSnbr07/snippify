'use server';

import database from "@/config/database";
import getAuthentication from "@/functions/get-authentication";
import { redirect } from "next/navigation";

export default async function page() {

    //authorize resource access
    const authentication = await getAuthentication();
    if (!authentication) redirect("/error?status=403&message=unauthorized");
    const isAdmin: boolean = authentication.isAdmin;
    if (!isAdmin) redirect("/error?stats=403&message=admin+only");

    const users = await database.user.findMany();
    const snippets = await database.snippet.findMany({ include: { user: true } });

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2 overflow-auto">
                <b className="text-2xl"> users </b>
                {users.map((user, _: number) => (
                    <div
                        key={_}
                        className="flex flex-col gap-2 bg-stack p-2 rounded-lg">
                        <b> {user.name} </b>
                        <p className="text-xs opacity-50"> {user.id} </p>
                        <p> password: {user.password} </p>
                        <div className="flex gap-2">
                            <button className="bg-red-800 px-4 py-1 rounded-sm"> delete </button>
                            <button className="border rounded-sm px-4 py-1"> deactivate </button>
                            <button className="border rounded-sm px-4 py-1"> reactivate </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2 overflow-auto">
                <b className="text-2xl"> snippets </b>
                {snippets.map((snippet, _: number) => (
                    <div
                        key={_}
                        className="flex flex-col gap-2 bg-stack p-2 rounded-lg">
                        <b> {snippet.title} </b>
                        <p className="text-xs opacity-50"> {snippet.id} </p>
                        <p> user: {snippet.user?.name} </p>
                        <div className="flex gap-2">
                            <button className="bg-red-800 px-4 py-1 rounded-sm"> delete </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}