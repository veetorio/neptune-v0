import { BiEdit, BiInfoSquare, BiSolidDashboard, BiTrash } from "react-icons/bi"
import type { EventoI } from "../../api-utils/CONFIG"
type OperationsProps = {
    onEdit : () => void,
    onDelete : () => void,
    onInfo : () => void,
    onDash : () => void,
}
const Operations = ({ nome , dateGo , actions}: { nome: string, dateGo : string , actions : OperationsProps }) => <div className="px-4 py-1 h-full">
    <div className="flex items-baseline gap-3">
        <span className="text-2xl">{nome}</span>
        <span className="text-sm">{dateGo.replace(/-/g,"/")}</span>
    </div>
    <div className="w-full mt-1 flex justify-end">
        <div>
            <BiEdit onClick={actions.onEdit}  title="editar" className="hover:text-orange-5" />
            <BiTrash onClick={actions.onDelete} title="excluir" className="hover:text-red-5" />
            <BiInfoSquare onClick={actions.onInfo} title="usuarios" className="hover:text-gray-5" />
            <BiSolidDashboard onClick={actions.onDash} title="dashboard" className="hover-text-blue-5" />
        </div>
    </div>
</div>
type PropsCard = EventoI & OperationsProps
function Card(props : PropsCard) {
    const propsActs : OperationsProps = { 
        onDash : props.onDash,
        onDelete : props.onDelete,
        onEdit : props.onEdit,
        onInfo : props.onInfo,
    }
    return <div className="w-full h-52 bg-slate-9 rounded-2xl">
        <div className="h-4/6 w-full bg-blue rounded-t-2xl"></div>
        <Operations {...props as EventoI} actions={propsActs}/>
    </div>
}

export default Card