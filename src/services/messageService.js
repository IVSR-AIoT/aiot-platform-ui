import apiInstances from './api'

export const getMessageService = async (messageType, deviceId, start, end, query, pagnition) => {
  let url = `/${messageType}?device_id=${deviceId}`
  if (start) {
    url += `&start=${start}`
  }
  if (end) {
    url += `&end=${end}`
  }
  if (query) {
    url += `&q=${query}`
  }
  if (pagnition) {
    url += `&page=${pagnition}`
  }
  const response = await apiInstances.get(url)
  return response
}
