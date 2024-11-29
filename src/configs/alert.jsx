export const messageConfigs = ['object', 'sensor', 'notification']
export const type = [
  { label: 'All', value: 'all' },
  { label: 'Human', value: 'human' },
  { label: 'Vehicle', value: 'vehicle' }
]
export const columns = [
  {
    title: 'Sensor Name',
    dataIndex: 'sensor_name',
    key: 'sensor_name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Payload',
    dataIndex: 'payload',
    key: 'payload',
    render: (payload) =>
      Array.isArray(payload) ? (
        <ul>
          {payload.map((row, index) => (
            <li key={index}>{`[${row.join(', ')}]`}</li>
          ))}
        </ul>
      ) : (
        payload
      )
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit'
  }
]
