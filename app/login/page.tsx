import Image from "next/image";
import login from "../../public/images/login.png";
import logo from "../../public/images/logo.png";
import LoginForm from "../components/login/login-form";
import Link from "next/link";

export const metadata= {
    title: 'Login',
}

export default function Login() {
    return (
        <div className="bg-[#292929] h-screen w-screen flex flex-row justify-between">
            <Image src={login} alt="Login" className="h-screen w-2/3"/>
            <div className="h-screen w-1/3 flex flex-col justify-center items-center gap-5">
                <Image src={logo} alt="Logo" className="w-12"/>
                <h2 className="text-white text-5xl font-bold">Hey, <br/> Bem Vindo<br/> Novamente!</h2>
                <LoginForm/>
                <div>
                    <p className="text-white gap-0 mt-2">Não possui uma conta? <Link href={"/sign-in"} className="text-[#3BC9DB] underline">Criar conta</Link></p>
                </div>
            </div>
        </div>
    );
}