import { MdEvent, MdSend } from "react-icons/md"
import Base from "../assets/Componentes/BaseComponente"
import Botao from "../assets/Componentes/Botões/Botao"
import Swal from "sweetalert2"
import Card from "../assets/Componentes/Card"
import { useMutation, useQuery } from "@tanstack/react-query"
import { eventoAll, eventoDelete, eventoPost, eventoUpdate } from "../api-utils/API.consumer"
import BaseFormulario from "../assets/Componentes/BaseFormulario"
import Entrada from "../assets/Componentes/Entradas/Entrada"
import {  useState } from "react"
import { useForm } from "react-hook-form"
import type { EventoI, EventoIOut, EventoIOutUpdate } from "../api-utils/CONFIG"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"


function Eventos() {
    const [show, setShow] = useState<boolean>(false)
    const [showUp, setShowUp] = useState<boolean>(false)
    const [body, setBody] = useState<EventoIOutUpdate>()
    const nav = useNavigate()

    const { register, handleSubmit } = useForm<EventoI>()
    const { data } = useQuery<EventoIOut | EventoI | EventoIOutUpdate>({
        queryKey: ["eventos"],
        queryFn: eventoAll,
    })
  
    const mutatePost = useMutation({
        mutationFn: (data: EventoI) => eventoPost(data)
    })

    const sendData = async (data?: EventoI) => {
        // envio de post
        toast.promise(
            mutatePost.mutateAsync(data as EventoI),
            {
                success: "Evento foi enviado",
                error: "Evento não foi catalogado",
                pending: "evento sendo criado"
            }, {
            style: {
                background: "bg-slate-9"
            }
        }
        )
    }

    const UpdateModal = (props : { data : EventoIOutUpdate }) => {
        const { register, handleSubmit } = useForm<EventoIOutUpdate>({
            defaultValues: { ...props.data }
        })

        // envio atualizar
        const sendData = (data : EventoIOutUpdate) => {
            console.log(data)
            toast.promise(
                eventoUpdate(data,data.idEvento),
                {
                    success: "informações atualizadas",
                    error: "não foi possivel atualizar",
                    pending: "atualizando"
                }
            )

        }

        return <BaseFormulario show={showUp} nameBase="Atualizar evento" onClose={() => (setShowUp(false))}>
            <form action="" onSubmit={handleSubmit(sendData, () => { toast.error("não foi possivel enviar dados") })} className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <Entrada saveField={register("nome")} type="text" placeholder="informe o nome do evento" label="nome" />
                        <div className="flex mt-2 gap-2">
                            <Entrada saveField={register("timeGo")} label="inicio" type="time" />
                            <Entrada saveField={register("timeEnd")} label="termino" type="time" />
                        </div>
                        <div className="flex items-center gap-2 text-sm ">
                            <label htmlFor="">atividade</label>
                            <Entrada saveField={register("atividade")} type="checkbox" />
                        </div>
                    </div>
                    <div className="h-full flex flex-col justify-between gap-1">
                        <Entrada saveField={register("investido")} type="number" placeholder="" label="investimento" />
                        <Entrada saveField={register("arrecadacao")} type="number" placeholder="" label="arrecadação" />
                        <div className="flex gap-2">
                            <Entrada saveField={register("dateGo")} label="começo" type="date" />
                            <Entrada saveField={register("dateEnd")} label="encerramento" type="date" />
                        </div>
                    </div>
                </div>
                <Botao icon={<MdSend />} text="enviar" />
            </form>
        </BaseFormulario>
    }



    return <Base>
        <ToastContainer />
        <UpdateModal data={body as EventoIOutUpdate}/>
        <BaseFormulario show={show} nameBase="Evento" onClose={() => (setShow(false))}>
            <form action="" onSubmit={handleSubmit(sendData, () => { toast.error("não foi possivel enviar dados") })} className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <Entrada saveField={register("nome")} type="text" placeholder="informe o nome do evento" label="nome" />
                        <div className="flex mt-2 gap-2">
                            <Entrada saveField={register("timeGo")} label="inicio" type="time" />
                            <Entrada saveField={register("timeEnd")} label="termino" type="time" />
                        </div>
                    </div>
                    <div className="h-full flex flex-col justify-between gap-1">
                        <Entrada saveField={register("investido")} type="number" placeholder="" label="investimento" />
                        <div className="flex gap-2">
                            <Entrada saveField={register("dateGo")} label="começo" type="date" />
                            <Entrada saveField={register("dateEnd")} label="encerramento" type="date" />
                        </div>
                    </div>
                </div>
                <Botao icon={<MdSend />} text="enviar" />
            </form>
        </BaseFormulario>


        <header className="mt-2 w-full flex justify-end">
            <Botao text="criar evento" icon={<MdEvent />} onOpen={() => (setShow(true))} />
        </header>
        <main className="overflow-y-auto mt-2  px-4 grid grid-cols-3 gap-2 scroll-min">
            {
                data?.map((e: EventoIOutUpdate) => <Card {...e} onEdit={() => {
                    setBody({ ...e })
                    setShowUp(true)
                }} onDash={() => { }} onDelete={async () => {
                    const result = await Swal.fire(
                        {
                            width: 250,
                            color: "#fff",
                            icon: "warning",
                            iconColor: "#ef4444",
                            confirmButtonColor: "#ef4444",
                            background: "#0f172a",
                            confirmButtonText: "deseja apagar este evento",
                        }
                    )
                    if(result.isConfirmed) {
                        toast.promise(
                            eventoDelete(e.idEvento),
                            {
                                success : "evento foi apagado",
                                error : "evento não foi apagado",
                                pending : "apagando ..."
                            }
                        )
                    }
                }} onInfo={() => {
                    const { escricoes , nome , idEvento} = e as EventoIOut
                    nav("/usuarios",{
                        state : {
                            escricoes : escricoes,
                            nome : nome,
                            id : idEvento,
                            type : "eventos"
                        }
                    })
                 }} />)
            }
        </main>
    </Base>
}

export default Eventos 