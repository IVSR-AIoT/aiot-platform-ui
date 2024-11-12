import { Input, Button, message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { forgotPassword } from '~/services/userService'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const data = { email: email }
    setLoading(true)
    try {
      await forgotPassword(data)
      message.success('Your submission has been completed successfully!')
    } catch (error) {
      message.error('There was an error submitting the email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#F4F6F9]">
      <div className="w-[350px] h-[280px] p-6 shadow-2xl rounded-xl">
        <h2 className="text-[30px] text-center font-bold ">AIOT platform</h2>
        <h1 className="text-[24px] text-center mb-8">Forgot your Password</h1>
        <div className="w-full">
          <Input
            className="pt-2"
            placeholder="Enter your email"
            value={email}
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <Button type="primary" className="w-full mt-5 mb-3" onClick={handleSubmit}>
            {!loading ? (
              'Submit'
            ) : (
              <Spin className="text-white" indicator={<LoadingOutlined spin />} />
            )}
          </Button>
          <Button
            type="text"
            className="w-full"
            onClick={() => {
              navigate('/')
            }}
          >
            Back home
          </Button>
        </div>
      </div>
    </div>
  )
}
