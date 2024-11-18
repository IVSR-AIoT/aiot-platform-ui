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
                description={messageType === 'object' ? item?.specs?.description : item?.payload}
              />
              <div className="grid grid-cols-4 place-items-center place-content-center ml-[-10px]">
                <p>
                  <label className="font-semibold">Timestamp:</label> {formatDate(item?.timestamp)}
                </p>
                {messageType === 'object' ? (
                  <p>
                    <label className="font-semibold w-[80px]">Camera:</label>{' '}
                    {item?.specs?.camera.id} - {item?.specs?.camera?.type}
                  </p>
                ) : null}
                <p>
                  <label className="font-semibold w-[80px]">Device:</label> {item?.device.id} -{' '}
                  {item?.device?.mac_address}
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
