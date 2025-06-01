// Define the structure for collected money from funders for a month
export interface CollectedMoneyFromFunder {
  funderId: string;
  funderName: string;
  amount: number;
  percentage: number;
}

export interface CollectedMoneyFromMonth {
  collectedFromFunders: CollectedMoneyFromFunder[];
  remainingAmount: number; // Remaining amount after allocation (optional, can be computed)
}

// Define the Allocation type with a months map
export interface EmployeeAllocation {
  employeeId: string;
  employeeName: string;
  salary: number;
  months: Map<number, CollectedMoneyFromMonth>; // 0-11: month index to array of collected funders
}