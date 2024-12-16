import { useContext, useEffect, useState } from 'react'
import FilterMenu from '~/components/chart/filter'
import BarChart from '~/components/chart/barChart'
import PieChart from '~/components/chart/pieChart'
import { dasboardService } from '~/services/messageService'
import { authContext } from '~/hook/useContext'

export default function Chart() {
  const [messageDevice, setMessageDevice] = useState([])
  const [notificationType, setNotificationType] = useState([])
  const [statusDevice, setStatusDevice] = useState([])
  const [typeDetection, setTypeDetection] = useState([])
  const [projectOption, setProjectOption] = useState([])
  const [selectedProject, setSelectedProject] = useState()
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
  const profile = useContext(authContext)

  useEffect(() => {
    if (profile) {
      setProjectOption(
        profile.project.map((project) => ({ label: project.name, value: project.id }))
      )
    }
  }, [profile])
  //fetch data
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await dasboardService(selectedProject, dateRange.startDate, dateRange.endDate)
        setMessageDevice(res?.messageDevice)
        setNotificationType(res?.notificationType)
        setStatusDevice(res?.statusDevice)
        setTypeDetection(res?.typeDetect)
      } catch (err) {
        console.log(err)
      }
    }
    getDashboard()
  }, [selectedProject, dateRange.startDate, dateRange.endDate])

  //status devices
  const [statusDeviceData, setStatusDeviceData] = useState({
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Status of devices',
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#9E9E9E']
      }
    ]
  })

  useEffect(() => {
    if (statusDevice) {
      setStatusDeviceData({
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            label: 'Status of devices',
            data: [statusDevice.deviceActive || 0, statusDevice.deviceInActive || 0],
            backgroundColor: ['#4CAF50', '#9E9E9E']
          }
        ]
      })
    }
  }, [statusDevice])

  //message device
  const [messageDeviceData, setMessageDeviceData] = useState({
    labels: [],
    datasets: []
  })
  useEffect(() => {
    if (messageDevice) {
      setMessageDeviceData({
        labels: messageDevice.map((device) => device.name),
        datasets: [
          {
            label: 'Object',
            data: messageDevice.map((device) => device.object || 0),
            backgroundColor: '#4CAF50'
          },
          {
            label: 'Sensor',
            data: messageDevice.map((device) => device.sensor || 0),
            backgroundColor: '#2196F3'
          },
          {
            label: 'Notification',
            data: messageDevice.map((device) => device.notification || 0),
            backgroundColor: '#FFEB3B'
          }
        ]
      })
    }
  }, [messageDevice])

  // type detection
  const [typeDetectionData, setTypeDetectionData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    setTypeDetectionData({
      labels: typeDetection?.map((device) => device.name),
      datasets: [
        {
          label: 'Human',
          data: typeDetection?.map((device) => device.human || 0),
          backgroundColor: '#9C27B0'
        },
        {
          label: 'Vehicle',
          data: typeDetection?.map((device) => device.vehicle || 0),
          backgroundColor: '#F44336'
        }
      ]
    })
  }, [typeDetection])

  //notification
  const [notificationTypeData, setNotificationTypeData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if (notificationType) {
      setNotificationTypeData({
        labels: notificationType.map((device) => device.name),
        datasets: [
          {
            label: 'Object',
            data: notificationType.map((device) => device.object || 0),
            backgroundColor: '#4CAF50'
          },
          {
            label: 'Sensor',
            data: notificationType.map((device) => device.sensor || 0),
            backgroundColor: '#2196F3'
          }
        ]
      })
    }
  }, [notificationType])

  return (
    <div className="h-screen p-5">
      <FilterMenu
        projectOption={projectOption}
        setSelectedProject={setSelectedProject}
        setDateRange={setDateRange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <fieldset className="p-4 border-2 rounded-md">
          <legend className="text-lg font-semibold">Device Status</legend>
          <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[300px] mx-auto">
            <PieChart data={statusDeviceData} />
          </div>
        </fieldset>

        <fieldset className="p-4 border-2 rounded-md">
          <legend className="text-lg font-semibold">Message Device Data</legend>
          <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[300px] mx-auto">
            <BarChart data={messageDeviceData} />
          </div>
        </fieldset>

        <fieldset className="p-4 border-2 rounded-md">
          <legend className="text-lg font-semibold">Type Detection Data</legend>
          <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[300px] mx-auto">
            <BarChart data={typeDetectionData} />
          </div>
        </fieldset>

        <fieldset className="p-4 border-2 rounded-md">
          <legend className="text-lg font-semibold">Notification Type Data</legend>
          <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[300px] mx-auto">
            <BarChart data={notificationTypeData} />
          </div>
        </fieldset>
      </div>
    </div>
  )
}
