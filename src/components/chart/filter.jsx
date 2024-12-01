import { DatePicker, InputNumber, Select } from 'antd'
import PropTypes from 'prop-types'

const { RangePicker } = DatePicker
export default function FilterMenu({ setDateRange, limit, setLimit }) {
  return (
    <div className="grid lg:grid-cols-3 lg:place-content-center lg:place-items-center mb-5 md:grid-cols-1 md:place-items-start">
      <div>
        <strong className="mr-2">Devices:</strong>
        <Select
          mode="multiple"
          maxTagCount={'responsive'}
          placeholder={'Select devices...'}
          className="w-[250px]"
          allowClear
        />
      </div>
      <div>
        <strong className="mr-2">Limit messages:</strong>
        <InputNumber
          className="w-[250px]"
          value={limit}
          onChange={(value) => {
            setLimit(value)
          }}
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
  setDateRange: PropTypes.func,
  setLimit: PropTypes.func,
  limit: PropTypes.number
}
