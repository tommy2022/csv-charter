import React, { useState } from 'react';
import { getColor } from './colors';

import Papa from 'papaparse';

function DataInput({ setChartData, setScales }) {
  const [csvText, setCsvText] = useState(() => {
    return localStorage.getItem('csvText') || '';
  });


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
    <>
    {!csvText && (
      <div>
        Don't have a CSV file? Try this sample data:
        <button
          style={{ margin: '10px', padding: '6px 12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={async () => {
            const response = await fetch('/csv-charter/test_file.csv');
            const text = await response.text();
            setCsvText(text);
          }}
        >
          Load sample CSV
        </button>
      </div>
    )}

      <textarea
        style={{ width: '100%', height: '150px', marginBottom: '10px', fontFamily: 'monospace' }}
        placeholder="Paste any CSV here... (First column = X-axis)"
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
      />
      <button onClick={processData} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Plot Data
      </button>
    </>
  );
}

export default DataInput;
