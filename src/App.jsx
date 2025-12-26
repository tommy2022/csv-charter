import React, { useState } from 'react';
import ChartPlot from './ChartPlot';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import zoomPlugin from 'chartjs-plugin-zoom';

import { getColor } from './colors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

function App() {
  const [csvText, setCsvText] = useState(() => {
    return localStorage.getItem('csvText') || '';
  });

  const [chartData, setChartData] = useState(null);
  const [scales, setScales] = useState({});

  function datasetEntry(data, key, index, axisId) {
    return {
      label: key,
      data: data.map(row => row[key]),
      borderColor: getColor(index),
      backgroundColor: getColor(index) + '20',
      yAxisID: axisId,
      tension: 0.3,
    };
  }

  function buildDatasetsAndScales(data) {
    if (data.length === 0) return { chartData: null, options: {} };

    const columns = Object.keys(data[0]);
    const xKey = columns[0];
    const yKeys = columns.slice(1);

    const newScales = {
      x: { title: { display: true, text: xKey } }
    };

    const datasets = yKeys.map((key, index) => {
      const axisId = `y${index}`;

      newScales[axisId] = {
        type: 'linear',
        display: true,
        position: index === 0 ? 'left' : 'right',
        title: { display: true, text: key, color: getColor(index) },
        grid: { drawOnChartArea: index === 0 },
      };

      return datasetEntry(data, key, index, axisId);
    });

    return {
      chartData: {
        labels: data.map(row => row[xKey]),
        datasets: datasets
      },
      scales: newScales
    };
  }

  function processData() {
    localStorage.setItem('csvText', csvText);

    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const { chartData, scales } = buildDatasetsAndScales(data);
        setChartData(chartData);
        setScales(scales);
      }
    });
  }

  React.useEffect(() => {
    processData();
  }, []);

  return (
    <div style={{ padding: '20px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
      <h2>CSV Plotter</h2>
      <textarea
        style={{ width: '100%', height: '150px', marginBottom: '10px', fontFamily: 'monospace' }}
        placeholder="Paste any CSV here... (First column = X-axis)"
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
      />
      <button onClick={processData} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Plot Data
      </button>

      <ChartPlot chartData={chartData} scales={scales} />
    </div>
  );
}

export default App;
