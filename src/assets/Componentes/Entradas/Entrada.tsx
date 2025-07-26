import type { UseFormRegisterReturn } from "react-hook-form"
import type { HTMLInputTypeAttribute } from "react"

function Entrada(props: { label?: string, placeholder?: string, type?: HTMLInputTypeAttribute, saveField : UseFormRegisterReturn}) {
    return <div className="flex flex-col items-start">
        {
            props.label ?? <label htmlFor="" className="text-sm">{props.label}</label>
        }
        <input type={props.type ?? "text"} {...props.saveField} min={0} placeholder={props.placeholder} className="px-4 py-2 mt-2 rounded-md text-white bg-slate-8 border-1 border-purple-3 outline-none" />
    </div>
}
export default Entrada