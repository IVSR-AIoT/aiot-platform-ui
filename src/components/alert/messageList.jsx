import { Button, List } from 'antd'
import PropTypes from 'prop-types'
import { formatDate } from '~/configs/utils'
import Map from '../map'

export default function MessageList({ data, setOpenModal, setDetailMessage, messageType }) {
  return (
    <div className="min-h-[100vh]">
      <List
        className="w-full"
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => {
          return (
            <List.Item
              key={item?.message_id}
              actions={[
                <Button
                  type="primary"
                  key="watch-video"
                  onClick={() => {
                    setOpenModal(true)
                    setDetailMessage(item)
                  }}
                >
                  Watch Video
                </Button>,
                <Button danger key="reject">
                  Dismiss
                </Button>,
                <Button type="primary" ghost key="accept">
                  Acknowledge
                </Button>
              ]}
              extra={<Map />}
            >
              <List.Item.Meta
                title={<h1 className="font-bold text-[20px]">{item?.message_id}</h1>}
                description={
                  messageType === 'notification'
                    ? item?.payload
                    : messageType === 'object'
                      ? item?.specs?.description
                      : ''
                }
              />
              <div className="flex">
                <p className="mr-[15px]">
                  <strong>Timestamp:</strong> {formatDate(item?.timestamp)}
                </p>
                {messageType === 'object' ? (
                  <p className="mr-[15px]">
                    <strong>Camera:</strong> {item?.specs?.camera.id} - {item?.specs?.camera?.type}
                  </p>
                ) : null}
                <p className="mr-[15px]">
                  <strong>Device:</strong> {item?.device.name} - {item?.device?.mac_address}
                </p>
                <p className="mr-[15px]">
                  <strong>Status:</strong>{' '}
                  {item?.device?.isActive === false ? 'Inactive' : 'Active'}
                </p>
              </div>
            </List.Item>
          )
        }}
      ></List>
    </div>
  )
}

MessageList.propTypes = {
  data: PropTypes.array.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setDetailMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string
}
