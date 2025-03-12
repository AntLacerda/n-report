"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import{ z } from "zod"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { changePass, checkPasswordMatch } from "@/app/lib/changePass"


const changeFormSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Password must be at least 8 characters"),
})

type ChangeFormValues = z.infer<typeof changeFormSchema>;

export default function ChangeFormComponent() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }} = useForm<ChangeFormValues>({resolver: zodResolver(changeFormSchema)});
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: ChangeFormValues) => {
        setIsSubmitting(true);
        setError(null);
        
        try {
            if (!checkPasswordMatch(data.newPassword, data.repeatPassword)) {
                return;
            }

            const response = await changePass({currentPassword: data.password, newPassword: data.newPassword});

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
                <label htmlFor="password" className="hidden">
                    Digite a sua senha atual
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <LockClosedIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Digite a sua senha atual"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        <EyeIcon 
                            className={clsx(
                                    "size-6 text-[#3BC9DB] absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                                    showPassword ? "opacity-0" : "opacity-100"
                                )
                            } 
                        />
                        <EyeSlashIcon 
                            className={clsx(
                                    "size-6 text-[#3BC9DB] absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                                    showPassword ? "opacity-100" : "opacity-0"
                                )
                            } 
                        />
                    </button>
                </div>

                {
                    errors.password &&
                        <p className="text-red-500 text-sm m-1">
                            {errors.password.message}
                        </p>
                }
            </div>
            
            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="newPassword" className="hidden">
                    Digite a nova senha
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <LockClosedIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("newPassword")}
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Digite a nova senha"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        <EyeIcon 
                            className={clsx(
                                    "size-6 text-[#3BC9DB] absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                                    showPassword ? "opacity-0" : "opacity-100"
                                )
                            } 
                        />
                        <EyeSlashIcon 
                            className={clsx(
                                    "size-6 text-[#3BC9DB] absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                                    showPassword ? "opacity-100" : "opacity-0"
                                )
                            } 
                        />
                    </button>
                </div>

                {
                    errors.password &&
                        <p className="text-red-500 text-sm m-1">
                            {errors.password.message}
                        </p>
                }

            </div>

            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="repeatPassword" className="hidden">
                    Digite a nova senha novamente
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <LockClosedIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("repeatPassword")}
                        type={showPassword ? "text" : "password"}
                        id="repeatPassword"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Digite a nova senha novamente"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        <EyeIcon 
                            className={clsx(
                                    "size-6 text-[#3BC9DB] absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                                    showPassword ? "opacity-0" : "opacity-100"
                                )
                            } 
                        />
                        <EyeSlashIcon 
                            className={clsx(
                                    "size-6 text-[#3BC9DB] absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                                    showPassword ? "opacity-100" : "opacity-0"
                                )
                            } 
                        />
                    </button>
                </div>

                {
                    errors.password &&
                        <p className="text-red-500 text-sm m-1">
                            {errors.password.message}
                        </p>
                }

            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#3BC9DB] rounded-md text-white font-bold"
            >
                {isSubmitting ? "Loading..." : "Atualizar Senha"}
            </button> 

            {error && <p className="text-red-500 text-sm m-1">{error}</p>}
        </form>
    )
}