import Image from "next/image";
import appLogo from "../public/images/appLogo.png";
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-[#292929] h-screen w-screen flex flex-col justify-center items-center gap-4">
        <Image src={appLogo} alt="App Logo" className="w-96" />
        <h2 className="text-white text-5xl font-bold text-center">A maneira mais <br/>simples de reportar <br/> um crime!</h2>
        <div className="flex flex-col justify-center items-center w-full">
          <Link href="/login" className="bg-[#3BC9DB] text-white text-2xl font-bold w-1/3 h-12 flex justify-center items-center rounded-md">Login</Link>
          <Link href="/sign-in" className=" text-[#3BC9DB] text-sm  w-fit h-12 flex justify-center items-center rounded-md underline">Criar sua conta</Link>
        </div>
    </div>
  );
}