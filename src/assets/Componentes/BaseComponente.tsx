import type { PropsWithChildren } from "react";
import BarraLateral from "./BarraLateral";

function Base(props: PropsWithChildren) {
    return (
        <main className="flex text-white gap-2 w-screen h-screen p-6 bg-slate-950 font-sans">
            <BarraLateral />
            <main className="flex h-full flex-col flex-1 p-6 gap-4">
                {props.children}
            </main>
        </main>
    )
}
export default Base