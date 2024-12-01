import { useState } from 'react'
import useSWR from 'swr'
import BarChart from '~/components/chart/barChart'
import FilterMenu from '~/components/chart/filter'
import PieChart from '~/components/chart/pieChart'
import { messageTypes } from '~/configs/alert'
import { handleCountStatus } from '~/configs/chartFunc'
import useDebounce from '~/hook/useDebounce'
import { deviceListService } from '~/services/deviceService'
import { getMessageService } from '~/services/messageService'

export default function Chart() {
  const [numberOfMessage, setNumberOfMessage] = useState([])
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })
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
  const [limit, setLimit] = useState(50)
  const debounceValue = useDebounce(limit, 500)

  // Fetch messages
  const getTotalMessage = async () => {
    try {
      for (const item of messageTypes) {
        const res = await getMessageService(
          item.value,
          null,
          dateRange.startDate,
          dateRange.endDate,
          null,
          null,
          debounceValue
        )
        setNumberOfMessage((prev) => [...prev, res?.total])
      }
      setTypeMessageChart((prev) => ({
        ...prev,
        datasets: prev.datasets.map((dataset) => ({
          ...dataset,
          data: numberOfMessage
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
      <FilterMenu setDateRange={setDateRange} limit={limit} setLimit={setLimit} />
      <div className="grid grid-cols-2 place-content-center place-items-center">
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
      </div>
    </div>
  )
}
