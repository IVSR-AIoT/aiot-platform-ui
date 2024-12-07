import { Button, Image, List } from 'antd'
import PropTypes from 'prop-types'
import { formatDate } from '~/configs/utils'
import Map from '../map'
import { useEffect, useState } from 'react'

export default function MessageList({
  data,
  setOpenModal,
  setDetailMessage,
  messageType = 'notification'
}) {
  const [previewImg, setPreviewImg] = useState([])

  useEffect(() => {
    if (!data) return

    const list = []
    data.forEach((item) => {
      if (Array.isArray(item.object_list)) {
        item.object_list.some((object) => {
          if (object.image_URL && list.length < 2) {
            list.push(object.image_URL)
          }
          return list.length >= 2
        })
      }
    })
    setPreviewImg(list)
  }, [data])

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
              <Button type="primary" ghost key="accept">
                Accept
              </Button>,
              <Button danger key="reject">
                Dismiss
              </Button>
            ]}
            extra={
              <div className="flex gap-4 flex-wrap">
                {messageType !== 'sensor' && previewImg.length > 0 && (
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(`current index: ${current}, prev index: ${prev}`)
                    }}
                  >
                    {previewImg.map((url, index) => (
                      <Image
                        key={index}
                        width={200}
                        height={200}
                        style={{ objectFit: 'cover' }}
                        src={url}
                      />
                    ))}
                  </Image.PreviewGroup>
                )}
                <div className="w-[300px]">
                  <Map />
                </div>
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
