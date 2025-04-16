'use server';

import Divider from "../components/divider";

export default async function page({ searchParams }: { searchParams: Promise<{ status: string; message: string; }> }) {

    //get elements
    const status = (await searchParams).status || 500;
    const message = (await searchParams).message || "Uncaught Error";


    return (
        <div className="flex size-full items-center justify-center flex-col gap-4">
            <h1 className="text-3xl font-bold"> {status} </h1>
            <Divider width={128} />
            <i className="opacity-50"> {message} </i>
        </div>
    );
}