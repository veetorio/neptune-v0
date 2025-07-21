import { FaFileExcel } from "react-icons/fa";

function Exportar() {
    return <button className="text-lg px-4 py-2 transition bg-green-5 rounded-md border-none hover:bg-green-6 text-white">
        exportar <FaFileExcel/>
    </button>
}

export default Exportar