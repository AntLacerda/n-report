"use client"

import { useEffect, useState } from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import OcurrenceCardEdit from "@/app/components/settings/ocurrence-card-edit"
import { getAllSelfOcurrences } from "@/app/lib/editForm"
import Link from "next/link"
import HeaderComponent from "@/app/components/settings/header"

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

export default function SettignsSelfPage() {
    const [ocurrences, setOcurrences] = useState<Ocurrence[] | null>([]);

    useEffect(() => {
        async function fetchOcurrences() {
            try {
                const ocurrencesData = await getAllSelfOcurrences();

                if (ocurrencesData) {
                    setOcurrences(ocurrencesData);
                }
            } catch (error) {
                console.error("An error ocurred: ", error);
            }
        }

        fetchOcurrences();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col">
            <HeaderComponent title="Meus Reportes"/>
            <main className="w-full h-screen flex flex-row flex-wrap justify-center gap-6 pt-6">
                {ocurrences && ocurrences.map((ocurrence) => <OcurrenceCardEdit ocurrence={ocurrence} key={ocurrence.id}/>) }
            </main>   
        </div>
    )
}