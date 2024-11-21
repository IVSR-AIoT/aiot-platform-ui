import apiInstances from './api'

export const getMessageService = async (
  messageType,
  deviceId,
  start,
  end,
  eventType,
  pagnition
) => {
  try {
    let url = `/${messageType}?device_id=${deviceId}`
    if (start) {
      url += `&start=${start}`
    }
    if (end) {
      url += `&end=${end}`
    }
    if (eventType) {
      url += `&type=${eventType}`
    }
    if (pagnition) {
      url += `&page=${pagnition}`
    }
    url += `&limit=10`
    const response = await apiInstances.get(url)
    return response.data
  } catch (error) {
    console.error(`Error fetching messages of type ${messageType}:`, error)
    throw error
  }
}

export const getDetailMessageService = async (messageType, body) => {
  try {
    const response = await apiInstances.get(`/${messageType}/detail`, body)
    return response
  } catch (error) {
    console.error(`Error fetching message details for type ${messageType}:`, error)
    throw error
  }
}
