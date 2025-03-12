"use client"

import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { removeOcurrence } from "@/app/lib/ocurrenceCardEdit";

interface Ocurrence {
    id: string;
    title: string;
    description: string;
    type: string;
    latitude: number;
    longitude: number;
    date: string;
    time: string;
    user_id: string;
    policeStation_id: string;
}

export default function OcurrenceCardEdit( {ocurrence}: {ocurrence: Ocurrence} ) {
    return (
        <div className="flex flex-col justify-between p-4 w-96 h-80 bg-[#464646] border-[#3BC9DB] border-t-4 rounded-md" >
            <div>
                <div 
                    onClick={
                        async () => {
                            await removeOcurrence(ocurrence.id)
                            window.location.reload();
                        }
                    } 
                    className="flex flex-row w-full justify-between ">
                    <span className="bg-[#3BC9DB] text-white p-1 rounded-md w-fit h-fit ">{ocurrence.type}</span>
                    <div className="bg-[#f33b2e] p-2 rounded-full">
                        <TrashIcon className="w-6 text-white cursor-pointer"/>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="font-bold text-2xl">{ocurrence.title}</p>
                    <p className=" text-sm">{ocurrence.date}</p>
                    <p className=" text-sm">{ocurrence.time}</p>
                    <p className=" text-sm mb-8">{ocurrence.description}</p>
                </div>

            </div>

            <div>
                <Link href={`/edit-ocurrence/${ocurrence.id}`} className={"w-full"}>
                    <button className="w-full h-10 bg-[#3BC9DB] text-white text-center rounded-md">Editar</button>
                </Link>
            </div>

        </div>
    )
}