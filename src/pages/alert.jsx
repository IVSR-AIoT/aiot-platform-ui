import { Pagination, Spin, message } from 'antd'
import { useState, useEffect } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import ModalListObject from '~/components/alert/modalListObject'
import FilterMenu from '~/components/alert/search'
import MessageList from '~/components/alert/messageList'
import { messageConfigs } from '~/configs/alert'
import { listProjectAndDevice } from '~/services/projectServices'
import { getMessageService } from '~/services/messageService'
import { isUser } from '~/hook/useAuth'
import useDebounce from '~/hook/useDebounce'

function Alert() {
  const [projectAndDevice, setProjectAndDevice] = useState([])
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageType, setMessageType] = useState(messageConfigs[0])
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState()
  const [pagination, setPagination] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [detailMessage, setDetailMessage] = useState()
  const [limit, setLimit] = useState(5)
  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [eventType, setEventType] = useState()
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })

  //fetch device
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

  //fetch message
  const limitDebounce = useDebounce(limit, 500)
  const getMessage = async () => {
    if (!selectedProject || !selectedDevice || !messageType) {
      message.warning('Please select a project, device, and message type.')
      return
    }
    if (isUser()) {
      setMessageType('notification')
    }
    setLoading(true)
    try {
      const res = await getMessageService(
        messageType,
        selectedDevice,
        dateRange.startDate,
        dateRange.endDate,
        eventType,
        pagination,
        limitDebounce
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

  //call function
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
    setPagination(1)
    if (selectedDevice) {
      getMessage()
    } else {
      setData([])
    }
  }, [
    selectedProject,
    selectedDevice,
    messageType,
    dateRange,
    eventType,
    pagination,
    limitDebounce
  ])

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen bg-[#F0F2F5] p-5">
        <FilterMenu
          deviceOptions={deviceOptions}
          handleAssignDevice={handleAssignDevice}
          setEventType={setEventType}
          setDateRange={setDateRange}
          setLimit={setLimit}
          limit={limit}
          setTotalPage={setTotalPage}
          messageType={messageType}
          setMessageType={setMessageType}
          projectOptions={projectOptions}
        />
        <CreateSupportModal />
        <MessageList
          data={data}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setDetailMessage={setDetailMessage}
          messageType={messageType}
        />
        <ModalListObject
          openModal={openModal}
          setOpenModal={setOpenModal}
          detailMessage={detailMessage}
          messageType={messageType}
        />

        <Pagination
          align="center"
          defaultCurrent={1}
          total={totalPage}
          pageSize={limit}
          onChange={(value) => {
            setPagination(value)
          }}
        />
      </div>
    </Spin>
  )
}

export default Alert
