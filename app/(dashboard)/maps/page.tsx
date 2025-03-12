import "leaflet/dist/leaflet.css";
import Map from "@/app/components/maps/map";
import Link from "next/link";

export default function Maps() {
    return (
        <>
            <div className="w-full h-auto">
                <Map/>
                <Link href={"/report"} about="reportar" className="bg-[#3BC9DB] text-white ">
                    <button className="w-full h-12 bg-[#3BC9DB] font-semibold">Reportar</button>
                </Link>
            </div>
        </>
    );
}
