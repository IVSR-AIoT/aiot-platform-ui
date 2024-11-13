import { List, Modal, Typography, Image } from 'antd'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const { Text } = Typography

function LabelValue({ label, value }) {
  return (
    <List.Item>
      <Text strong>{label}:</Text> {value}
    </List.Item>
  )
}

export default function ModalListObject({ detailMessage, openModal, setOpenModal }) {
  const [dataSource, setDataSource] = useState([])

  const handleAssignEventToObject = () => {
    const finalData = detailMessage?.object_list.map((item) => {
      const event = detailMessage.event_list.find((data) => data.object_id === item.id)
      return { ...item, event: event || null }
    })
    setDataSource(finalData)
  }

  useEffect(() => {
    if (detailMessage) handleAssignEventToObject()
  }, [detailMessage])

  const handleOk = () => setOpenModal(false)
  const handleCancel = () => setOpenModal(false)

  return (
    <Modal
      width={700}
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<Text className="text-[24px]">{detailMessage?.message_id}</Text>}
    >
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={dataSource}
        renderItem={(item) => (
          <div key={item.id} className="m-2">
            <List.Item>
              <Image href={item.image_URL} alt="object-image" />
            </List.Item>
            <LabelValue label="Type" value={item.object.type} />

            {item.object.type === 'human' ? (
              <>
                <LabelValue label="Age" value={item.object.age} />
                {item.event && <LabelValue label="Gender" value={item.object.gender} />}
              </>
            ) : (
              <>
                <LabelValue label="Brand" value={item.object.brand} />
                <LabelValue label="Color" value={item.object.color} />
                <LabelValue label="Licence" value={item.object.licence} />
                <LabelValue label="Category" value={item.object.category} />
              </>
            )}

            {item.event && <LabelValue label="Action" value={item.event.action} />}
            <LabelValue label="Top Left X" value={item.bbox.topleftx} />
            <LabelValue label="Top Left Y" value={item.bbox.toplefty} />
            <LabelValue label="Bottom Right X" value={item.bbox.bottomrightx} />
            <LabelValue label="Bottom Right Y" value={item.bbox.bottomrighty} />
          </div>
        )}
      />
    </Modal>
  )
}

ModalListObject.propTypes = {
  detailMessage: PropTypes.shape({
    message_id: PropTypes.string,
    object_list: PropTypes.arrayOf(PropTypes.object),
    event_list: PropTypes.arrayOf(PropTypes.object)
  }),
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired
}

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
