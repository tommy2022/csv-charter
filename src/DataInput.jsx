import React, { useState, useEffect } from 'react';

import Papa from 'papaparse';

function DataInput({ setData, setXKey, setYKeys }) {
  const [csvText, setCsvText] = useState(() => {
    return localStorage.getItem('csvText') || '';
  });

  function setXandYKeys(data) {
    if (data.length === 0) return { chartData: null, options: {} };

    const columns = Object.keys(data[0]);
    const xKey = columns[0];
    const yKeyValues = columns.slice(1);

    const newYKeys = {};

    yKeyValues.forEach(key => {
      newYKeys[key] = true;
    });

    setXKey(xKey);
    setYKeys(newYKeys);
  }

  function processData() {
    localStorage.setItem('csvText', csvText);

    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        setData(data);
        setXandYKeys(data);
      }
    });
  }

  useEffect(() => {
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
