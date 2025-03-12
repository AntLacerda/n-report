'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserCircleIcon, FingerPrintIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from "clsx";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Password must be at least 8 characters"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid CPF format (XXX.XXX.XXX-XX)"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isNotMatching, setIsNotMatching] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm<SignInFormData>({resolver: zodResolver(signInSchema)});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const checkPasswordMatch = (password: string, repeatPassword: string) => {
        if (password !== repeatPassword) {
            setIsNotMatching(true);
            return false;
        }

        return true;
    }
    
    const onSubmit = async (data: SignInFormData) => {
        if (!checkPasswordMatch(data.password, data.repeatPassword)) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    cpf: data.cpf
                }),
            })

            if(response.ok) {
                console.log("User signed up successfully");
                router.push("/login");
            } else {
                console.error("Sign-in Failed");
            }
        } catch (error) {
            console.error("An error ocurred: ", error);
        }
        setIsSubmitting(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-72 justify-between gap-2">
            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="username" className="hidden">
                    Username
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <UserCircleIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("name")}
                        type="text"
                        id="username"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Username"
                    />
                </div>

                {errors.name && <p className="text-red-500 text-sm m-1">{errors.name.message}</p>}
            </div>

            <div className="relative flex flex-col justify-center items-center w-full">
                <label htmlFor="cpf" className="hidden">
                    CPF
                </label>

                <div className=" relative flex flex-row justify-center items-center w-full">
                    <FingerPrintIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("cpf")}
                        type="text"
                        id="cpf"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="CPF"
                    />
                </div>

                {
                    errors.cpf &&
                        <p className="text-red-500 text-sm m-1">
                            {errors.cpf.message}
                        </p>
                }
            </div>

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
                        type="password"
                        id="password"
                        className="peer w-full h-12 bg-[#464646] rounded-md border-b-4 border-[#3BC9DB] pl-12 text-white placeholder:text-sm"
                        placeholder="Password"
                    />
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
                    Repeat Password
                </label>

                <div className="relative flex flex-row justify-center items-center w-full">
                    <LockClosedIcon className="size-6 text-[#3BC9DB] absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out" />
                    <input
                        {...register("repeatPassword")}
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

                {
                    isNotMatching &&
                        <p className="text-red-500 text-sm m-1">
                            Passwords do not match
                        </p>
                }
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3BC9DB] text-white font-bold py-2 rounded-md mt-4 disabled:opacity-50"
            >
                {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
}