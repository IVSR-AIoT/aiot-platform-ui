import { useEffect, useState } from 'react'
import useSWR from 'swr'
import BarChart from '~/components/chart/barChart'
import FilterMenu from '~/components/chart/filter'

import PieChart from '~/components/chart/pieChart'
import { messageTypes } from '~/configs/alert'
import {
  countHumanAndVehicle,
  countObjectAndSensor,
  filterDevice,
  handleCountStatus
} from '~/configs/chartFunc'
import useDebounce from '~/hook/useDebounce'
import { deviceListService } from '~/services/deviceService'
import { getMessageService } from '~/services/messageService'

export default function Chart() {
  const [fixedListDevice, setFixedListDevice] = useState([])
  const [listDevices, setListDevices] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [selectedDevice, setSelectedDevice] = useState([])

  //filter device
  useEffect(() => {
    if (selectedDevice.length === fixedListDevice.length || selectedDevice.length === 0) {
      setListDevices(fixedListDevice)
    } else {
      const data = filterDevice(fixedListDevice, selectedDevice)
      setListDevices(data)
    }
  }, [selectedDevice, fixedListDevice])

  // message type chart
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
  const [limit, setLimit] = useState(50)
  const debounceValue = useDebounce(limit, 500)
  const [typeMessageChart, setTypeMessageChart] = useState({
    labels: messageTypes.map((item) => item.label),
    datasets: [
      {
        label: 'Message Types',
        data: [],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderColor: ['#388e3c', '#1976d2', '#f57c00'],
        borderWidth: 1
      }
    ]
  })

  // device status chart
  const [statusChart, setStatusChart] = useState({
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Devices status',
        data: [],
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: ['#388e3c', '#d32f2f'],
        borderWidth: 1
      }
    ]
  })

  //detail notification chart
  const [notiArr, setNotiArr] = useState([])
  const [dataNotiChart, setDataNotiChart] = useState({
    labels: [],
    datasets: [
      {
        label: 'Object',
        data: [],
        backgroundColor: ['#4caf50'],
        borderColor: ['#388e3c'],
        borderWidth: 1
      },
      {
        label: 'Notification',
        data: [],
        backgroundColor: ['#f44336'],
        borderColor: ['#d32f2f'],
        borderWidth: 1
      }
    ]
  })
  useEffect(() => {
    const data = countObjectAndSensor(listDevices, notiArr)
    setDataNotiChart((prev) => ({
      ...prev,
      labels: listDevices.map((item) => item.label),
      datasets: [
        {
          label: 'Object',
          data: data.map((item) => item.numberObject),
          backgroundColor: ['#4caf50'],
          borderColor: ['#388e3c'],
          borderWidth: 1
        },
        {
          label: 'Notification',
          data: data.map((item) => item.numberSensor),
          backgroundColor: ['#f44336'],
          borderColor: ['#d32f2f'],
          borderWidth: 1
        }
      ]
    }))
  }, [listDevices, notiArr])

  //detail object chart
  const [objArr, setObjArr] = useState([])
  const [objectChart, setObjectChart] = useState({
    labels: [],
    datasets: [
      {
        label: 'Human',
        data: [],
        backgroundColor: ['#4caf50'],
        borderColor: ['#388e3c'],
        borderWidth: 1
      },
      {
        label: 'Vehicle',
        data: [],
        backgroundColor: ['#f44336'],
        borderColor: ['#d32f2f'],
        borderWidth: 1
      }
    ]
  })
  useEffect(() => {
    const data = countHumanAndVehicle(listDevices, objArr)
    setObjectChart((prev) => ({
      ...prev,
      labels: listDevices.map((item) => item.label),
      datasets: [
        {
          label: 'Human',
          data: data.map((item) => item.numberHuman),
          backgroundColor: ['#4caf50'],
          borderColor: ['#388e3c'],
          borderWidth: 1
        },
        {
          label: 'Vehicle',
          data: data.map((item) => item.numberVehicle),
          backgroundColor: ['#f44336'],
          borderColor: ['#d32f2f'],
          borderWidth: 1
        }
      ]
    }))
  }, [listDevices, objArr])

  // Fetch messages
  const getTotalMessage = async () => {
    try {
      const messageCounts = await Promise.all(
        messageTypes.map((item) =>
          getMessageService(
            item.value,
            null,
            dateRange.startDate,
            dateRange.endDate,
            null,
            null,
            debounceValue
          ).then((res) => {
            if (item.label === 'Notification') {
              setNotiArr(res.data)
            } else if (item.label === 'Object') {
              setObjArr(res.data)
            }
            return res?.total || 0
          })
        )
      )

      setTypeMessageChart((prev) => ({
        ...prev,
        datasets: prev.datasets.map((dataset) => ({
          ...dataset,
          data: messageCounts
        }))
      }))
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  // Fetch devices
  const getTotalDevice = async () => {
    try {
      const res = await deviceListService()
      const dataSet = handleCountStatus(res.data)
      setListDevices(
        res?.data.map((item) => ({
          label: item.name || item.mac_address,
          value: item.id,
          numberObject: 0,
          numberSensor: 0,
          numberHuman: 0,
          numberVehicle: 0
        }))
      )
      setFixedListDevice(
        res?.data.map((item) => ({
          label: item.name || item.mac_address,
          value: item.id,
          numberObject: 0,
          numberSensor: 0,
          numberHuman: 0,
          numberVehicle: 0
        }))
      )
      setDeviceOptions(
        res.data.map((item) => ({ label: item.name || item.mac_address, value: item.id }))
      )
      setStatusChart((prev) => ({
        ...prev,
        datasets: prev.datasets.map((dataset) => ({
          ...dataset,
          data: dataSet
        }))
      }))
      return res
    } catch (error) {
      console.error(error)
    }
  }

  useSWR(['/', dateRange.startDate, dateRange.endDate, debounceValue], getTotalMessage)
  useSWR('/', getTotalDevice)

  return (
    <div className="p-5">
      <FilterMenu
        setSelectedDevice={setSelectedDevice}
        setDateRange={setDateRange}
        limit={limit}
        setLimit={setLimit}
        deviceOptions={deviceOptions}
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-4">
        <div className="w-[300px] h-[300px]">
          <BarChart
            data={typeMessageChart}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Message type chart'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                }
              },
              maintainAspectRatio: false
            }}
          />
        </div>
        <div className="w-[300px] h-[300px]">
          <BarChart
            data={dataNotiChart}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Notification type chart'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                }
              },
              maintainAspectRatio: false
            }}
          />
        </div>
        <div className="w-[300px] h-[300px]">
          <BarChart
            data={objectChart}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Object type chart'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                }
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true
                },
                y: {
                  stacked: true
                }
              },
              maintainAspectRatio: false
            }}
          />
        </div>
        <div className="w-[600px] h-[300px]">
          <PieChart
            data={statusChart}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Devices status chart'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                }
              },
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    </div>
  )
}
