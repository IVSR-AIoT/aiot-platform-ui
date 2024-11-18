import { Pagination } from 'antd'
import { useState } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import ModalListObject from '~/components/alert/modalListObject'
import FilterMenu from '~/components/alert/search'
import MessageList from '~/components/alert/messageList'
import { messageConfigs } from '~/configs/alert'

function Alert() {
  const [messageType, setMessageType] = useState(messageConfigs[0])
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState()
  const [pagination, setPagination] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [detailMessage, setDetailMessage] = useState()

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-5">
      <FilterMenu
        setData={setData}
        pagination={pagination}
        setTotalPage={setTotalPage}
        messageType={messageType}
        setMessageType={setMessageType}
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
        total={totalPage ? totalPage / 2 : 0}
        onChange={(value) => {
          setPagination(value)
        }}
      />
    </div>
  )
}

export default Alert
