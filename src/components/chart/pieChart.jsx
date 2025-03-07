import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import PropTypes from 'prop-types'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function PieChart({ data, options }) {
  return (
    <div className="w-full h-full">
      <Pie data={data} options={options} />
    </div>
  )
}

PieChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        backgroundColor: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired
      })
    ).isRequired
  }).isRequired,
  options: PropTypes.object
}
