import Image from "next/image";
import signin from "../../public/images/signIn.png";
import logo from "../../public/images/logo.png";
import SignInForm from "../components/sign-in/signin-form";
import Link from "next/link";

export const metadata= {
    title: 'Sign In',
}

export default function SingIn() {
    return(
        <div className="bg-[#292929] h-screen w-screen flex flex-row justify-between">
            <div className="flex flex-col justify-center items-center w-1/3">
                <div className="flex  flex-col gap-5 justify-center items-center">
                    <Image src={logo} alt="Logo" className="w-12"/>
                    <h2 className="text-white text-6xl font-bold">Vamos <br/> Começar!</h2>
                    <SignInForm/>
                </div>
                <div>
                    <p className="text-white gap-0 mt-2">Já possui uma conta? <Link href={"/login"} className="text-[#3BC9DB] underline">Entrar</Link></p>
                </div>
            </div>
            <div className="">
                <Image src={signin} alt="Sign In" className="h-screen w-auto"/>
            </div>
        </div>
    )
}