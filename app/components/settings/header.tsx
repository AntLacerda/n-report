"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function HeaderComponent( {title}: {title: string} ) {
    return (
        <header className="flex flex-row items-center p-3 w-full h-20 bg-[#3BC9DB]">
            <ArrowLeftIcon className="w-6 text-white cursor-pointer mr-[500px]" onClick={() => window.history.back()}/>
            <h1 className="text-white text-2xl font-bold text-center">{title}</h1>
        </header>
    )
}