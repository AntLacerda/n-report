"use client"

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getOcurrenceById } from "@/app/lib/maps";
import Image from "next/image";
import ocurrenceImage from "../../../public/images/ocurrence.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Ocurrence {
    id: string;
    title: string;
    description: string;
    type: string;
    date: string;
    time: string;
}

export default function OcurrencePage({ params }: { params: Promise<{ id: string }> }) {
    const [actualOcurrence, setActualOcurrence] = useState<Ocurrence | null>(null);

    useEffect(()=> {
        async function fetchOcurrence() {
            try {
                const ocurrence = await getOcurrenceById((await params).id);
                
                if(ocurrence){
                    setActualOcurrence(ocurrence);
                } else {
                    notFound();
                }

            } catch (error) {
                console.error("An error ocurred: ", error);
                notFound();
            } 
        }

        fetchOcurrence();
    }, [])

    return(
        <div className="bg-[#292929] w-full h-screen text-white">
            <div className="relative">
                <ArrowLeftIcon className=" absolute w-8 h-8 cursor-pointer text-white top-4 left-4" onClick={() => window.history.back()}/>
                <Image src={ocurrenceImage} alt="Ocurrence" className="w-full h-80"/>
            </div>
            <div className="flex flex-col pt-6 pl-12">
                <h2 className="text-xs font-light bg-[#3BC9DB] p-2 rounded-md w-fit">{actualOcurrence?.type}</h2>
                <h1 className="text-3xl font-bold mt-2">{actualOcurrence?.title}</h1>
                <p className="text-sm mt-6">{actualOcurrence?.date}</p>
                <p className="text-sm mt-2">{actualOcurrence?.time}</p>
                <p className="text-lg mt-6">{actualOcurrence?.description}</p>

            </div>
        </div>
    )
}