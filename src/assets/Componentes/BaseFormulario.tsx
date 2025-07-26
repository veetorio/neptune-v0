import type { PropsWithChildren } from "react"
import { CgClose } from "react-icons/cg"

function BaseFormulario(props: PropsWithChildren<{ show: boolean , nameBase : string , onClose : () => void }>) {
    return props.show ? <div className="pos-absolute pos-left-1/3 pos-top-1/4 bg-slate-9 p-4 rounded-2xl">
        <header className="w-full flex gap-12 items-center justify-between">
            <h1>
                {props.nameBase}
            </h1>
            <CgClose onClick={props.onClose}/>
        </header>
        <main className="mt-6">
            {props.children}
        </main>
    </div> : <></>
}

export default BaseFormulario