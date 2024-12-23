import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { authContext } from '~/hook/useContext'
import { eventType } from '~/configs/alert'
import { FloatLabel } from 'primereact/floatlabel'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

export default function FilterMenu({
  messageType,
  selectedProject,
  selectedDevice,
  setSelectedDevice,
  setSelectedProject,
  setEventType
}) {
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [profile, setProfile] = useState()
  const [date, setDate] = useState('')
  const profileContext = useContext(authContext)

  useEffect(() => {
    setProfile(profileContext)
  }, [profileContext])

  // set project options
  useEffect(() => {
    const listOptions = profile?.project.map((project) => ({
      name: project?.name,
      code: project?.id
    }))
    setProjectOptions(listOptions)
  }, [profile])

  //set device options
  useEffect(() => {
    if (selectedProject) {
      const listDevice = profile?.project
        .find((item) => item.id === selectedProject.code)
        .device.map((item) => ({ name: item.name, code: item.id }))

      setDeviceOptions(listDevice)
    }
  }, [profile, selectedProject])

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-3 mb-[20px]">
      <FloatLabel>
        <Dropdown
          showClear
          value={selectedProject}
          onChange={(e) => {
            setSelectedDevice(null)
            setDeviceOptions([])
            setSelectedProject(e.value)
          }}
          options={projectOptions}
          optionLabel="name"
          className="w-full border"
        />
        <label>Select Project</label>
      </FloatLabel>

      <FloatLabel>
        <Dropdown
          showClear
          value={selectedDevice}
          onChange={(e) => {
            setSelectedDevice(e.value)
          }}
          options={deviceOptions}
          optionLabel="name"
          className="w-full border"
        />
        <label>Select device</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          inputClassName="pl-3"
          readOnlyInput
          value={date}
          showButtonBar
          selectionMode="range"
          onChange={(e) => {
            setDate(e.value)
          }}
          dateFormat="yy-mm-dd"
          className="w-full h-full border rounded"
        />
        <label>Select date</label>
      </FloatLabel>

      {messageType === 'object' ? (
        <FloatLabel>
          <Dropdown
            optionLabel="name"
            optionValue="code"
            options={eventType}
            onChange={(value) => {
              setEventType(value)
            }}
            className="w-full border"
          />
          <label>Select type</label>
        </FloatLabel>
      ) : null}
    </div>
  )
}

FilterMenu.propTypes = {
  messageType: PropTypes.string,
  setDateRange: PropTypes.func.isRequired,
  setEventType: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  selectedDevice: PropTypes.number,
  selectedProject: PropTypes.number
}
