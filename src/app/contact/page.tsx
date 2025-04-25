'use server';

import contacts from "@/assets/constants/contacts";
import Link from "next/link";

export default async function page() {



    return (
        <div className="flex flex-col gap-2 overflow-auto">
            {contacts.map((contact) => (
                <Link
                    key={contact.id}
                    title={contact.title}
                    href={contact.url}
                    className="flex gap-4 p-4 bg-stack rounded-lg min-w-[300px]"
                >
                    {contact.icon}
                    <div className="h-full border border-stack" />
                    <b> {contact.title} </b>
                </Link>
            ))}
        </div>
    );
}