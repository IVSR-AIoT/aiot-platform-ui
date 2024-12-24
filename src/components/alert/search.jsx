import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { authContext } from '~/hook/useContext'

import { FloatLabel } from 'primereact/floatlabel'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { eventTypeOptions } from '~/configs/alert'

export default function FilterMenu({
  messageType,
  setDates,
  dates,
  selectedType,
  selectedProject,
  selectedDevice,
  setSelectedDevice,
  setSelectedProject,
  setSelectedType
}) {
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [profile, setProfile] = useState()

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
        .device.map((item) => ({ name: item?.name, code: item?.id }))

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
          onChange={(e) => setSelectedDevice(e.value)}
          options={deviceOptions}
          optionLabel="name"
          className="w-full border"
        />
        <label>Select device</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          value={dates}
          showButtonBar
          selectionMode="range"
          onChange={(e) => setDates(e.value)}
          dateFormat="yy-mm-dd"
          className="w-full rounded"
        />
        <label>Select date</label>
      </FloatLabel>

      {messageType === 'object' && (
        <FloatLabel>
          <Dropdown
            value={selectedType}
            onChange={(e) => setSelectedType(e.value)}
            options={eventTypeOptions}
            optionLabel="name"
            showClear
            className="w-full border"
          />
          <label>Select Type</label>
        </FloatLabel>
      )}
    </div>
  )
}

FilterMenu.propTypes = {
  messageType: PropTypes.string,
  selectedType: PropTypes.object,
  dates: PropTypes.object,
  setDates: PropTypes.func.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  selectedDevice: PropTypes.object,
  selectedProject: PropTypes.object
}
