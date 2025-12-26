import React from 'react';

function DataModifier({yKeys, setYKeys}) {

  function handleCheckboxChange(idx) {
    const key = Object.keys(yKeys)[idx];
    setYKeys(prevYKeys => ({
      ...prevYKeys,
      [key]: !prevYKeys[key]
    }));
  }

  return (
    <div>
      {Object.entries(yKeys).map(([key, value], idx) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleCheckboxChange(idx)}
            />
            {key}
          </label>
        </div>
      ))}
    </div>
  );
}

export default DataModifier;
