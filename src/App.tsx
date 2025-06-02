import React, { useState } from 'react';
import './styles/App.css';
import EmployeeTable from './components/EmployeeTable';
import FunderTable from './components/FunderTable';

// Dummy data for demonstration
import { Employee } from './models/Employee';
import { Funder } from './models/Funder';

const employees: Employee[] = [
  { id: 'e1', name: 'Alice', salary: 100, months: 12 },
  { id: 'e2', name: 'Bob', salary: 200, months: 12 },
  { id: 'e3', name: 'Cathy', salary: 2000, months: 12 },
  { id: 'e4', name: 'David', salary: 300, months: 12 },
  { id: 'e5', name: 'Eve', salary: 100, months: 12 },
];

const funders: Funder[] = [
  {
    id: 'f1',
    name: 'Funder 1',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 9, 31),
    amount: 2000,
  },
  {
    id: 'f2',
    name: 'Funder 2',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 9, 31),
    amount: 2000,
  },
  {
    id: 'f3',
    name: 'Funder 3',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 10, 30),
    amount: 1000,
  },
  {
    id: 'f4',
    name: 'Funder 4',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 30),
    amount: 1000,
  },
];

const App: React.FC = () => {
  const [funderBalances, setFunderBalances] = useState<{ [funderId: string]: number }>(() =>
    Object.fromEntries(funders.map((f) => [f.id, f.amount])),
  );

  // Only update funder balance here, move allocation logic to EmployeeTable
  const updateFunderBalance = (funderId: string, amount: number) => {
    setFunderBalances((prev) => ({
      ...prev,
      [funderId]: prev[funderId] - amount,
    }));
  };

  return (
    <div className="App">
      <h1>Funding Allocation App</h1>
      <FunderTable
        funders={funders.map((f) => ({
          ...f,
          amount: funderBalances[f.id] ?? f.amount,
        }))}
      />
      <EmployeeTable
        employees={employees}
        funders={funders.map((f) => ({
          ...f,
          amount: funderBalances[f.id] ?? f.amount,
        }))}
        onAllocate={(allocation) => {
          updateFunderBalance(allocation.funderId, allocation.allocatedAmount);
        }}
      />
    </div>
  );
};

export default App;
