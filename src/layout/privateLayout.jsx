import { useEffect, useRef, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isAuthentication } from '~/hook/useAuth'
import Header from '~/components/header'
import Footer from '~/components/footer'
import Sidebar from '~/components/sidebar'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { sidebarContext } from '~/hook/useContext'

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const contentRef = useRef(null)
  const context = useContext(sidebarContext)
  useEffect(() => {
    if (!isAuthentication()) {
      message.error(
        'There was an error with the authentication process. You must log in again to continue.'
      )
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div className="flex flex-col h-screen pt-[50px]">
      <Header />
      <div className="flex h-full">
        {context.isSidebarOpen && <Sidebar className="w-[500px] bg-gray-800 overflow-y-auto" />}
        <div ref={contentRef} className="w-full h-full overflow-y-auto shadow-xl">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}
