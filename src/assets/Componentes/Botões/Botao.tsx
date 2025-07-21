import type { ReactNode } from "react"
import { MdHelp } from "react-icons/md"

function Botao({text , icon , onOpen = () => (console.trace("este comando foi executado"))} : { text : string , icon : ReactNode , onOpen? : () => void}) {
    return <button className="w-fit bg-purple-6 border-none font-bold flex text-lg items-center gap-3 px-6 py-3 text-white rounded-md hover:bg-purple-8 transition" onClick={onOpen}>
        { text ?? "sem nada"}
        { icon ?? <MdHelp/>}
    </button>
}

export default Botao