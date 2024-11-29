import { useEffect, useState } from 'react'
import BarChart from '~/components/chart/barChart'
import FilterMenu from '~/components/chart/filter'
import PieChart from '~/components/chart/pieChart'
import { deviceListService } from '~/services/deviceService'
import { getMessageService } from '~/services/messageService'
import { type } from '~/configs/alert'

export default function Chart() {
  const [listDevices, setListDevices] = useState([])
  const [selectedDevices, setSelectedDevices] = useState([])
  const [deviceOption, setDeviceOption] = useState([])
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Notifications',
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
        data: []
      }
    ]
  })
  const [pieData, setPieData] = useState({
    labels: type.map((item) => item.label),
    datasets: [
      {
        label: 'Type Detections',
        backgroundColor: ['#3e95cd', '#8e5ea2', '#c45850'],
        data: []
      }
    ]
  })

  const setDetectionType = async () => {
    try {
      const numberTypeDetection = await Promise.all(
        type.map((item) =>
          getMessageService(
            'object',
            null,
            dateRange.startDate,
            dateRange.endDate,
            item.value,
            null
          )
            .then((msgRes) => msgRes.total)
            .catch(() => 0)
        )
      )
      setPieData({
        labels: type.map((item) => item.label),
        datasets: [
          {
            label: 'Type Detections',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#c45850'],
            data: numberTypeDetection
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleListDevice = async () => {
    try {
      const res = await deviceListService()
      const devices = res.data
      setListDevices(res.data)
      setDeviceOption(
        devices.map((item) => ({ label: item.name || item.mac_address, value: item.id }))
      )
    } catch (error) {
      console.error('Error fetching devices or messages:', error)
    }
  }

  const handleAssign = async () => {
    let notifications
    if (selectedDevices.length !== 0) {
      notifications = await Promise.all(
        selectedDevices.map((device) =>
          getMessageService(
            'notification',
            device,
            dateRange.startDate,
            dateRange.endDate,
            null,
            null
          )
            .then((msgRes) => msgRes.total)
            .catch(() => 0)
        )
      )
    } else {
      notifications = await Promise.all(
        listDevices.map((device) =>
          getMessageService(
            'notification',
            device.id,
            dateRange.startDate,
            dateRange.endDate,
            null,
            null
          )
            .then((msgRes) => msgRes.total)
            .catch(() => 0)
        )
      )
    }

    setBarData({
      labels: listDevices.map((device) => device.name || device.mac_address),
      datasets: [
        {
          label: 'Notifications',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: notifications
        }
      ]
    })
  }

  const options = {
    legend: { display: false },
    title: {
      display: true,
      text: 'Device Notifications'
    }
  }

  useEffect(() => {
    handleListDevice()
    setDetectionType()
  }, [])

  useEffect(() => {
    handleAssign()
  }, [dateRange, selectedDevices, listDevices])

  return (
    <div className="p-5">
      <FilterMenu
        setDateRange={setDateRange}
        deviceOption={deviceOption}
        selectedDevices={selectedDevices}
        setSelectedDevices={setSelectedDevices}
      />
      <div className=" grid grid-cols-2 place-content-center place-items-center">
        <div className="w-[600px] h-[300px]">
          <BarChart data={barData} options={options} />
        </div>
        <div className="w-[300px] h-[300px]">
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  )
}
