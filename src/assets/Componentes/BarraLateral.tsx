import type { ReactNode } from "react"
import { BiFolder } from "react-icons/bi"
import { MdDashboard, MdEmojiEvents } from "react-icons/md"
import { PiUserSquare } from "react-icons/pi"
import { useNavigate } from "react-router-dom"

function BarraLateral() {
    const nav = useNavigate()
    const Link = ({ link , texto , icon} : { link : string , texto : string , icon : ReactNode}) => <div className="w-full h-4 flex justify-between items-center text-lg font-bold hover:text-violet-6 transition" onClick={() => (nav(link))}>{texto}{icon}</div>
    const links = [
        {
            link : "/",
            texto : "dashboard",
            icon : <MdDashboard/> as ReactNode
        },
        {
            link : "/projetos",
            texto : "projeto",
            icon : <BiFolder/>
        },
        {
            link : "/eventos",
            texto : "eventos",
            icon : <MdEmojiEvents/>
        },
        {
            link : "/usuarios",
            texto : "usuarios",
            icon : <PiUserSquare/>
        },
    ]
    return <aside className="h-full w-1/6 p-4 bg-slate-9 shadow-2xl rounded-2xl place-items-start">
        <header className="text-2xl"><img src="../../../public/Frame 4997 (1).png" alt="" /></header>
        <ul className="w-full mt-4 flex p-2 flex-col gap-4">
            {
                links.map(e => <Link {...e}/>)
            }
        </ul>
    </aside>
}
export default BarraLateral