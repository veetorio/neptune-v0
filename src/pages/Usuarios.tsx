import { MdEdit, MdUpload } from "react-icons/md";
import Base from "../assets/Componentes/BaseComponente";
import Botao from "../assets/Componentes/Botões/Botao";
import Exportar from "../assets/Componentes/Botões/Exportar";
import { useForm } from "react-hook-form";
import EntradaFiltro from "../assets/Componentes/Entradas/EntradaFiltro";
import BaseFormulario from "../assets/Componentes/BaseFormulario";
import { ImFileExcel } from "react-icons/im";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import type { Inscricao } from "../api-utils/CONFIG";
import { useQuery } from "@tanstack/react-query";
import { usuariosAll } from "../api-utils/API.consumer";

function Usuarios() {
    const { register } = useForm()
    const [open, setOpen] = useState<boolean>(false)

    const { state } = useLocation()
    
    const { data } = useQuery({
        queryKey : ["usuarios"],
        queryFn : usuariosAll
    })
    const Row = ({ nome, local, idade, atividade }: { nome: string, local: string, idade: number, atividade: boolean }) => <span className="grid cols-5">
        <span>{nome}</span>
        <span>{local}</span>
        <span>{idade}</span>
        <span>{atividade}</span>
        <span className="flex gap-2">
            <MdEdit className="bg-orange-6 text-size-3xl rounded-md p-1" />
            <IoMdTrash className="bg-red-6 text-size-3xl p-1 rounded-md" />
            {
                atividade ? <FaPowerOff className="bg-purple-5 rounded-md text-size-3xl p-1" /> : <FaPowerOff className="bg-purple-7 rounded-md text-3xl p-1" />
            }

        </span>
    </span>
    return <Base>
        <BaseFormulario nameBase="Enviar arquivo" onClose={() => (setOpen(false))} show={open}>
            <label htmlFor="excel" className="">
                <div className="p-20 border-dashed border-purple-5 rounded-2xl flex flex-col justify-center items-center">
                    <ImFileExcel className="text-2xl" />
                    <p className="font-bold text-sm">
                        cadastre novos usuarios com apenas um excel
                    </p>
                </div>
            </label>
            <input type="file" id="excel" className="hidden" onDragOver={() => { }} onDrop={() => { }} />
        </BaseFormulario>
        <main className="h-full w-full">
            <header className="flex justify-between ">
                <EntradaFiltro saveField={register("search")} placeholder="pesquise por usuario" type="search" />
                <div className="flex gap-2">
                    <Botao text="subir arquivo" icon={<MdUpload />} onOpen={() => (setOpen(true))} />
                    <Exportar />
                </div>
            </header>
            <main className="w-full h-[90%] mt-8 overflow-hidden">
                <header className="">
                    <h1>
                        {
                            state ? state.nome :  "Usuarios"
                        }
                    </h1>
                    <div className="grid cols-5 py-4">
                        <h3>nome</h3>
                        <h3>local</h3>
                        <h3>idade</h3>
                        <h3>atividade</h3>
                        <h3>ações</h3>
                    </div>
                </header>
                <section className="h-5/6 grid grid-cols-1 gap-y-1 overflow-y-auto scroll-min py-2">
                    {
                        state ? state.escricoes?.map((e : Inscricao)=> <Row {...e}/>) : data?.map(e => <Row {...e}/>)
                    }
                </section>

            </main>
        </main>
    </Base>
}
export default Usuarios