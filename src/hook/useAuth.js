import { jwtDecode } from 'jwt-decode'

export const isAuthentication = () => {
  return localStorage.getItem('accessToken') !== null
}

export const getUser = () => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return null
  }

  const payload = jwtDecode(token)
    return payload
  } catch (error) {
    console.error(error)
  }
}

export const isAdmin = () => {
  const user = getUser()
  return user && user.roleId !== 2
}

export const isUser = () => {
  const user = getUser()
  return user && user.roleId === 2
}
