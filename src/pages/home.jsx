import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/alert')
  }, [])
  return <div className="h-screen bg-[#F0F2F5]"></div>
}

export default Home
