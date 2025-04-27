"use server";

import database from "@/config/database";

async function deleteUser(id: string) {
    await database.user.delete({ where: { id } });
}

async function deactivateUser(id: string) {
    await database.user.update({ where: { id }, data: { isDeactivated: true } });
}

async function reactivateUser(id: string) {
    await database.user.update({ where: { id }, data: { isDeactivated: false } });
}

async function deleteSnippet(id: string) {
    await database.snippet.delete({ where: { id } });
}

export { deleteUser, deactivateUser, deleteSnippet, reactivateUser, };