import { Button, List } from 'antd'
import PropTypes from 'prop-types'
import { formatDate } from '~/configs/utils'
import Map from '../map'

export default function MessageList({
  data,
  setOpenModal,
  setDetailMessage,
  messageType = 'notification'
}) {
  //const [previewImg, setPreviewImg] = useState()

  const getDescription = (type, item) => {
    switch (type) {
      case 'notification':
        return item?.payload
      case 'object':
        return item?.specs?.description
      default:
        return ''
    }
  }

  return (
    <div className="min-h-[100vh]">
      <List
        className="w-full"
        locale={{ emptyText: 'No messages available' }}
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item?.message_id}
            actions={[
              <Button
                type="primary"
                key="detail"
                onClick={() => {
                  setOpenModal(true)
                  setDetailMessage(item)
                }}
              >
                Detail
              </Button>,
              <Button type="primary" key="watch-video">
                Watch video
              </Button>,
              <Button type="primary" ghost key="accept">
                Accept
              </Button>,
              <Button danger key="reject">
                Dismiss
              </Button>
            ]}
            extra={
              <div className="w-[300px]">
                <Map />
              </div>
            }
          >
            <div>
              <List.Item.Meta
                title={<h1 className="font-bold text-[20px]">{item?.message_id}</h1>}
                description={getDescription(messageType, item)}
              />
              <div>
                <p className="mr-[15px]">
                  <strong>Timestamp:</strong> {formatDate(item?.timestamp)}
                </p>
                {messageType === 'object' && (
                  <p className="mr-[15px]">
                    <strong>Camera:</strong> {item?.specs?.camera?.id} - {item?.specs?.camera?.type}
                  </p>
                )}
                <p className="mr-[15px]">
                  <strong>Device:</strong> {item?.device?.name} - {item?.device?.mac_address}
                </p>
                <p className="mr-[15px]">
                  <strong>Status:</strong>{' '}
                  {item?.device?.isActive === false ? 'Inactive' : 'Active'}
                </p>
              </div>
            </div>
          </List.Item>
        )}
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
