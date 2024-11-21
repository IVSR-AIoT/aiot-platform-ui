import apiInstances from './api'

export const deviceListService = async () => {
  try {
    const response = await apiInstances.get('/device')
    return response
  } catch (error) {
    console.error('Error fetching device list:', error)
    throw error
  }
}

export const listDeviceByProjectIdService = async (id) => {
  try {
    const response = await apiInstances.get(`/device?projectId=${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching devices for project ID ${id}:`, error)
    throw error
  }
}

export const updateDeviceService = async (id, value) => {
  try {
    const response = await apiInstances.put(`/device/${id}`, value)
    return response
  } catch (error) {
    console.error(`Error updating device with ID ${id}:`, error)
    throw error
  }
}
