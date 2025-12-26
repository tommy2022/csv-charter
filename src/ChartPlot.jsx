import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { getColor } from './colors';

function ChartPlot({ data, yKeys, xKey }) {
  const [scales, setScales] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    updateScales();
  }, [yKeys]);

  useEffect(() => {
    updateChartData();
  }, [data, yKeys]);

  if (!data || data.length === 0) return null;
  if (!chartData || chartData.length === 0) return null;

  function axisId(index) {
    return `y${index}`;
  }

  function updateScales() {
    if (!yKeys || yKeys.length === 0) {
      setScales({});
      return;
    }

    const newScales = {
      x: { title: { display: true, text: xKey } }
    };

    Object.entries(yKeys).forEach(([key, show], index) => {
      newScales[axisId(index)] = {
        type: 'linear',
        display: show,
        position: index === 0 ? 'left' : 'right',
        title: { display: true, text: key, color: getColor(index) },
        grid: { drawOnChartArea: index === 0 },
      };
    });

    setScales(newScales);
  }

  function datasetEntry(key, show, index) {
    return {
      label: key,
      data: data.map(row => row[key]),
      borderColor: getColor(index),
      backgroundColor: getColor(index) + '20',
      yAxisID: axisId(index),
      tension: 0.3,
      hidden: !show
    };
  }

  function updateChartData() {
    if (data.length === 0) {
      setChartData([]);
      return;
    }

    const datasets = Object.entries(yKeys).map(([key, show], index) => {
      return datasetEntry(key, show, index);
    });

    const newChartData = {
      labels: data.map(row => row[xKey]),
      datasets: datasets
    }

    setChartData(newChartData);
  }

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
