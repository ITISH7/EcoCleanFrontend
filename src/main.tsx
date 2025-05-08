import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginPageContextProvider } from './Context/LoginContext.tsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'
import {Provider} from 'react-redux'
import { store } from './store/store.ts'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
      <LoginPageContextProvider>
      <Toaster richColors position="top-center"/>
       <RouterProvider router ={router}/>
      </LoginPageContextProvider>
      </Provider>
    </QueryClientProvider>
    
  </StrictMode>,
)
