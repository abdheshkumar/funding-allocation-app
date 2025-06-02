import React, { useState, useEffect } from 'react';
import { Employee } from '../models/Employee';
import { Funder } from '../models/Funder';

type DialogProps = {
  monthIdx: number;
  employeeName: string;
  error?: string;
  onCancel: () => void;
  funders: Funder[];
  monthNames: string[];
  handleAllocate: (percentage: number, selectedFunderId: string) => void;
};

const Dialog: React.FC<DialogProps> = ({
  employeeName,
  monthIdx,
  funders,
  monthNames,
  error,
  onCancel,
  handleAllocate,
}) => {
  const [selectedFunderId, setSelectedFunderId] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 300 }}>
        <h3>
          Allocate for {employeeName} - {monthNames[monthIdx]}
        </h3>
        <div>
          <label>Funder: </label>
          <select value={selectedFunderId} onChange={(e) => setSelectedFunderId(e.target.value)}>
            <option value="">Select funder</option>
            {funders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} (Rem: {f.amount})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Percentage: </label>
          <input
            type="number"
            value={percentage}
            min={1}
            max={100}
            onChange={(e) => setPercentage(Number(e.target.value))}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button onClick={() => handleAllocate(percentage, selectedFunderId)}>Allocate</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Dialog;
