"use server";

import database from "@/config/database";
import paginationConfig from "@/config/pagination";

//define returned props
interface props {
    totalSnippets: number;
    totalUsers: number;
    totalPages: number;
}

export default async function getDatabaseStats(): Promise<props> {

    //get base stats
    const totalSnippets = await database.snippet.count();
    const totalUsers = await database.user.count();

    //calculate advanced stats
    const totalPages = Math.floor(totalSnippets / paginationConfig.results);

    return { totalPages, totalSnippets, totalUsers } as props;
}