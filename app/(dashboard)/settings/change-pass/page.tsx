"use client"

import ChangeFormComponent from "@/app/components/settings/change-form";
import HeaderComponent from "@/app/components/settings/header";
import Link from "next/link";

export default function ChangePassPage() {
    return(
        <div className="w-full h-screen">
            <HeaderComponent title="Mudar Senha"/>
            <main className="p-9 text-white">
                <div>
                    <h2 className="text-2xl font-bold">Mudar e Recuperar a Senha</h2>
                    <p className="text-lg">Siga o passo a passo para mudar a sua senha.</p>
                </div>
                <div className="w-full mt-28 flex flex-col gap-4 justify-center items-center">
                    <ChangeFormComponent/>
                </div>
            </main>
        </div>
    )
}