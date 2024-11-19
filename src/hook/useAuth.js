export const isAuthentication = () => {
  return localStorage.getItem('accessToken') !== null
}

export const getUser = () => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return null
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))

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
