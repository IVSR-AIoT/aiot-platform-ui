import { Divider, List, Modal } from 'antd'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function ModalListObject({ detailMessage, openModal, setOpenModal }) {
  const [dataSource, setDataSource] = useState()
  const handleAssignEventToObject = () => {
    let event
    const finalData = detailMessage.object_list.map((item) => {
      event = detailMessage.event_list.filter((data) => data.object_id === item.id)
      return { ...item, event: event[0] }
    })
    setDataSource(finalData)
  }
  useEffect(() => {
    if (detailMessage) {
      handleAssignEventToObject()
    }
  }, [detailMessage])

  const handleOk = () => {
    setOpenModal(false)
  }
  const handleCancel = () => {
    setOpenModal(false)
  }
  return (
    <Modal
      width={700}
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<p className=" text-[24px]">Detail Message</p>}
    >
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={dataSource}
        renderItem={(item) => {
          return (
            <div key={item.id} className="m-2">
              <List.Item>
                <label>Type:</label> {item.object.type}
              </List.Item>

              {item.object.type === 'human' ? (
                <div>
                  <List.Item>
                    <label>Age:</label> {item.object.age}
                  </List.Item>
                  {item.event ? (
                    <List.Item>
                      <label>Gender:</label> {item.object.gender}
                    </List.Item>
                  ) : null}
                </div>
              ) : (
                <div>
                  <List.Item>
                    <label>Brand:</label> {item.object.brand}
                  </List.Item>
                  <List.Item>
                    <label>Color:</label> {item.object.color}
                  </List.Item>
                  <List.Item>
                    <label>Licence:</label> {item.object.licence}
                  </List.Item>
                  <List.Item>
                    <label>Category:</label> {item.object.category}
                  </List.Item>
                </div>
              )}
              {item.event ? (
                <List.Item>
                  <label>Action:</label> {item.event.action}
                </List.Item>
              ) : null}
              <List.Item>
                <label>Top Left X:</label> {item.bbox.topleftx}
              </List.Item>
              <List.Item>
                <label>Top Left y:</label> {item.bbox.toplefty}
              </List.Item>
              <List.Item>
                <label>Bottom Right X:</label> {item.bbox.bottomrightx}
              </List.Item>
              <List.Item>
                <label>Bottom Right Y:</label> {item.bbox.bottomrighty}
              </List.Item>
            </div>
          )
        }}
      />
    </Modal>
  )
}

ModalListObject.propTypes = {
  detailMessage: PropTypes.object,
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired
}
