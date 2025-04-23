'use server';

import Divider from "@/app/components/divider";
import database from "@/config/database";
import { AlertTriangle, CalendarRange, Shield, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {

    //retrieve user using slug as unique name
    const { slug } = await params;
    const user = await database.user.findUnique(
        {
            where: {
                name: slug
            },
            omit: {
                password: true
            }
        });
    if (!user) redirect("/error?status=404&message=not+found");


    return (
        <div className="flex-1 flex">
            <div className="flex p-4 gap-4 bg-stack rounded-lg h-min">
                <User />
                <div className="flex flex-col gap-2">
                    <b> {user.name} </b>
                    <div className="flex gap-2 items-baseline">
                        <CalendarRange className="opacity-50" size={16} />
                        <p> created: {user.created.toLocaleDateString()} </p>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <CalendarRange className="opacity-50" size={16} />
                        <p> last login: {user.lastLogin.toLocaleTimeString()} </p>
                    </div>
                    <Divider />
                    <div className="flex flex-col">
                        {user.isAdmin && (
                            <div className="flex gap-2 items-baseline">
                                <Shield color="red" className="opacity-50" size={16} />
                                <p> This User is a Superuser (sudo) / Admin </p>
                            </div>
                        )}
                        {user.isDeactivated && (
                            <div className="flex gap-2 items-baseline">
                                <AlertTriangle color="orange" className="opacity-50" size={16} />
                                <p> This User is banned / deactivated </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}