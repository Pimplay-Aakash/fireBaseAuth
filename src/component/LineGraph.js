import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraphCard = ({ totalSum, date, graphData }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: graphData.labels, // Assuming graphData has labels array
          datasets: [
            {
              label: 'Example Dataset',
              data: graphData.data, // Assuming graphData has data array
              borderColor: '#4a90e2',
              backgroundColor: 'rgba(74, 144, 226, 0.2)',
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Value',
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [graphData]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Total Enrolment: {totalSum}</h2>
        <p className="text-gray-500">{date}</p>
      </div>
      <div className="mb-4">
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

export default LineGraphCard;
