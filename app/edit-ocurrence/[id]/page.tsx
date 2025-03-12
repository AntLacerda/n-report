"use client"

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getOcurrenceById } from "@/app/lib/maps";
import { ArrowLeftIcon, Bars3CenterLeftIcon, BuildingLibraryIcon, CalendarIcon, ClockIcon, ScaleIcon, UnderlineIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { getCurrentUser } from "@/app/lib/auth";
import { getPoliceStations } from "@/app/lib/reportForm";
import { useForm } from "react-hook-form";
import { editOcurrence } from "@/app/lib/editForm";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { useRouter } from "next/navigation";

interface Ocurrence {
    id: string;
    title: string;
    description: string;
    type: string;
    date: string;
    time: string;
}

interface User {
    id: string
    email: string
    name: string
}

interface PoliceStation {
    id: string
    name: string
}

const reportSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    type: z.enum(["furto", "homicidio", "roubo", "vandalismo"], {
      invalid_type_error: "Tipo inválido",
    }),
    date: z.string().min(10, "Data inválida"),
    time: z.string().min(5, "Horário inválido"),
    police_station_id: z.string().optional(),
});

const customIcon = new Icon({
    iconUrl: '/images/pin.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

type ReportFormValues = z.infer<typeof reportSchema>;

const DEFAULT_POSITION: LatLngExpression = [-6.88083, -38.5611];

export default function OcurrencePage({ params }: { params: Promise<{ id: string }> }) {
    const [actualOcurrence, setActualOcurrence] = useState<Ocurrence | null>(null);

    const [currentUser, setCurrentUser] = useState<User>({ id: "...", email: "", name: "" });
    const [policeStations, setPoliceStations] = useState<PoliceStation[]>([{ id: "...", name: "" }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);
    const [positionProps, setPositionProps] = useState<Array<number>>([0, 0]);

    const Router = useRouter();

    useEffect(()=> {
        async function fetchUser() {
            try {
                const userData = await getCurrentUser();
    
                if(userData) {
                    setCurrentUser(userData);
                } 
    
            } catch (error) {
                console.error("An error ocurred: ", error);
            }
        }

        async function fetchPoliceStations() {
            try {
                const policeStationsData = await getPoliceStations();

                if(policeStationsData) {
                    setPoliceStations(policeStationsData);
                }

            } catch (error) {
                console.error("An error ocurred: ", error);
            }
        }
        
        async function fetchOcurrence() {
            try {
                const ocurrence = await getOcurrenceById((await params).id);
                
                if(ocurrence){
                    setActualOcurrence(ocurrence);
                    setPosition([ocurrence.latitude, ocurrence.longitude]);
                    setPositionProps([ocurrence.latitude, ocurrence.longitude]);
                } else {
                    notFound();
                }

            } catch (error) {
                console.error("An error ocurred: ", error);
                notFound();
            } 
        }

        fetchOcurrence();
        fetchUser();
        fetchPoliceStations();
    }, []);

    const { register, handleSubmit, formState: { errors }} = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
    });

    const onEditOcurrence = async (data: ReportFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const finalOcurrence = {
                id: actualOcurrence?.id as string,
                title: data.title,
                description: data.description as string,
                type: data.type,
                latitude: Number(positionProps[0]), 
                longitude: Number(positionProps[1]), 
                date: data.date,
                time: data.time,
                user_id: currentUser.id,
                policeStation_id: data.police_station_id as string,
            }

            const response = await editOcurrence((await params).id, {...finalOcurrence});
            
            if(response) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    Router.push("/maps");
                }, 3000);
            }

        } catch (error) {
            setError("An error ocurred: " + error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const LocationMarker = () => {
        useMapEvents({
            click(e){
                setPosition([e.latlng.lat, e.latlng.lng]);
                setPositionProps([e.latlng.lat, e.latlng.lng]);
            },
        });

        return(
            <Marker position={position} icon={customIcon}/>
        )
    }

    return(
        <main className="bg-[#292929] w-full h-screen text-white">
            <div>
                <MapContainer 
                    center={position} 
                    zoom={6} 
                    className="h-[250px] w-full shadow-lg"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <LocationMarker/>
                </MapContainer>
            </div>

            <div>
            </div>
            <div className="flex flex-row">
                <ArrowLeftIcon className=" w-12 cursor-pointer text-white pl-4 pt-4" onClick={() => window.history.back()}/>
                <div className="flex flex-col pl-12 pt-4">
                    <p className="text-3xl font-bold">Editar</p>
                    <p className="text-lg ">Edite as informações da ocorrência que você criou!</p>
                </div>
            </div>


            <div>
                <form 
                        onSubmit={(event) => {
                            handleSubmit(onEditOcurrence)(event);
                        }}
                        className="flex flex-row gap-4 w-full justify-center pt-9"
                      >
                        <div className="w-1/3 flex flex-col gap-4">
                            <div className="relative flex flex-row items-center w-full">
                                <label className="hidden">Título:</label>
                                <UnderlineIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]"/>
                                <input {...register("title")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 placeholder:text-lg text-white" placeholder={actualOcurrence?.title}/>
                            </div>
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                
                            <div className="relative flex flex-row items-center w-full">
                                <label className="hidden">Delegacia de Policia:</label>
                                <BuildingLibraryIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]"/>
                                <select {...register("police_station_id")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg ">
                                    <option value={""}>Selecione</option>
                                    {policeStations.map((policeStation) => (
                                        <option key={policeStation.id} value={policeStation.id}>
                                            {policeStation.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                
                            <div className="relative flex flex-row items-center w-full">
                                <label className="hidden">Tipo:</label>
                                <ScaleIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]"/>
                                <select {...register("type")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg ">
                                    <option value={actualOcurrence?.type}>Selecione</option>
                                    <option value="furto">Furto</option>
                                    <option value="homicidio">Homicidio</option>
                                    <option value="roubo">Roubo</option>
                                    <option value="vandalismo">Vandalismo</option>
                                </select>
                            </div>
                            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                
                            <div className="relative flex flex-row items-center w-full">
                                <label className="hidden">Data:</label>
                                <CalendarIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]"/>
                                <input type="date" {...register("date")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg " />
                            </div>
                            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                    
                            <div className="relative flex flex-row items-center w-full">
                                <label className="hidden">Horário:</label>
                                <ClockIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]"/>
                                <input type="time" {...register("time")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg " />
                            </div>
                            {errors.time && <p className="text-red-500">{errors.time.message}</p>}
                        </div>
                
                        <div className="w-1/3 flex flex-col gap-4 justify-between">
                    
                            <div className="relative flex flex-row  w-full h-full">
                                <label className="hidden">Descrição:</label>
                                <Bars3CenterLeftIcon className="w-6 h-auto absolute ml-2 mt-6 text-[#3BC9DB]"/>
                                <textarea {...register("description")} className="w-full peer h-full pt-6 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg " placeholder={actualOcurrence?.description}></textarea>
                            </div>
                
                            <button type="submit" className="w-full h-12 bg-[#3BC9DB] rounded-md text-white font-bold">Enviar</button>
                            {isSubmitting && <p>Enviando...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            {isSuccess && <p className="text-green-500">Ocorrência editada com sucesso!</p>}
                        </div>  
                      </form>

            </div>
        </main>
    )
}