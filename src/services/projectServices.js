import api from './api'

export const createProject = async (data) => {
  try {
    const response = await api.post('/project', data)
    return response
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export const getProject = async () => {
  try {
    const response = await api.get('/project')
    return response.data
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export const getUserInProject = async (projectId) => {
  try {
    const response = await api.get(`/project/${projectId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching users in project with ID ${projectId}:`, error)
    throw error
  }
}

export const updateProject = async (projectId, data) => {
  try {
    const response = await api.put(`/project/${projectId}`, data)
    return response
  } catch (error) {
    console.error(`Error updating project with ID ${projectId}:`, error)
    throw error
  }
}

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/project/${projectId}`)
    return response
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error)
    throw error
  }
}

export const getListProjectService = async () => {
  try {
    const response = await api.get('/project/list')
    return response.data
  } catch (error) {
    console.error('Error fetching project list:', error)
    throw error
  }
}

export const getListProjectByQuery = async (data) => {
  try {
    const response = await api.get(`/project?q=${data}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching projects with query "${data}":`, error)
    throw error
  }
}

export const listProjectAndDevice = async () => {
  try {
    const response = await api.get(`/project/dashboard/list`)
    return response.data
  } catch (error) {
    console.error('Error fetching project list:', error)
    throw error
  }
}
