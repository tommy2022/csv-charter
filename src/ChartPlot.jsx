import React from 'react';
import { Line } from 'react-chartjs-2';

function ChartPlot({ chartData, scales }) {
  if (!chartData) return null;

  const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: scales,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          }
        }
      }

  return (
    <div style={{ minWidth: '600px', minHeight: '400px', marginTop: '20px', background: '#fff', border: '1px solid #ddd', padding: '15px', boxSizing: 'border-box' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ChartPlot;
