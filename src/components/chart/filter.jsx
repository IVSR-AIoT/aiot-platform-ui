import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import PropTypes from 'prop-types'

export default function FilterMenu({
  setDateRange,
  projectOption,
  setSelectedProject,
  selectedProject,
  dateRange
}) {
  return (
    <div className="grid lg:grid-cols-3 lg:place-content-center lg:place-items-center mb-5 md:grid-cols-1 md:place-items-start gap-2">
      <FloatLabel>
        <Dropdown
          showClear
          optionLabel="label"
          options={projectOption}
          onChange={(e) => setSelectedProject(e.value)}
          value={selectedProject}
          className="w-[200px]"
        />
        <label>Select Project</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          onChange={(e) => {
            setDateRange(e.value)
          }}
          value={dateRange}
          selectionMode="range"
          showButtonBar
        />
        <label>Select date</label>
      </FloatLabel>
    </div>
  )
}

FilterMenu.propTypes = {
  setSelectedProject: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired,
  projectOption: PropTypes.array.isRequired,
  selectedProject: PropTypes.object,
  dateRange: PropTypes.array
}
