import React from 'react';

interface SmartTableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
}

const SmartTable = <T,>({ data, columns }: SmartTableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor.toString()}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor.toString()}>{String(row[column.accessor])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SmartTable;
