import { Button, DatePicker, Input, message, Pagination, Segmented, Select } from 'antd'
import { useEffect, useState } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import { isUser } from '~/hook/useAuth'
import { listDeviceByProjectIdService } from '~/services/deviceService'
import { getListProjectService } from '~/services/projectServices'
import { getMessageService } from '~/services/messageService'
import MessageCard from '~/components/dashboard/card'
import ModalListObject from '~/components/dashboard/modalListObject'
const messageType = ['sensor', 'object', 'notification']

function Dashboard() {
  const { RangePicker } = DatePicker
  const [openModal, setOpenModal] = useState(false)
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [selectMessageType, setSelectedMessageType] = useState(messageType[0])
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
  const [query, setQuery] = useState()
  const [pagination, setPagination] = useState(1)
  const [data, setData] = useState([])
  const [detailMessage, setDetailMessage] = useState()

  const getListProject = async () => {
    try {
      if (isUser()) {
        console.log('hello', pagination)
      } else {
        const res = await getListProjectService()

        setProjectOptions(res.map((item) => ({ label: item.name, value: item.id })))
      }
    } catch {
      message.error('error')
    }
  }

  const getListDeviceInProject = async (projectId) => {
    try {
      const res = await listDeviceByProjectIdService(projectId)
      setDeviceOptions(res.data.map((item) => ({ label: item.name, value: item.id })))
    } catch {
      message.error('error')
    }
  }

  const getMessage = async () => {
    if (!selectedProject) {
      message.error('choose your project')
    } else if (!selectedDevice) {
      message.error('choose your device')
    } else if (!selectMessageType) {
      message.error('choose your message type')
    }
    try {
      const res = await getMessageService(
        selectMessageType,
        selectedDevice,
        dateRange.startDate,
        dateRange.endDate,
        query
      )

      setData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListProject()
  }, [])
  return (
    <div className="min-h-screen bg-[#F0F2F5] p-5">
      <div className="grid grid-cols-2 gap-4 place-content-center place-items-center">
        <Select
          options={projectOptions}
          className="w-[300px] col-start-1"
          placeholder={'Select Project'}
          onChange={(value) => {
            getListDeviceInProject(value)
            setSelectedDevice(null)
            setSelectedProject(value)
          }}
          allowClear
        />
        <Select
          options={deviceOptions}
          className="w-[300px] col-start-1 col-end-2"
          placeholder={'Select Device'}
          allowClear
          onChange={(value) => setSelectedDevice(value)}
          value={selectedDevice}
        />
        <Segmented
          options={messageType}
          onChange={(value) => {
            setSelectedMessageType(value)
          }}
        />
        <Input placeholder="Query" className="w-[300px]" value={query} onChange={setQuery} />

        <RangePicker
          style={{ width: 250 }}
          onChange={(_, value) => {
            setDateRange({ startDate: value[0], endDate: value[1] })
          }}
        />
        <Button className="bg-red-500" onClick={getMessage}>
          test
        </Button>
      </div>
      <CreateSupportModal />
      <MessageCard
        data={data}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setDetailMessage={setDetailMessage}
      />
      <ModalListObject
        openModal={openModal}
        setOpenModal={setOpenModal}
        detailMessage={detailMessage}
      />
      <Pagination
        align="center"
        defaultCurrent={1}
        total={50}
        onChange={(value) => setPagination(value)}
      />
    </div>
  )
}

export default Dashboard
