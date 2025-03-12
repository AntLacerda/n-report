import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


export default function News() {
    return (
        <>
            <div className="h-full bg-[url('/images/newsCard.png')] bg-cover bg-center">
                <Link href="/home">
                    <ArrowLeftIcon className="text-white w-16 pt-6 pl-9 cursor-pointer"/>
                </Link>
                <div className="pt-40 px-9 pb-6">
                    <h2 className="bg-[#3BC9DB] text-white w-20 text-center rounded-md p-1 mb-4">Notícia</h2>
                    <h3 className="text-white text-5xl font-bold mb-2">Funciona mesmo?</h3>
                    <p className="text-white text-lg">Descubra a importância de reportar um crime no N-Report!</p>
                </div>
            </div>
            <div className="p-9 text-white flex flex-col gap-4">
                <h3 className="text-2xl font-bold">A importância do registro de crimes em plataformas compartilhadas</h3>
                <p className="text-lg">Em um mundo cada vez mais conectado, a segurança pública é uma preocupação constante. Nesse contexto, o registro de crimes em uma plataforma compartilhada emerge como uma ferramenta crucial na luta contra a criminalidade.</p>
                <p className="text-lg">A importância desse registro reside na sua capacidade de fornecer dados precisos e em tempo real sobre incidentes, auxiliando as autoridades na prevenção e investigação de delitos.</p>
                <p className="text-lg">Uma das principais vantagens de uma plataforma compartilhada para registro de crimes é a centralização das informações.</p>
            </div>
        </>
    )
}