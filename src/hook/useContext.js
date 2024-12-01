import { useState, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { io } from 'socket.io-client'

const modalSupportContext = createContext()

const ModalSupportProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const value = { isModalOpen, showModal, handleCancel }
  return <modalSupportContext.Provider value={value}>{children}</modalSupportContext.Provider>
}

const SocketContext = createContext()
const SocketProvider = ({ children }) => {
  const socket = io(`${process.env.REACT_APP_BASE_URL}/socket`)
  useEffect(() => {
    const onConnect = () => console.log('Connected to socket')
    socket.on('connect', onConnect)
    return () => socket.off('connect')
  })
  const value = { socket }
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

const sidebarContext = createContext()

const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const value = { isSidebarOpen, setIsSidebarOpen }
  return <sidebarContext.Provider value={value}>{children}</sidebarContext.Provider>
}

ModalSupportProvider.propTypes = {
  children: PropTypes.node.isRequired
}
SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired
}
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired
}
export {
  modalSupportContext,
  ModalSupportProvider,
  SocketContext,
  SocketProvider,
  sidebarContext,
  SidebarProvider
}
