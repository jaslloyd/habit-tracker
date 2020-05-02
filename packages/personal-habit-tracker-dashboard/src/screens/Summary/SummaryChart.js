import React from 'react';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';

const SummaryChart = ({ habitDetails: { name, totalCompletions, totalTarget } }) => (
  <div className="my-pretty-chart-container">
    <Chart
      chartType="PieChart"
      data={[['Target', 'Completed'], ['Success', totalCompletions], ['Fails', totalTarget - totalCompletions]]}
      options={{
        pieHole: 0.4,
        pieSliceTextStyle: {
          color: 'white',
        },
        slices: {
          0: { color: 'green' },
          1: { color: 'red' },
        },
        backgroundColor: 'transparent',
        legend: 'none',
      }}
      graph_id={name}
      width="100%"
      height="200px"
      legend_toggle
    />
  </div>
);

SummaryChart.propTypes = {
  habitDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    totalCompletions: PropTypes.number.isRequired,
    totalTarget: PropTypes.number.isRequired,
  }).isRequired,
};

export default SummaryChart;
