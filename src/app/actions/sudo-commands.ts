"use server";

import database from "@/config/database";
import { revalidatePath } from "next/cache";

async function deleteUser(formData: FormData) {
    const id = formData.get("id") as string;
    if (!id) throw new Error("User ID missing");
    await database.user.delete({ where: { id } });
    revalidatePath('/', 'layout');
}
async function deactivateUser(formData: FormData) {
    const id = formData.get("id") as string;
    if (!id) throw new Error("User ID missing");
    await database.user.update({ where: { id }, data: { isDeactivated: true } });
    revalidatePath('/', 'layout');
}

async function reactivateUser(formData: FormData) {
    const id = formData.get("id") as string;
    if (!id) throw new Error("User ID missing");
    await database.user.update({ where: { id }, data: { isDeactivated: false } });
    revalidatePath('/', 'layout');
}

async function deleteSnippet(formData: FormData) {
    const id = formData.get("id") as string;
    if (!id) throw new Error("Snippet ID missing");
    await database.snippet.delete({ where: { id } });
    revalidatePath('/', 'layout');
}

export { deleteUser, deleteSnippet, reactivateUser, deactivateUser }