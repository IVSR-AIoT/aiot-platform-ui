import { Input, Segmented, Select, DatePicker, message } from 'antd'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { isUser } from '~/hook/useAuth'
import { getListProjectService } from '~/services/projectServices'
import { listDeviceByProjectIdService } from '~/services/deviceService'
import { getMessageService } from '~/services/messageService'

const messageType = ['object', 'sensor', 'notification']

export default function FilterMenu({ setData, setTotalPage, pagination }) {
  const { RangePicker } = DatePicker
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [selectMessageType, setSelectedMessageType] = useState(messageType[0])
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
  const [query, setQuery] = useState('')

  const getListProject = async () => {
    try {
      if (!isUser()) {
        const res = await getListProjectService()
        const data = res.map((item) => ({ label: item.name, value: item.id }))
        setProjectOptions(data)
      }
    } catch {
      message.error('Failed to load projects. Please try again.')
    }
  }

  const getListDeviceInProject = async (projectId) => {
    try {
      const res = await listDeviceByProjectIdService(projectId)
      const data = res.data.map((item) => ({ label: item.name, value: item.id }))
      setDeviceOptions(data)
    } catch {
      message.error('Failed to load devices for the selected project.')
    }
  }

  const getMessage = async () => {
    if (!selectedProject || !selectedDevice || !selectMessageType) {
      message.warning('Please select a project, device, and message type.')
      return
    }

    try {
      const res = await getMessageService(
        selectMessageType,
        selectedDevice,
        dateRange.startDate,
        dateRange.endDate,
        query,
        pagination
      )
      setTotalPage(res.data.total)
      setData(res.data.data)
    } catch (error) {
      console.error(error)
      message.error('Failed to retrieve messages. Please try again.')
    }
  }

  useEffect(() => {
    if (projectOptions.length > 0) {
      const firstProject = projectOptions[0].value
      setSelectedProject(firstProject)
      getListDeviceInProject(firstProject)
    }
  }, [projectOptions])

  useEffect(() => {
    if (deviceOptions.length > 0) {
      const firstDevice = deviceOptions[0].value
      setSelectedDevice(firstDevice)
    }
  }, [deviceOptions])

  useEffect(() => {
    getListProject()
  }, [])

  useEffect(() => {
    if (selectedDevice) {
      getMessage()
    } else {
      setData([])
    }
  }, [selectedProject, selectedDevice, selectMessageType, dateRange, query, pagination])

  return (
    <div className="grid grid-cols-5 gap-4 place-content-center place-items-center mb-[20px]">
      <Segmented options={messageType} onChange={(value) => setSelectedMessageType(value)} />
      <Select
        options={projectOptions}
        className="w-[200px]"
        placeholder="Select Project"
        onChange={(value) => {
          setSelectedProject(value)
          setSelectedDevice(null)
          getListDeviceInProject(value)
        }}
        value={selectedProject}
        allowClear
      />
      <Select
        options={deviceOptions}
        className="w-[200px]"
        placeholder="Select Device"
        allowClear
        onChange={(value) => setSelectedDevice(value)}
        value={selectedDevice}
      />
      <RangePicker
        style={{ width: 250 }}
        onChange={(_, value) => setDateRange({ startDate: value[0], endDate: value[1] })}
      />
      <Input
        placeholder="Query"
        className="w-[200px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

FilterMenu.propTypes = {
  setData: PropTypes.func.isRequired,
  setTotalPage: PropTypes.func.isRequired,
  pagination: PropTypes.number
}
