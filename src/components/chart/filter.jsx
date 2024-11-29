import { DatePicker, Select } from 'antd'
import PropTypes from 'prop-types'

const { RangePicker } = DatePicker
export default function FilterMenu({
  setDateRange,
  deviceOption,
  selectedDevices,
  setSelectedDevices
}) {
  return (
    <div className="grid grid-cols-3 mb-5">
      <div>
        <strong className="mr-2">Devices:</strong>
        <Select
          mode="multiple"
          maxTagCount={'responsive'}
          placeholder={'Select devices...'}
          options={deviceOption}
          className="w-[250px]"
          allowClear
          value={selectedDevices}
          onChange={setSelectedDevices}
        />
      </div>
      <RangePicker
        style={{ width: 220 }}
        onChange={(_, value) => setDateRange({ startDate: value[0], endDate: value[1] })}
      />
    </div>
  )
}
FilterMenu.propTypes = {
  setSelectedDevices: PropTypes.func,
  setDateRange: PropTypes.func,
  deviceOption: PropTypes.array,
  selectedDevices: PropTypes.array
}
