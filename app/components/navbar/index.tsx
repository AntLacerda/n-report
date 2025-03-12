"use client"

import Link from "next/link";
import Image from "next/image";
import navLogo from "../../../public/images/navLogo.png";
import { HomeIcon, MapIcon, MapPinIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, MapIcon as MapIconSolid, MapPinIcon as MapPinIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/24/solid';
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-[#353535] h-screen w-80 flex flex-col justify-around pl-11 gap-32">
            <div>
                <Image src={navLogo} alt="Nav Logo" className="w-48" />
            </div>
            <div className="flex flex-col gap-4 w-2/3">
                <Link href="/home" className={`w-full flex flex-row items-center gap-8 h-12 text-xl ${pathname === "/home" ? "text-[#3BC9DB] font-medium " : "text-white opacity-25"} hover:opacity-100 transition duration-300`}>
                    {
                        pathname === "/home" ? (
                            <HomeIconSolid className="w-6 h-auto" />
                        ) : (
                            <HomeIcon className="w-6 h-auto" />
                        )
                    }
                    Home
                </Link>
                <Link href="/maps" className={`w-full flex flex-row items-center gap-8 h-12 text-xl ${pathname === "/maps" ? "text-[#3BC9DB] font-medium " : "text-white opacity-25"} hover:opacity-100 transition duration-300`}>
                    {
                        pathname === "/maps" ? (
                            <MapIconSolid className="w-6 h-auto" />
                        ) : (
                            <MapIcon className="w-6 h-auto" />
                        )
                    }
                    Mapa
                </Link>
                <Link href="/report" className={`w-full flex flex-row items-center gap-8 h-12 text-xl ${pathname === "/report" ? "text-[#3BC9DB] font-medium " : "text-white opacity-25"} hover:opacity-100 transition duration-300`}>
                    {
                        pathname === "/report" ? (
                            <MapPinIconSolid className="w-6 h-auto" />
                        ) : (
                            <MapPinIcon className="w-6 h-auto" />
                        )
                    }
                    Report
                </Link>
            </div>
            <div>
                <Link href="/settings" className={`w-full flex flex-row items-center gap-8 h-12 text-xl ${pathname === "/settings" ? "text-[#3BC9DB] font-medium " : "text-white opacity-25"} hover:opacity-100 transition duration-300`}>
                    {
                        pathname === "/settings" ? (
                            <Cog6ToothIconSolid className="w-6 h-auto" />
                        ) : (
                            <Cog6ToothIcon className="w-6 h-auto" />
                        )
                    }
                    Settings
                </Link>
            </div>
        </nav>
    )
}