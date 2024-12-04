import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ModalSupportProvider, SidebarProvider, SocketProvider } from './hook/useContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ModalSupportProvider>
    <SocketProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </SocketProvider>
  </ModalSupportProvider>
)
