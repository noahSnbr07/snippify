'use server';

import database from "@/config/database";
import getAuthentication from "@/functions/get-authentication";
import { redirect } from "next/navigation";
import ActionButton from "./components/action-button";
import { deactivateUser, deleteSnippet, deleteUser, reactivateUser } from "../actions/sudo-commands";

export default async function Page() {
    const authentication = await getAuthentication();
    if (!authentication?.isAdmin) redirect("/error?status=403&message=unauthorized");

    const users = await database.user.findMany();
    const snippets = await database.snippet.findMany({ include: { user: true } });

    return (
        <div className="flex gap-4 p-4">
            <div className="flex flex-col gap-2 overflow-auto">
                <b className="text-2xl">Users</b>
                {users.map(user => (
                    <div key={user.id} className="flex flex-col gap-2 bg-stack p-2 rounded-lg">
                        <b>{user.name}</b>
                        <p className="text-xs opacity-50">{user.id}</p>
                        {user.isDeactivated && <p className="text-warn text-sm"> * DEACTIVATED </p>}
                        {user.isAdmin && <p className="text-warn text-sm"> * ADMIN </p>}
                        <div className="flex gap-2">
                            <ActionButton
                                title="Delete"
                                markDanger
                                action={deleteUser}
                                id={user.id}
                            />
                            <ActionButton
                                title="Deactivate"
                                action={deactivateUser}
                                id={user.id}
                            />
                            <ActionButton
                                title="Reactivate"
                                action={reactivateUser}
                                id={user.id}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
                <b className="text-2xl">Snippets</b>
                {snippets.map(snippet => (
                    <div key={snippet.id} className="flex flex-col gap-2 bg-stack p-2 rounded-lg">
                        <b>{snippet.title}</b>
                        <p className="text-xs opacity-50">{snippet.id}</p>
                        <p>User: {snippet.user?.name}</p>
                        <ActionButton
                            markDanger
                            title="Delete"
                            action={deleteSnippet}
                            id={snippet.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
