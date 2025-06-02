# Funding Allocation App

This project is a React application that implements funding allocation logic, allowing users to allocate a percentage of funds from selected funders to employees while checking date ranges and remaining funds.

## Features

- **Employee Management**: View and manage a list of employees, including their salaries and months.
- **Funder Management**: View and manage a list of funders, including their funding amounts and date ranges.
- **Fund Allocation**: Allocate a percentage of funds from selected funders to employees through a user-friendly form.
- **Smart Table**: Utilize a smart table for displaying employee and funder data with sorting and filtering capabilities.

## Project Structure

```
funding-allocation-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── EmployeeTable.tsx
│   │   ├── FunderTable.tsx
│   │   ├── AllocationForm.tsx
│   │   └── SmartTable.tsx
│   ├── hooks
│   │   └── useAllocationLogic.ts
│   ├── models
│   │   ├── Employee.ts
│   │   ├── Funder.ts
│   │   └── Allocation.ts
│   ├── utils
│   │   └── dateUtils.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── App.css
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd funding-allocation-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   npm run format
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.