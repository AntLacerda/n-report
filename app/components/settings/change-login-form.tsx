"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { UserIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { changeLogin, checkEmailMatch } from "@/app/lib/changeLogin"


const changeFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    newEmail: z.string().email("Invalid email address"),
    repeatEmail: z.string().email("Invalid email address"),
})

type ChangeFormValues = z.infer<typeof changeFormSchema>;

export default function ChangeFormComponent() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ChangeFormValues>({ resolver: zodResolver(changeFormSchema) });

    const onSubmit = async (data: ChangeFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            if (!checkEmailMatch(data.repeatEmail, data.newEmail)) {
                return;
            }

            const response = await changeLogin({ email: data.email, newEmail: data.newEmail });

            if (response) {
                router.push("/settings");
            }
        } catch (error) {
            setError("An error ocurred: " + error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-1/3 justify-between gap-2">
            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="email" className="hidden">
                    Digite o seu email atual
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <UserIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("email")}
                        type="text"
                        id="email"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Digite o seu email atual"
                    />

                </div>

                {
                    errors.email &&
                    <p className="text-red-500 text-sm m-1">
                        {errors.email.message}
                    </p>
                }
            </div>

            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="newEmail" className="hidden">
                    Digite o novo email
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <UserIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("newEmail")}
                        id="newEmail"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Digite o novo email"
                    />
                </div>

                {
                    errors.newEmail &&
                    <p className="text-red-500 text-sm m-1">
                        {errors.newEmail.message}
                    </p>
                }

            </div>

            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="repeatEmail" className="hidden">
                    Digite o novo email novamente
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <UserIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("repeatEmail")}
                        id="repeatEmail"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Digite o novo email novamente"
                    />
                </div>

                {
                    errors.repeatEmail &&
                    <p className="text-red-500 text-sm m-1">
                        {errors.repeatEmail.message}
                    </p>
                }

            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#3BC9DB] rounded-md text-white font-bold"
            >
                {isSubmitting ? "Loading..." : "Atualizar Email"}
            </button>

            {error && <p className="text-red-500 text-sm m-1">{error}</p>}
        </form>
    )
}