import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Routes.jsx'
import AuthProvider from './components/Firebase/AuthProvider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer position='top-center'></ToastContainer>
    </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
