import { URL_DEV, type EventoI, type EventoIOut, type EventoIOutUpdate, type Inscricao } from "./CONFIG"
export type Populares = {
    nome: string;
    arrecadacao: number;  // Valor decimal (pode usar float/double)
    investido: number;    // Valor inteiro ou decimal
    lucro: number;        // Pode ser negativo
    inscritos: number;
}
export type DashAllProps = {
    eventosPorMes: Record<string, number>,
    arrecadacaoTotal: number,
    investimentoTotal: number,
    populares: Populares[],
    lucroDeEventos: Record<string, number>
}
export const dashBoardAll = async () => {
    const response: DashAllProps = await fetch(URL_DEV.concat("/dashboard/evento")).then(response => response.json())

    return response
}
export const eventoAll = async () => {
    const response: EventoIOut = await fetch(URL_DEV.concat("/eventos")).then(response => response.json())

    return response
}
export const usuariosAll = async () => {
    const response: Inscricao = await fetch(URL_DEV.concat("/usuarios")).then(response => response.json())

    return response
}
export const projetosAll = async () => {
    const response: EventoIOut = await fetch(URL_DEV.concat("/projetos")).then(response => response.json())

    return response
}
export const eventoPost = async (data: EventoI) => {
    try {
        return  fetch(URL_DEV.concat("/eventos"), {
            headers: {
                "Content-Type": "application/json", 
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    } catch {
        throw new Error("erro no envio")
    }
}

export const eventoUpdate = async (data: EventoIOutUpdate,id : number) => {
    try {
        return  fetch(URL_DEV.concat("/eventos/").concat(`${id}`), {
            headers: {
                "Content-Type": "application/json", 
            },
            method: "PUT",
            body: JSON.stringify(data)
        })
    } catch {
        throw new Error("erro no envio")
    }
}
export const eventoDelete = async (id : number) => {
    try {
        return  fetch(URL_DEV.concat("/eventos/").concat(`${id}`), {
            headers: {
                "Content-Type": "application/json", 
            },
            method: "DELETE",
        })
    } catch {
        throw new Error("erro no envio")
    }
}