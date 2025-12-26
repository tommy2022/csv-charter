import React, { useState, useEffect, useRef } from 'react';

import Papa from 'papaparse';

function DataInput({ setData, setXKey, setYKeys }) {
  const fileInputRef = useRef(null);
  const [csvText, setCsvText] = useState(() => {
    return localStorage.getItem('csvText') || '';
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    processData();
  }, []);

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
    if (csvText.length < 10000) {
      localStorage.setItem('csvText', csvText);
    }
    // If csvText is not from a file, clear fileName
    if (!csvText) {
      setFileName('');
    }

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

  function parseFile(e) {
    var file = e.target.files[0];
    var fr = new FileReader();

    fr.onload = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        setCsvText(evt.target.result);
        setFileName(file.name);
        // Clear the file input after processing
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    fr.readAsText(file);
  }


  return (
    <>
    <input type="file" id="files" ref={fileInputRef} onChange={parseFile} />
    {fileName && (
      <div style={{ margin: '8px 0', color: '#555', fontSize: '0.95em' }}>
        <strong>Current file:</strong> {fileName}
      </div>
    )}
    {!csvText && (
      <div>
        Don't have a CSV file? Try this sample data:
        <button
          style={{ margin: '10px', padding: '6px 12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={async () => {
            const response = await fetch('/csv-charter/test_file.csv');
            const text = await response.text();
            setCsvText(text);
            setFileName('');
          }}
        >
          Load sample CSV
        </button>
      </div>
    )}

      {(fileName && csvText.length > 100000) ? (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Textarea hidden: CSV data from file "{fileName}" exceeds 100,000 characters.
        </div>
      ) : (
        <textarea
          style={{ width: '100%', height: '150px', marginBottom: '10px', fontFamily: 'monospace' }}
          placeholder="Paste any CSV here... (First column = X-axis)"
          value={csvText}
          onChange={(e) => {
            setCsvText(e.target.value);
            setFileName('');
          }}
        />
      )}
      <button onClick={processData} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Plot Data
      </button>
    </>
  );
}

export default DataInput;
