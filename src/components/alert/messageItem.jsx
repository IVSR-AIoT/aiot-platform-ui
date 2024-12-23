import { Fieldset } from 'primereact/fieldset'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import PropTypes from 'prop-types'
import Map from '../map'
import { useEffect, useState } from 'react'

function ShowData({ title, payload }) {
  return (
    <div className="flex">
      <strong className="mr-2">{title}:</strong>
      <p>{payload || 'N/A'}</p>
    </div>
  )
}

ShowData.propTypes = {
  title: PropTypes.string.isRequired,
  payload: PropTypes.any
}

export default function MessageItem({ data, messageType }) {
  const [previewImg, setPreviewImg] = useState()
  useEffect(() => {
    const getPreviewImg = () => {
      if (messageType === 'object') {
        const imgURL = data?.object_list?.map((object) => object.image_URL)
        setPreviewImg(imgURL[0])
      } else {
        setPreviewImg(null)
      }
    }
    getPreviewImg()
  }, [data])

  const renderCommonFields = () => (
    <>
      <ShowData title="Timestamp" payload={data?.timestamp} />
      <ShowData title="Device" payload={data?.device?.name} />
      <ShowData title="Device status" payload={data?.device?.isActive ? 'Active' : 'Inactive'} />
    </>
  )

  const renderMessageContent = () => {
    switch (messageType) {
      case 'notification':
        return (
          <>
            {renderCommonFields()}
            <ShowData title="Payload" payload={data?.payload} />
          </>
        )
      case 'object':
        return (
          <div>
            {renderCommonFields()}
            <ShowData
              title="Camera"
              payload={`${data?.specs?.camera?.id} - ${data?.specs?.camera?.type} - ${data?.specs?.description}`}
            />
          </div>
        )
      case 'sensor':
        return renderCommonFields()
      default:
        return <p>No message content available for this type.</p>
    }
  }

  return (
    <Fieldset legend={data?.message_id || 'Unknown Message ID'} className="mb-5">
      <div className="lg:flex lg:justify-between  ">
        <div>
          {renderMessageContent()}
          <div className="grid grid-cols-2 gap-2 my-2">
            <Button label="Watch video" />
            <Button label="Detail Message" severity="secondary" />
            <Button label="Accept" severity="success" />
            <Button label="Reject" severity="danger" />
          </div>
        </div>
        <div className="overflow-hidden rounded-lg my-2">
          <Image src={previewImg} alt="Image" width="180" preview className="rounded shadow" />
        </div>
        <Map lon={data?.location?.lon} lat={data?.location?.lat} />
      </div>
    </Fieldset>
  )
}

MessageItem.propTypes = {
  data: PropTypes.object.isRequired,
  messageType: PropTypes.string.isRequired
}
