import React, { useState } from 'react';
import { Employee } from '../models/Employee';
import { Funder } from '../models/Funder';
import { Allocation } from '../models/Allocation';
import {
  CollectedMoneyFromFunder,
  CollectedMoneyFromMonth,
  EmployeeAllocation,
} from '../models/EmployeeAllocation';
import AllocateDialog from './Dialog';
interface EmployeeTableProps {
  employees: Employee[];
  funders: Funder[];
  onAllocate: (allocation: Allocation) => void;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function isMonthInRange(monthIdx: number, funder: Funder) {
  const start = funder.startDate.getMonth();
  const end = funder.endDate.getMonth();
  const startYear = funder.startDate.getFullYear();
  const endYear = funder.endDate.getFullYear();
  // Handles year wrap
  if (startYear === endYear) {
    return monthIdx >= start && monthIdx <= end;
  }
  return (monthIdx >= start && monthIdx <= 11) || (monthIdx >= 0 && monthIdx <= end);
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, funders, onAllocate }) => {
  const [dialog, setDialog] = useState<{
    open: boolean;
    employee: EmployeeAllocation | null;
    monthIdx: number | null;
  }>({ open: false, employee: null, monthIdx: null });
  // set initial state for allocations
  const [allocations, setAllocations] = useState<EmployeeAllocation[]>(
    employees.map((emp) => ({
      employeeId: emp.id,
      employeeName: emp.name,
      salary: emp.salary,
      months: new Map<number, CollectedMoneyFromMonth>(
        Array.from({ length: 12 }, (_, idx) => [
          idx,
          { remainingAmount: emp.salary, collectedFromFunders: [] },
        ]),
      ),
    })),
  );
  const [error, setError] = useState<string>('');

  const handleCellClick = (employee: EmployeeAllocation, monthIdx: number) => {
    setDialog({ open: true, employee, monthIdx });
    setError('');
  };

  const handleAllocate = (percentage: number, selectedFunderId: string): void => {
    if (!dialog.employee || dialog.monthIdx === null) return;

    const employee = allocations.find((a) => a.employeeId === dialog.employee!!.employeeId);

    const funder = funders.find((f) => f.id === selectedFunderId);
    if (!funder) {
      setError('Please select a funder.');
      return;
    }
    if (!isMonthInRange(dialog.monthIdx, funder)) {
      setError('Funder not available for this month.');
      return;
    }
    if (percentage <= 0 || percentage > 100) {
      setError('Enter a valid percentage (1-100).');
      return;
    }
    const amount = (dialog.employee.salary * percentage) / 100;
    if (amount > funder.amount) {
      setError('Not enough funder balance.');
      return;
    }
    const existingAllocations = employee?.months.get(dialog.monthIdx)!!;
    const collectedMoneyFromFunder: CollectedMoneyFromFunder = {
      funderId: funder.id,
      funderName: funder.name,
      amount,
      percentage,
    };

    employee!.months.set(dialog.monthIdx, {
      remainingAmount: existingAllocations.remainingAmount - amount,
      collectedFromFunders: [...existingAllocations.collectedFromFunders, collectedMoneyFromFunder],
    });

    const updatedEmployee = allocations.map((e) => {
      if (e.employeeId === employee?.employeeId) return { ...employee };
      else return e;
    });

    setAllocations(updatedEmployee);
    onAllocate({
      funderId: funder.id,
      allocatedAmount: amount,
    });
    setDialog({ open: false, employee: null, monthIdx: null });
  };

  return (
    <div>
      <h2>Employee Funding Allocation</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            {monthNames.map((m, idx) => (
              <th key={idx}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allocations.map((emp) => {
            return (
              <tr key={emp.employeeId}>
                <td>{emp.employeeName}</td>
                <td>{emp.salary}</td>
                {Array.from(emp.months.entries()).map(([monthIdx, value]) => {
                  const { collectedFromFunders, remainingAmount } = value;

                  // If full salary is collected for this month, do not show remaining or allocate button
                  if (remainingAmount <= 0) {
                    return (
                      <td key={monthIdx}>
                        <div>
                          {collectedFromFunders.map((a, idx) => {
                            return (
                              <div key={idx}>
                                {`${a.funderName}`} &rarr; {a.amount}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  }

                  // Only show remaining and allocate button if not fully allocated for the year
                  return (
                    <td key={monthIdx}>
                      <div>
                        {collectedFromFunders.map((a, idx) => {
                          return (
                            <div key={idx}>
                              {a.funderName} &rarr; {a.amount}
                            </div>
                          );
                        })}
                        {remainingAmount > 0 && (
                          <>
                            <button onClick={() => handleCellClick(emp, monthIdx)}>
                              Allocate({remainingAmount})
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {dialog.open && dialog.employee && dialog.monthIdx !== null && (
        <AllocateDialog
          employeeName={dialog.employee.employeeName}
          monthIdx={dialog.monthIdx}
          funders={funders}
          monthNames={monthNames}
          error={error}
          onCancel={() => setDialog({ open: false, employee: null, monthIdx: null })}
          handleAllocate={handleAllocate}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
