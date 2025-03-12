"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import { getPoliceStations } from "@/app/lib/reportForm";
import { UnderlineIcon, ScaleIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { CalendarIcon, ClockIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { createOcurrence } from "@/app/lib/reportForm";

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

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportForm({ position }: { position: Array<number> }) {
    const [currentUser, setCurrentUser] = useState<User>({ id: "...", email: "", name: "" });
    const [policeStations, setPoliceStations] = useState<PoliceStation[]>([{ id: "...", name: "" }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getCurrentUser();

                if (userData) {
                    setCurrentUser(userData);
                }

            } catch (error) {
                console.error("An error ocurred: ", error);
            }
        }

        async function fetchPoliceStations() {
            try {
                const policeStationsData = await getPoliceStations();

                if (policeStationsData) {
                    setPoliceStations(policeStationsData);
                }

            } catch (error) {
                console.error("An error ocurred: ", error);
            }
        }

        fetchUser();
        fetchPoliceStations();
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
    });

    const onSubmit = async (data: ReportFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {

            const finalOcurrence = {
                title: data.title,
                description: data.description as string,
                type: data.type,
                latitude: Number(position[0]), //
                longitude: Number(position[1]), //
                date: data.date,
                time: data.time,
                user_id: currentUser.id,
                policeStation_id: data.police_station_id as string,
            }

            const response = await createOcurrence({ ...finalOcurrence });

            if (response) {

                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    router.push("/maps");
                }, 3000);
            }

        } catch (error) {
            setError("An error ocurred: " + error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={(event) => {
                handleSubmit(onSubmit)(event);
            }}
            className="flex flex-row gap-4 w-full justify-center pt-9"
        >
            <div className="w-1/3 flex flex-col gap-4">
                <div className="relative flex flex-row items-center w-full">
                    <label className="hidden">Título:</label>
                    <UnderlineIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]" />
                    <input {...register("title")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 placeholder:text-lg text-white" placeholder="Título" />
                </div>
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <div className="relative flex flex-row items-center w-full">
                    <label className="hidden">Delegacia de Policia:</label>
                    <BuildingLibraryIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]" />
                    <select {...register("police_station_id")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg ">
                        <option value="">Selecione</option>
                        {policeStations.map((policeStation) => (
                            <option key={policeStation.id} value={policeStation.id}>
                                {policeStation.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="relative flex flex-row items-center w-full">
                    <label className="hidden">Tipo:</label>
                    <ScaleIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]" />
                    <select {...register("type")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg ">
                        <option value="">Selecione</option>
                        <option value="furto">Furto</option>
                        <option value="homicidio">Homicidio</option>
                        <option value="roubo">Roubo</option>
                        <option value="vandalismo">Vandalismo</option>
                    </select>
                </div>
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                <div className="relative flex flex-row items-center w-full">
                    <label className="hidden">Data:</label>
                    <CalendarIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]" />
                    <input type="date" {...register("date")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg " />
                </div>
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}

                <div className="relative flex flex-row items-center w-full">
                    <label className="hidden">Horário:</label>
                    <ClockIcon className="w-6 h-auto absolute ml-2 text-[#3BC9DB]" />
                    <input type="time" {...register("time")} className="w-full peer h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg " />
                </div>
                {errors.time && <p className="text-red-500">{errors.time.message}</p>}
            </div>

            <div className="w-1/3 flex flex-col gap-4 justify-between">

                <div className="relative flex flex-row  w-full h-full">
                    <label className="hidden">Descrição:</label>
                    <Bars3CenterLeftIcon className="w-6 h-auto absolute ml-2 mt-6 text-[#3BC9DB]" />
                    <textarea {...register("description")} className="w-full peer h-full pt-6 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-lg " placeholder="Descreva o ocorrido..." />
                </div>

                <button type="submit" className="w-full h-12 bg-[#3BC9DB] rounded-md text-white font-bold">Enviar</button>
                {isSubmitting && <p>Enviando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {isSuccess && <p className="text-green-500">Ocorrência cadastrada com sucesso!</p>}
            </div>
        </form>
    );
}