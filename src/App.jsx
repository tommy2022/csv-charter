import React, { useState } from 'react';
import ChartPlot from './ChartPlot';
import DataInput from './DataInput';
import DataModifier from './DataModifier';

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

function App() {
  const [yKeys, setYKeys] = useState([]);
  const [xKey, setXKey] = useState('');
  const [data, setData] = useState([]);
  const [dataScale, setDataScale] = useState({});

  return (
    <div style={{ padding: '20px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
      <h2>CSV Plotter</h2>
      <DataInput setData={setData} setXKey={setXKey} setYKeys={setYKeys} />

      <DataModifier yKeys={yKeys} setYKeys={setYKeys} dataScale={dataScale} setDataScale={setDataScale} />

      <ChartPlot data={data} yKeys={yKeys} xKey={xKey} />
    </div>
  );
}

export default App;
