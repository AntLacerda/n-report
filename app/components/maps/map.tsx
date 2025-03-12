"use client"

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { getOcurrences } from "@/app/lib/maps";
import Link from "next/link";

const customIcon = new Icon({
    iconUrl: '/images/pin.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
})

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

const DEFAULT_POSITION: LatLngExpression = [-6.88083, -38.5611];

export default function Map() {
    const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);
    const [allOcurrences, setAllOcurrences] = useState<Ocurrence[] | null>([]);

    useEffect(()=> {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const {latitude, longitude} = location.coords;
                    setPosition([latitude, longitude]);
                },
                () => {
                    console.warn("User denied or error getting location. Using default location.")
                }
            );
        }

        async function fetchOcurrences() {
            try {
                const ocurrencesData = await getOcurrences();
                
                if(ocurrencesData) {
                    setAllOcurrences(ocurrencesData);
                }
            } catch (error) {
                console.error("An error ocurred: ", error);
            }
        }

        fetchOcurrences();
    }, []);

    return (
        <>
            <div>
                <MapContainer 
                    center={position} 
                    zoom={14} 
                    className="h-[650px] w-full shadow-lg"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {allOcurrences && allOcurrences.map((ocurrence) => (
                        <Marker 
                            key={ocurrence.title} 
                            position={[ocurrence.latitude, ocurrence.longitude]} 
                            icon={customIcon}
                        >
                            <Popup >
                                <div className=" flex flex-col bg-gray-800 text-white rounded-lg p-4 w-72 border-t-4 border-[#3BC9DB]">
                                    <h3 className="font-light text-xs bg-[#3BC9DB] p-1 rounded-md w-fit">{ocurrence.type}</h3>
                                    <h3 className="font-bold text-lg mt-2">{ocurrence.title}</h3>
                                    <span className="text-sm mt-1">{ocurrence.date}</span>
                                    <span className="text-sm mt-1">{ocurrence.time}</span>
                                    <p className="text-sm ">{ocurrence.description}</p>
                                    <Link href={`/ocurrence/${ocurrence.id}`} className="text-[#3BC9DB] underline mt-4">Ver mais</Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </>
    )
}