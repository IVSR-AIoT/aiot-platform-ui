import { Segmented, Select, DatePicker, message } from 'antd'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { listProjectAndDevice } from '~/services/projectServices'
import { getMessageService } from '~/services/messageService'
import { messageConfigs } from '~/configs/alert'
import { isUser } from '~/hook/useAuth'
import { type } from '~/configs/alert'
export default function FilterMenu({
  setData,
  setTotalPage,
  pagination,
  setMessageType,
  messageType,
  setLoading
}) {
  const { RangePicker } = DatePicker
  const [projectAndDevice, setProjectAndDevice] = useState([])
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [eventType, setEventType] = useState()
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })

  const getListProjectAndDevice = async () => {
    setLoading(true)
    try {
      const res = await listProjectAndDevice()
      setProjectAndDevice(res)
      const projectOptions = res.map((item) => ({ label: item.name, value: item.id }))
      setProjectOptions(projectOptions)
    } catch {
      message.error('Error fetching projects and devices.')
    } finally {
      setLoading(false)
    }
  }

  const handleAssignDevice = (projectId) => {
    const project = projectAndDevice.find((item) => item.id === projectId)
    const device = project?.device.map((item) => ({ label: item.name, value: item.id }))
    setDeviceOptions(device)
  }

  const getMessage = async () => {
    if (!selectedProject || !selectedDevice || !messageType) {
      message.warning('Please select a project, device, and message type.')
      return
    }

    setLoading(true)
    try {
      const res = await getMessageService(
        messageType,
        selectedDevice,
        dateRange.startDate,
        dateRange.endDate,
        eventType,
        pagination
      )
      setTotalPage(res.total)
      setData(res.data)
    } catch (error) {
      console.error(error)
      message.error('Failed to retrieve messages. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListProjectAndDevice()
  }, [])

  useEffect(() => {
    if (projectOptions.length > 0) {
      const firstProject = projectOptions[0].value
      setSelectedProject(firstProject)
      handleAssignDevice(firstProject)
    }
  }, [projectOptions])

  useEffect(() => {
    if (deviceOptions?.length > 0) {
      const firstDevice = deviceOptions[0].value
      setSelectedDevice(firstDevice)
    }
  }, [deviceOptions])

  useEffect(() => {
    if (selectedDevice) {
      getMessage()
    } else {
      setData([])
    }
  }, [selectedProject, selectedDevice, messageType, dateRange, eventType, pagination])

  return (
    <div className="grid grid-cols-4 gap-3 place-content-center place-items-center mb-[20px]">
      <div className="flex items-center">
        <label>Select Project:</label>
        <Select
          options={projectOptions}
          className="w-[180px] ml-1"
          placeholder="Select Project"
          onChange={(value) => {
            setSelectedProject(value)
            setSelectedDevice(null)
            handleAssignDevice(value)
          }}
          value={selectedProject}
          allowClear
        />
      </div>
      <div className="flex items-center">
        <label>Select Device:</label>
        <Select
          options={deviceOptions}
          className="w-[180px] ml-1"
          placeholder="Select type"
          allowClear
          onChange={(value) => setSelectedDevice(value)}
          value={selectedDevice}
        />
      </div>
      <RangePicker
        style={{ width: 220 }}
        onChange={(_, value) => setDateRange({ startDate: value[0], endDate: value[1] })}
      />
      <Select
        className="w-[180px]"
        placeholder="Select event type"
        allowClear
        options={type}
        value={eventType}
        onChange={(value) => setEventType(value)}
      />
      {!isUser() ? (
        <Segmented
          options={messageConfigs}
          onChange={(value) => {
            setMessageType(value)
            setEventType(null)
          }}
          block
          className="w-[300px]"
        />
      ) : null}
    </div>
  )
}

FilterMenu.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  setData: PropTypes.func.isRequired,
  setTotalPage: PropTypes.func.isRequired,
  pagination: PropTypes.number,
  messageType: PropTypes.string,
  setMessageType: PropTypes.func
}
