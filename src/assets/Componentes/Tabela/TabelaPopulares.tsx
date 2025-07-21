import type { Populares } from "../../../api-utils/API.consumer"
function Tabela({ data, colunas, titles }: { data: Populares[], colunas: string[], titles: string }) {
    const haveGain = (lucro: number) => {
        if (lucro < 0)
            return <span className="text-red-5 flex gap-x-2">{lucro.toString().concat("R$")}</span>
        else if (lucro > 0)
            return <span className="text-green-5 flex gap-x-2">{lucro.toString().concat("R$")}</span>
        else 
            return <span>0</span>
    }
    const render = (item: Populares) => {
        return <div className="grid cols-5 p-2 bg-slate-8 gap-4 rounded-md">
            <span className="truncate" title={item.nome}>{item.nome}</span>
            <span>{(item.arrecadacao ?? 0).toString().concat("R$")}</span>
            <span>{(item.investido ?? 0).toString().concat("R$")}</span>
            <span>{haveGain(item.lucro)}</span>
            <span>{item.inscritos}</span>
        </div>
    }
    return (
        <section className="h-5/6 w-full ">
            <header className="w-full grid rows-2 gap-y-4">
                <h1>{titles}</h1>
                <div className="grid cols-5">
                    {
                        colunas.map(e => <span>{e}</span>)
                    }
                </div>
            </header>
            <main className="grid grid-cols-1 gap-y-2 overflow-y-auto h-full scroll-min p-2">
                {
                    data.map(render)
                }
            </main>
        </section>
    )
}

export default Tabela