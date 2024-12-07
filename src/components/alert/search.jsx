import { Segmented, Select, DatePicker, InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { messageConfigs } from '~/configs/alert'
import { isUser } from '~/hook/useAuth'
import { type } from '~/configs/alert'

export default function FilterMenu({
  handleAssignDevice,
  setEventType,
  setDateRange,
  eventType,
  setMessageType,
  setLimit,
  limit,
  deviceOptions,
  projectOptions
}) {
  const { RangePicker } = DatePicker
  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 place-content-center place-items-center mb-[20px]">
      <div className="flex items-center">
        <strong>Select Project:</strong>
        <Select
          options={projectOptions}
          className="w-[180px] ml-1"
          placeholder="Select Project"
          onChange={(value) => {
            setSelectedProject(value)
            setSelectedDevice(null)
            handleAssignDevice(value)
          }}
          value={selectedProject}
          allowClear
        />
      </div>
      <div className="flex items-center">
        <strong>Select Device:</strong>
        <Select
          options={deviceOptions}
          className="w-[180px] ml-1"
          placeholder="Select type"
          allowClear
          onChange={(value) => setSelectedDevice(value)}
          value={selectedDevice}
        />
      </div>
      <RangePicker
        style={{ width: 220 }}
        onChange={(_, value) => setDateRange({ startDate: value[0], endDate: value[1] })}
      />
      <Select
        className="w-[180px]"
        placeholder="Select event type"
        allowClear
        options={type}
        value={eventType}
        onChange={(value) => setEventType(value)}
      />

      {!isUser() ? (
        <Segmented
          options={messageConfigs}
          onChange={(value) => {
            setMessageType(value)
            setEventType(null)
          }}
          block
          className="w-[300px]"
        />
      ) : null}
      <div>
        <strong>Limit:</strong>
        <InputNumber className="ml-1" defaultValue={limit} onChange={(value) => setLimit(value)} />
      </div>
    </div>
  )
}

FilterMenu.propTypes = {
  deviceOptions: PropTypes.array,
  handleAssignDevice: PropTypes.func,
  setDateRange: PropTypes.func,
  setEventType: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  setData: PropTypes.func.isRequired,
  setTotalPage: PropTypes.func.isRequired,
  pagination: PropTypes.number,
  messageType: PropTypes.string,
  setMessageType: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  eventType: PropTypes.string,
  projectOptions: PropTypes.array
}
