import { MdEdit, MdSend, MdUpload } from "react-icons/md";
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
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { filesUpload, pessoaDelete, pessoaUpdate, usuariosAll } from "../api-utils/API.consumer";
import { toast, ToastContainer } from "react-toastify";
import Entrada from "../assets/Componentes/Entradas/Entrada";

function Usuarios() {
    const { register } = useForm()
    const [open, setOpen] = useState<boolean>(false)
    const [openUp, setOpenUp] = useState<boolean>(false)
    const [inscrito, setInscrito] = useState<Inscricao>()
    const { state } = useLocation()
    const { data } = useQuery({
        queryKey: ["usuarios"],
        queryFn: usuariosAll
    })
    const info: { id: number, type: "usuarios" | "eventos" | "projetos", escricoes: Inscricao[] } = state || { id: 0, type: undefined, escricoes: data }
    const mut = useMutation(
        {
            mutationKey: ["upsuario"],
            mutationFn: (params: Inscricao) => (pessoaUpdate({ ...params, atividade: !params.atividade }, params.id))
        }
    )

    const setActive = (e: Inscricao): Inscricao => {
        toast.promise(
            mut.mutateAsync(e),
            {
                error: "não foi possivel atualizar",
                pending: "atualizando ...",
                success: !e.atividade ? "usuario está ativo" : "usuario está inativo"
            }
        )
        return ({ ...e, atividade: !e.atividade })
    }

    const exportElement = (dropEvent: React.DragEvent) => {
        const file = dropEvent.dataTransfer?.files[0]
        const formdata = new FormData()
        if (file?.type.split('.').includes('sheet')) {
            formdata.append("file", file)
            toast.promise(
                filesUpload("projeto", info.id, formdata),
                {
                    success: "foi criado as instâncias",
                    pending: "criando instâncias ...",
                    error: "não foi possivel instâncias"
                }
            )
        } else {
            toast.error("não foi possivel realizar upload, porque o formato de arquivo não é suportado")
        }
    }
    const Row = (props: Inscricao) => <span className="grid cols-5">
        <span>{props.nome}</span>
        <span>{props.local}</span>
        <span>{props.idade}</span>
        <span>{props.atividade}</span>
        <span className="flex gap-2">
            <MdEdit className="bg-orange-6 hover:bg-orange-7 text-size-3xl rounded-md p-1" onClick={() => {
                setInscrito(props)
                setOpenUp(true)
            }} />
            <IoMdTrash className="bg-red-6 text-size-3xl p-1 hover:bg-red-7 rounded-md" onClick={async () => {
                const confitmDelete = await Swal.fire({
                    title: `este evento irá ser deletado ${props.nome}`,
                    text: `este usuario será apagado em definitivo`,
                    confirmButtonText: "tem certeza em deletar esse elemento",
                    background: "#14101e",
                    color: "#fff",
                    confirmButtonColor: "#ff0000"
                })
                if (confitmDelete.isConfirmed) {
                    toast.promise(
                        pessoaDelete(props.id),
                        {
                            pending: "apagando registro",
                            error: "registro não foi apagado",
                            success: "apagado com sucesso"

                        }
                    )

                }
            }} />
            {
                props.atividade ? <FaPowerOff className="bg-purple-5 rounded-md text-size-3xl p-1" onClick={() => (setActive(props))} /> : <FaPowerOff className="bg-purple-9 rounded-md text-3xl p-1" onClick={() => (setActive(props))} />
            }

        </span>
    </span>
    const UpUser = (data : { inscrito? : Inscricao}) => {
        const { register , handleSubmit } = useForm<Inscricao>({
            defaultValues : data.inscrito
        })
        const sendUp = (data : Inscricao) => {
            toast.promise(
                pessoaUpdate(data,data.id),
                {
                    pending : "atualizando ...",
                    success : "atualizado com sucesso",
                    error : "não foi possivel atualizar"
                }
            )
        }
        return <BaseFormulario nameBase="Atualizando usuario" onClose={() => { setOpenUp(false) }} show={openUp}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(sendUp,() => {})}>
                <Entrada saveField={register("nome")} label="nome" />
                <Entrada saveField={register("nascimento")} type="date" label="data de nascimento" />
                <Entrada saveField={register("local")} label="bairro " />
                <Botao text="atualizar" icon={<MdSend />} />
            </form>
        </BaseFormulario>
    }
    return <Base>
        <ToastContainer />
        <UpUser inscrito={inscrito}/>
        <BaseFormulario nameBase="Enviar arquivo" onClose={() => (setOpen(false))} show={open}>
            <label htmlFor="excel" className="" onDragOver={(e) => { e.preventDefault() }} onDrop={exportElement}>
                <div className="p-20 border-dashed border-purple-5 rounded-2xl flex flex-col justify-center items-center">
                    <ImFileExcel className="text-2xl" />
                    <p className="font-bold text-sm">
                        cadastre novos usuarios com apenas um excel
                    </p>
                </div>
            </label>
            <input type="file" id="excel" className="hidden" />
        </BaseFormulario>
        <main className="h-full w-full">
            <header className="flex justify-between ">
                <EntradaFiltro saveField={register("search")} placeholder="pesquise por usuario" type="search" />
                <div className="flex gap-2">
                    {

                        info.type ? <Botao text="subir arquivo" icon={<MdUpload />} onOpen={() => (setOpen(true))} /> : ''
                    }
                    <Exportar id={info.id} type={info.type} />
                </div>
            </header>
            <main className="w-full h-[90%] mt-8 overflow-hidden">
                <header className="">
                    <h1>
                        {
                            state ? state.nome : "Usuarios"
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
                        info.escricoes?.map((e: Inscricao) => <Row {...e} />)
                    }
                </section>

            </main>
        </main>
    </Base >
}
export default Usuarios