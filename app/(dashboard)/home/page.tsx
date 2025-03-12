"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/lib/auth";
import { ocurrenceCountSelf, ocurrenceCountAll, muderCount, theftCount } from "@/app/lib/home";
import StatisticsCard from "@/app/components/home/statistics-card";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import news from "../../../public/images/news.png";
import { MegaphoneIcon, UserGroupIcon, FaceFrownIcon, ScaleIcon } from "@heroicons/react/24/solid";

interface User {
    id: string
    email: string
    name: string
}

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [ocorrenceCountSelf, setOcorrenceCountSelf] = useState<number | null>(null);
    const [ocorrenceCountAll, setOcorrenceCountAll] = useState<number | null>(null);
    const [muderCountAll, setMuderCountAll] = useState<number | null>(null);
    const [theftCountAll, setTheftCountAll] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await getCurrentUser();
                
                if(userData) {
                    setCurrentUser(userData);
                } else {
                    router.push("/login");
                }

            } catch (error) {
                console.error("An error ocurred: ", error);
                router.push("/login");
            } finally {
                const ocurrenceCountSelfRequest = await ocurrenceCountSelf();
                setOcorrenceCountSelf(Number(ocurrenceCountSelfRequest.count));

                const ocurrenceCountAllRequest = await ocurrenceCountAll();
                setOcorrenceCountAll(Number(ocurrenceCountAllRequest.count));

                const muderCountRequest = await muderCount();
                setMuderCountAll(Number(muderCountRequest.count));

                const theftCountRequest = await theftCount();
                setTheftCountAll(Number(theftCountRequest.count));

                setLoadingPage(false);
            }
        }

        loadUser();
    }, [router]);

    if (loadingPage) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col p-12">
            <Image src={logo} alt="Logo" className="w-12"/>
            <h2 className="text-white text-3xl font-bold mt-6">Olá, {currentUser?.name}</h2>
            <p className="text-white mt-2">Ajude a comunidade a reportar crimes em sua região.</p>
            <div className="flex justify-center items-center w-full">
                <Link href="/news">
                    <div className="flex flex-row justify-between items-center w-auto rounded-xl bg-[#464646] mt-8 ">
                        <div className="flex flex-col ml-9 text-white">
                            <p>Notícia</p>
                            <h3 className="font-extrabold text-3xl">Funciona mesmo?</h3>
                            <p>Descubra a importância de reportar um crime no N-Report.</p>
                        </div>
                        <Image src={news} alt="News" className="w-52"/>
                    </div>
                </Link>
            </div>
            <h2 className="text-white text-3xl font-bold mt-6">Estatísticas</h2>
            <div className="flex flex-row gap-4 mt-8 justify-center">
                <StatisticsCard title="Reportes Individuais" Icon={MegaphoneIcon} stats={ocorrenceCountSelf}/>
                <StatisticsCard title="Total de Reportes" Icon={UserGroupIcon} stats={ocorrenceCountAll}/>
                <StatisticsCard title="Total de Homicídios" Icon={FaceFrownIcon} stats={muderCountAll}/>
                <StatisticsCard title="Total de Furtos" Icon={ScaleIcon} stats={theftCountAll}/>
            </div>
            <h2 className="text-white text-3xl font-bold mt-6">Criar Reporte</h2>
            <p className="text-white mt-2">Clique no botão abaixo para reportar um novo crime que você presenciou!</p>
            <Link href="/maps" className="bg-[#3BC9DB] text-white font-bold py-2 px-4 rounded mt-6 w-72 text-center">Reportar</Link>
        </div>
    )
}