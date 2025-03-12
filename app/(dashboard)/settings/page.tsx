"use client"

import Link from "next/link";
import { Bars3Icon, ArrowRightIcon, LockClosedIcon, UserIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { logout } from "@/app/lib/auth";

export default function SettignsPage() {
    return (
        <main className="w-full h-full ">
            <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
                <Link href={"/settings/self"} className="text-white flex flex-row justify-between w-1/3 h-9 border-[#3BC9DB] border-b-2  items-center p-8">
                    <Bars3Icon className="w-6 text-[#3BC9DB]" />
                    <button>Meus Reportes</button>
                    <ArrowRightIcon className="w-6 " />
                </Link>

                <Link href={"/settings/change-pass"} className="text-white flex flex-row justify-between w-1/3 h-9 border-[#3BC9DB] border-b-2  items-center p-8">
                    <LockClosedIcon className="w-6 text-[#3BC9DB]" />
                    <button>Mudar Senha</button>
                    <ArrowRightIcon className="w-6 " />
                </Link>

                <Link href={"/settings/change-login"} className="text-white flex flex-row justify-between w-1/3 h-9 border-[#3BC9DB] border-b-2  items-center p-8">
                    <UserIcon className="w-6 text-[#3BC9DB]" />
                    <button>Mudar Login</button>
                    <ArrowRightIcon className="w-6 " />
                </Link>

                <div onClick={logout} className="text-[#e33c3c] flex flex-row justify-between w-1/3 h-9 border-[#e33c3c] border-b-2  items-center p-8">
                    <ArrowRightEndOnRectangleIcon className="w-6" />
                    <button >Sair da Conta</button>
                    <ArrowRightIcon className="w-6 " />
                </div>
            </div>
        </main>
    )
}