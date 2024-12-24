import { Pagination, Spin, message } from 'antd'
import { useState, useEffect } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
/* import ModalListObject from '~/components/alert/modalListObject' */
import FilterMenu from '~/components/alert/search'
import { messageConfigs, messageTypes } from '~/configs/alert'
import { getMessageService } from '~/services/messageService'

import { TabPanel, TabView } from 'primereact/tabview'
import MessageItem from '~/components/alert/messageItem'
import { isUser } from '~/hook/useAuth'

function Alert() {
  const [messages, setMessages] = useState({
    object: [],
    sensor: [],
    notification: []
  })
  const [totalPage, setTotalPage] = useState({
    object: 0,
    sensor: 0,
    notification: 0
  })
  const [total, setTotal] = useState()
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [messageType, setMessageType] = useState(messageConfigs[0])
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState(1)
  /*   const [openModal, setOpenModal] = useState(false) */

  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [selectedType, setSelectedType] = useState(null)
  const [dates, setDates] = useState()

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true)
      try {
        const results = await Promise.all(
          messageConfigs.map(async (type) => {
            const response = await getMessageService(type)
            return { type, data: response.data, total: response.total }
          })
        )

        const updatedMessages = results.reduce((acc, { type, data }) => {
          acc[type] = data
          return acc
        }, {})

        setMessages(updatedMessages)
        const updatedTotalPage = results.reduce((acc, { type, total }) => {
          acc[type] = total
          return acc
        }, {})
        setTotalPage(updatedTotalPage)
      } catch {
        message.error('Error fetching messages.')
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [])

  useEffect(() => {
    if (messages && pagination === 1) {
      setData(messages[`${messageType}`])
      setTotal(totalPage[`${messageType}`])
    }
  }, [messages, messageType, pagination])

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true)
      const [start, end] = dates || [null, null]
      try {
        const res = await getMessageService(
          messageType,
          selectedProject?.code,
          selectedDevice?.code,
          start,
          end,
          selectedType?.code,
          pagination
        )

        setData(res.data)
        setTotal(res.total)
      } catch {
        message.error('Failed to retrieve messages. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    if (selectedProject || selectedDevice || dates || selectedType || pagination !== 1) {
      getMessage()
    }
  }, [selectedProject, selectedDevice, messageType, dates, selectedType, pagination])

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen bg-[#fff] p-5">
        <FilterMenu
          messageType={messageType}
          selectedDevice={selectedDevice}
          selectedProject={selectedProject}
          selectedType={selectedType}
          setMessageType={setMessageType}
          setSelectedType={setSelectedType}
          setDates={setDates}
          dates={dates}
          setTotalPage={setTotalPage}
          setSelectedDevice={setSelectedDevice}
          setSelectedProject={setSelectedProject}
        />

        <CreateSupportModal />
        {isUser() ? null : (
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => {
              setActiveIndex(e.index)
              setMessageType(messageTypes[e.index].value)
            }}
          >
            {messageTypes.map((item) => (
              <TabPanel key={item.value} header={item.label} />
            ))}
          </TabView>
        )}
        {data.map((item, index) => (
          <MessageItem key={index} data={item} messageType={messageType} />
        ))}

        {/*   <ModalListObject
          openModal={openModal}
          setOpenModal={setOpenModal}
          detailMessage={detailMessage}
          messageType={messageType}
        /> */}

        <Pagination
          align="center"
          defaultCurrent={1}
          total={total}
          pageSize={5}
          onChange={(value) => {
            setPagination(value)
          }}
        />
      </div>
    </Spin>
  )
}

export default Alert
