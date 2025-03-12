import Navbar from "../components/navbar";
import type React from "react";

interface LayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({children}: LayoutProps) {
    return (
        <div className="flex flex-row bg-[#292929] w-full h-full">
            <Navbar/>
            <main className="w-full h-full">
                {children}
            </main>
        </div>
    )
}