import React from 'react';
import SmartTable from './SmartTable';
import { Funder } from '../models/Funder';

interface FunderTableProps {
  funders: Funder[];
}

const FunderTable: React.FC<FunderTableProps> = ({ funders }) => {

  // Use the expected column shape for SmartTable
  const columns = [
    { header: 'Funder Name', accessor: 'name' as keyof Funder },
    { header: 'Funding Amount', accessor: 'amount' as keyof Funder },
    { header: 'Start Date', accessor: 'startDate' as keyof Funder },
    { header: 'End Date', accessor: 'endDate' as keyof Funder },
    // The Allocate Percentage column will be rendered separately below
  ];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
          <th>Allocate Percentage</th>
        </tr>
      </thead>
      <tbody>
        {funders.map((funder, idx) => {
      
          return (
            <tr key={funder.id}>
              {columns.map((col, colIdx) => {
                const value = funder[col.accessor];
                let displayValue = value;
                if (
                  (col.accessor === 'startDate' || col.accessor === 'endDate') &&
                  value instanceof Date
                ) {
                  displayValue = value.toLocaleString('default', { month: 'short', year: 'numeric' });
                }
                return (
                  <td key={colIdx}>{String(displayValue)}</td>
                );
              })}
          
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FunderTable;