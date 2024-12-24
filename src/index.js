import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import App from './App'
import {
  AuthProvider,
  ModalSupportProvider,
  SidebarProvider,
  SocketProvider
} from './hook/useContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <PrimeReactProvider>
    <AuthProvider>
      <ModalSupportProvider>
        <SocketProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </SocketProvider>
      </ModalSupportProvider>
    </AuthProvider>
  </PrimeReactProvider>
)
