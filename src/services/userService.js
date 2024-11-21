import api from './api'

export const checkLogin = async (data) => {
  try {
    const response = await api.post('/auth/login', data)
    return response
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const CreateUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data)
    return response
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getListUser = async (roleId) => {
  try {
    const response = await api.get(`/user/role/${roleId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user list for role ID ${roleId}:`, error)
    throw error
  }
}

export const forgotPassword = async (data) => {
  try {
    const response = await api.post('/auth/forgot-password', data)
    return response
  } catch (error) {
    console.error('Error during forgot password request:', error)
    throw error
  }
}

export const updatePassword = async (data) => {
  try {
    const response = await api.put('/auth/update-password', data)
    return response
  } catch (error) {
    console.error('Error updating password:', error)
    throw error
  }
}
