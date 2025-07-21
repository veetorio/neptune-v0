import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'virtual:uno.css'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Eventos from './pages/Eventos.tsx'
import Projetos from './pages/Projetos.tsx'
import Usuarios from './pages/Usuarios.tsx'
const clientReact = new QueryClient()
const routes = createBrowserRouter([
  {
    path : "/",
    element : <App/>
  },
  {
    path : "/eventos",
    element : <Eventos/>
  },
  {
    path : "/exportar",
    element : <Usuarios/>
  },
  {
    path : "/projetos",
    element : <Projetos/>
  },
  {
    path : "/usuarios",
    element : <Usuarios/>
  },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={clientReact}>
      <RouterProvider router={routes}/>
    </QueryClientProvider>
  </StrictMode>
)
