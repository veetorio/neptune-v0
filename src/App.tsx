import { useQuery } from '@tanstack/react-query'
import Base from './assets/Componentes/BaseComponente'
import { dashBoardAll, type DashAllProps } from './api-utils/API.consumer'
import Barra from './assets/Componentes/graficos/Barra'
import Tabela from './assets/Componentes/Tabela/TabelaPopulares'

function App() {

  const { data } = useQuery<DashAllProps>(
    {
      queryKey: ["dashboard"],
      queryFn: dashBoardAll
    }
  )
  const colunas = ["nome","investido","arrecadação","lucro","inscritos"]
  const valoresDeBarra = Object.values(data?.eventosPorMes || {})
  const labelsDeBarra = Object.keys(data?.eventosPorMes || {})
  const valoresDeBarra2 = Object.values(data?.lucroDeEventos || {})
  const labelsDeBarra2 = Object.keys(data?.lucroDeEventos || {})
  return (
    <Base>
      <section className='w-full h-full gap-2 grid cols-6 rows-4'>
        <div className=" col-span-3 row-span-2 p-10 shadow bg-slate-9 rounded-2xl">
          <Barra data={valoresDeBarra} labels={labelsDeBarra} dominante='x' title='Eventos por mês' />
        </div>
        <div className="bg-purple-6 col-span-1 row-span-1 rounded-2 py-4 px-2 flex flex-col justify-between">
          <header className='font-bold '>
            Arrecadação anual
          </header>
          <div className='text-align-center mt-0 text-2xl'>
            {data?.arrecadacaoTotal.toString().concat("R$") ?? 0}
          </div>
        </div>
        <div className="bg-purple-6 col-span-1 row-span-1 rounded-2 py-4 px-2 flex flex-col justify-between">
          <header className='font-bold text-align-center '>
            Investimento anual
          </header>
          <div className='text-align-center mt-0 text-2xl'>
            {data?.investimentoTotal.toString().concat("R$") ?? 0}
          </div>
        </div>
        <div className="bg-purple-6 col-span-1 row-span-1 rounded-2 py-4 px-2 flex flex-col justify-between">
          <header className='font-bold text-align-center '>
            Lucro anual
          </header>
          <div className='text-align-center mt-0 text-2xl'>
            {((data?.arrecadacaoTotal ?? 0) - (data?.investimentoTotal ?? 0)).toString().concat("R$")}
          </div>
        </div>
        <div className="col-span-3 row-span-3 p-10 shadow bg-slate-9 rounded-2xl">
          <Tabela colunas={colunas} data={data?.populares ?? []} titles='populares'/>
        </div>
        <div className="col-span-3 row-span-3 p-10 shadow bg-slate-9 rounded-2xl">
          <Barra data={valoresDeBarra2} labels={labelsDeBarra2} dominante='y' title='lucro por mês' />
        </div>
      </section>
    </Base>
  )
}

export default App
