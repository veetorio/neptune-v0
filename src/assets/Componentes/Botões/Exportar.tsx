import { FaFileExcel } from "react-icons/fa";
import { filesExport } from "../../../api-utils/API.consumer";

const gerarArquivo = async (evento: Response) => {
    const url = URL.createObjectURL(await evento.blob())
    const link = document.createElement("a")
    const header = evento.headers
    const name = header.get("Content-Disposition")?.match(/filename="?([^"]+)"?/) ?? "Relatorio.xlsx"
    link.href = url
    link.download = name[0] as string
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
}
function Exportar(props: { id?: number, type?: string }) {
    return <button className="text-lg px-4 py-2 transition bg-green-5 rounded-md border-none hover:bg-green-6 text-white" onClick={async () => {
        console.log(props)
        switch (props.type) {
            case "projetos":
                break
            case "eventos": {
                const resp = (await filesExport(props.type,props.id))
                gerarArquivo(resp)
            }
                break
            default: {
                const resp = (await filesExport())
                gerarArquivo(resp)
            }
                break
        }
    }}>
        exportar <FaFileExcel />
    </button>
}

export default Exportar