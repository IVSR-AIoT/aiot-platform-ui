import { Pagination } from 'antd'
import { useState } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import ModalListObject from '~/components/dashboard/modalListObject'
import FilterMenu from '~/components/dashboard/search'
import MessageList from '~/components/dashboard/messageList'

function Dashboard() {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState()
  const [pagination, setPagination] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [detailMessage, setDetailMessage] = useState()

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-5">
      <FilterMenu setData={setData} pagination={pagination} setTotalPage={setTotalPage} />
      <CreateSupportModal />
      <MessageList
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
        total={totalPage ? totalPage / 2 : 0}
        onChange={(value) => {
          setPagination(value)
        }}
      />
    </div>
  )
}

export default Dashboard
