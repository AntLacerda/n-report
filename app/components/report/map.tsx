"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import ReportForm from "./report-form";

const customIcon = new Icon({
    iconUrl: '/images/pin.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
})

const DEFAULT_POSITION: LatLngExpression = [-6.88083, -38.5611];

export default function Map() {
    const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);
    const [positionProps, setPositionProps] = useState<Array<number>>([0, 0]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const { latitude, longitude } = location.coords;
                    setPosition([latitude, longitude]);
                },
                () => {
                    console.warn("User denied or error getting location. Using default location.")
                }
            );
        }
    }, []);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                setPositionProps([e.latlng.lat, e.latlng.lng]);
            },
        });

        return (
            <Marker position={position} icon={customIcon} />
        )
    }

    return (
        <>
            <div>
                <MapContainer
                    center={position}
                    zoom={14}
                    className="h-[250px] w-full shadow-lg"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
            <div>
                <h2 className="text-4xl text-white font-bold ml-9 mt-4">Reportar</h2>
                <p className="text-white text-lg ml-9 mt-1">Reporte a ocorrência que aconteceu com você ou que você presenviou. Isso ajudará aos gestores e polícia a tomar providências.</p>
                <ReportForm position={positionProps} />
            </div>
        </>
    );
}