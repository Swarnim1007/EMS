import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListDepartmentComponent from '../components/ListDepartmentComponent';
import { getAllDepartments, deleteDepartment } from '../services/DepartmentService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock the services
jest.mock('../services/DepartmentService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ListDepartmentComponent', () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigate();
  });

  test('renders departments and displays them correctly', async () => {
    // Mock the getAllDepartments service to return some sample departments
    getAllDepartments.mockResolvedValue({
      data: [
        { id: 1, departmentName: 'HR', departmentDescription: 'Human Resources' },
        { id: 2, departmentName: 'IT', departmentDescription: 'Information Technology' },
      ],
    });

    render(
      <MemoryRouter>
        <ListDepartmentComponent />
      </MemoryRouter>
    );

    // Wait for the departments to load
    await waitFor(() => screen.getByText('HR'));

    // Check if the department names are displayed correctly
    expect(screen.getByText('HR')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
  });

  test('clicking the "Update" button navigates to the correct edit page', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    // Mock the getAllDepartments service to return some sample departments
    getAllDepartments.mockResolvedValue({
      data: [
        { id: 1, departmentName: 'HR', departmentDescription: 'Human Resources' },
      ],
    });

    render(
      <MemoryRouter>
        <ListDepartmentComponent />
      </MemoryRouter>
    );

    // Wait for the departments to load
    await waitFor(() => screen.getByText('HR'));

    // Simulate a click on the "Update" button for HR
    fireEvent.click(screen.getByText('Update'));

    // Verify if the navigate function was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('/edit-department/1');
  });

  test('clicking the "Delete" button deletes the department and updates the list', async () => {
    // Mock deleteDepartment to resolve successfully and return a valid response
    deleteDepartment.mockResolvedValueOnce({ data: {} });
  
    // Mock getAllDepartments to return initial departments
    getAllDepartments.mockResolvedValueOnce({
      data: [
        { id: 1, departmentName: 'HR', departmentDescription: 'Human Resources' },
        { id: 2, departmentName: 'IT', departmentDescription: 'Information Technology' },
      ],
    });
  
    render(
      <MemoryRouter>
        <ListDepartmentComponent />
      </MemoryRouter>
    );
  
    // Check initial departments are rendered
    await waitFor(() => {
      expect(screen.getByText('HR')).toBeInTheDocument();
      expect(screen.getByText('IT')).toBeInTheDocument();
    });
  
    // Get the Delete button
    const deleteButtons = screen.getAllByText('Delete');
  
    // Click the first Delete button (corresponding to the first department)
    fireEvent.click(deleteButtons[0]);
  
    // Wait for the list to be updated after the delete operation
    await waitFor(() => {
      // Ensure HR is no longer present in the document
      expect(screen.queryByText('HR')).not.toBeInTheDocument();
      // IT should still be present
      expect(screen.getByText('IT')).toBeInTheDocument();
    });
  
    // Ensure deleteDepartment was called for the correct department ID
    expect(deleteDepartment).toHaveBeenCalledWith(1); // Assuming the ID of the first department is 1
  });
  
  
  
});
