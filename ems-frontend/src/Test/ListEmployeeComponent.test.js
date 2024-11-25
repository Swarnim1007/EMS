import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act ,waitFor } from '@testing-library/react';
import ListEmployeeComponents from '../components/ListEmployeeComponents';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';

// Mock the services
jest.mock('../services/EmployeeService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ListEmployeeComponents', () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigate();
  });

  // Test Case 1: Render employee list
  test('renders the employee list correctly', async () => {
    // Mock the listEmployees service to return some sample employees
    listEmployees.mockResolvedValue({
      data: [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      ],
    });
  
    render(
      <MemoryRouter>
        <ListEmployeeComponents />
      </MemoryRouter>
    );
  
    // Wait for the employee names to load
    await waitFor(() => screen.getByText(/John/));  // Match part of the name (John)
    await waitFor(() => screen.getByText(/Doe/));   // Match the other part (Doe)
  
    // Check if the employee names are displayed correctly
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane/)).toBeInTheDocument();
    expect(screen.getByText(/Smith/)).toBeInTheDocument();
  });
  

  // Test Case 2: Clicking the "Add Employee" button navigates to the add employee page
  test('clicking the "Add Employee" button navigates to the add employee page', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ListEmployeeComponents />
      </MemoryRouter>
    );

    // Simulate a click on the "Add Employee" button
    fireEvent.click(screen.getByText('Add Employee'));

    // Verify if the navigate function was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('/add-employee');
  });

// //   // Test Case 3: Clicking the "Delete" button deletes the employee and updates the list
// test('clicking the "Delete" button deletes the employee and updates the list', async () => {
//   // Mock the deleteEmployee service to resolve successfully
//   deleteEmployee.mockResolvedValue({ data: {} });

//   // Mock the listEmployees service to return sample employees
//   listEmployees.mockResolvedValue({
//     data: [
//       { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
//       { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
//     ],
//   });

//   // Wrap the render call inside act() to handle state updates properly
//   await act(async () => {
//     render(
//       <MemoryRouter>
//         <ListEmployeeComponents />
//       </MemoryRouter>
//     );
//   });

//   // Use a more flexible matcher for first and last names
//   const johnDoeMatcher = (_, node) => {
//     const hasText = (node) => node.textContent === 'John';
//     const nodeHasJohn = hasText(node);
//     const parentHasDoe = node?.parentNode?.textContent?.includes('Doe');
//     return nodeHasJohn && parentHasDoe;
//   };

//   const janeSmithMatcher = (_, node) => {
//     const hasText = (node) => node.textContent === 'Jane';
//     const nodeHasJane = hasText(node);
//     const parentHasSmith = node?.parentNode?.textContent?.includes('Smith');
//     return nodeHasJane && parentHasSmith;
//   };

//   // Wait for the employee list to load using the matchers
//   await screen.findByText(johnDoeMatcher);
//   await screen.findByText(janeSmithMatcher);

//   // Check if the initial employees are displayed
//   expect(screen.getByText(johnDoeMatcher)).toBeInTheDocument();
//   expect(screen.getByText(janeSmithMatcher)).toBeInTheDocument();

//   // Get the Delete button and click it for the first employee
//   const deleteButtons = screen.getAllByText('Delete');

//   // Use act() to handle the click event properly
//   await act(async () => {
//     fireEvent.click(deleteButtons[0]);
//   });

//   // Wait for the employee list to update and ensure John Doe is removed
//   await waitFor(() => {
//     expect(screen.queryByText(johnDoeMatcher)).not.toBeInTheDocument();
//     expect(screen.getByText(janeSmithMatcher)).toBeInTheDocument();
//   });

//   // Ensure deleteEmployee was called with the correct employee ID
//   expect(deleteEmployee).toHaveBeenCalledWith(1);
// });
  
});
