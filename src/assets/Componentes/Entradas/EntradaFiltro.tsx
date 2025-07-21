import type { UseFormRegisterReturn } from "react-hook-form"
import type { HTMLInputTypeAttribute } from "react"
import { BiSearch } from "react-icons/bi"

function EntradaFiltro(props: { label?: string, placeholder?: string, type?: HTMLInputTypeAttribute, saveField : UseFormRegisterReturn}) {
    return <div className="flex  items-center gap-1">
        <input type={props.type ?? "text"} {...props.saveField} min={0} placeholder={props.placeholder} className="h-full px-4 py-2 mt-2 rounded-l-xl text-white bg-slate-8 border-1 border-purple-3 outline-none" />
        <div className="h-full flex items-center justify-center mt-2 px-4 py-2 rounded-r-xl text-white bg-purple"><BiSearch/></div>
    </div>
}
export default EntradaFiltro