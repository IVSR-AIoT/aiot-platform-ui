import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import PropTypes from 'prop-types'
import { formatDate } from '~/configs/utils'

export default function MessageCard({ data, setOpenModal, setDetailMessage }) {
  return (
    <div className="grid grid-cols-3 gap-4 place-content-center place-items-center my-5">
      {data.map((item) => {
        return (
          <Card
            className="w-[350px]"
            key={item.message_id}
            actions={[
              <p
                key="watch-video"
                onClick={() => {
                  setOpenModal(true)
                  setDetailMessage(item)
                }}
              >
                Watch Video
              </p>,
              <p key="reject">Reject</p>,
              <p key="accept">Accept</p>
            ]}
          >
            <Meta
              title={<p className=" text-[20px]">{item.message_id}</p>}
              description={
                <div>
                  <p>
                    <label className="font-bold">Timestamp:</label> {formatDate(item.timestamp)}
                  </p>
                  <p>
                    <label className="font-bold w-[80px]">Camera:</label> {item.specs.camera.id} -{' '}
                    {item.specs.camera.type}
                  </p>
                  <p>
                    <label className="font-bold w-[80px]">Descriptions:</label>{' '}
                    {item.specs.description}
                  </p>
                  <p>
                    <label className="font-bold w-[80px]">Location:</label> {item.location.id} -{' '}
                    {item.location.description}
                  </p>
                  <p>
                    <label className="font-bold w-[80px]">Device:</label> {item.device.id} -{' '}
                    {item.device.mac_address}
                  </p>
                </div>
              }
            />
          </Card>
        )
      })}
    </div>
  )
}

MessageCard.propTypes = {
  data: PropTypes.array.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setDetailMessage: PropTypes.func.isRequired
}
