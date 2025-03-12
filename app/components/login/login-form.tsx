"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { login } from "@/app/lib/auth";
import Cookies from "js-cookie";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }} = useForm<LoginFormData>({resolver: zodResolver(loginSchema)});
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const { token } = await login(data);
            Cookies.set("token", token, { expires: 7, secure: true });
            router.push("/home");
        } catch(error) {
            setError("Invalid email or password!")
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-72 justify-between gap-2">
            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="email" className="hidden">
                    Email
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <EnvelopeIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="E-mail"
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
                <label htmlFor="password" className="hidden">
                    Password
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <LockClosedIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="repeatPassword"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Repeat Password"
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
                {isSubmitting ? "Loading..." : "Login"}
            </button>

            {error && <p className="text-red-500 text-sm m-1">{error}</p>}
        </form>
    )
}