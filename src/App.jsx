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
  const [chartData, setChartData] = useState(null);
  const [scales, setScales] = useState({});

  return (
    <div style={{ padding: '20px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
      <h2>CSV Plotter</h2>
      <DataInput setChartData={setChartData} setScales={setScales} />

      <ChartPlot chartData={chartData} scales={scales} />
    </div>
  );
}

export default App;
