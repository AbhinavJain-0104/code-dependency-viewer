import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './ClassMetrics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClassMetrics = ({ metrics }) => {
  if (!metrics) return null;

  const data = {
    labels: ['Field Count', 'Lines of Code', 'Depth of Inheritance', 'Method Count', 'Cyclomatic Complexity'],
    datasets: [
      {
        label: 'Class Metrics',
        data: [
          metrics.fieldCount,
          metrics.linesOfCode,
          metrics.depthOfInheritance,
          metrics.methodCount,
          metrics.cyclomaticComplexity,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="class-metrics">
      <h2>Class Metrics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClassMetrics;