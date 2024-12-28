import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,  // For the x-axis (category scale)
  LinearScale,    // For the y-axis (linear scale)
  PointElement,   // For plotting points on the line
  LineElement,    // For rendering the line
  Title,          // For chart title
  Tooltip,        // For tooltips
  Legend          // For chart legend
} from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeSeriesChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Time Series Data',
      },
    },
    scales: {
      x: {
        type: 'category',  // Use category scale for x-axis
        labels: data.labels,
      },
      y: {
        type: 'linear',  // Use linear scale for y-axis
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TimeSeriesChart;







