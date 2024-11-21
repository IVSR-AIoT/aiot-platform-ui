import api from './api'

export const getList = async () => {
  try {
    const response = await api.get('/support')
    return response.data
  } catch (error) {
    console.error('Error fetching the support list:', error)
    throw error
  }
}

export const CreateIssueService = async (data) => {
  try {
    const response = await api.post('/support', data)
    return response
  } catch (error) {
    console.error('Error creating a new issue:', error)
    throw error
  }
}

export const getListByQuery = async (data) => {
  try {
    const response = await api.get(`/support?q=${data}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching support list by query "${data}":`, error)
    throw error
  }
}

export const replyService = async (data, supportId) => {
  try {
    const response = await api.put(`/support/${supportId}`, data)
    return response
  } catch (error) {
    console.error(`Error replying to support ID ${supportId}:`, error)
    throw error
  }
}
