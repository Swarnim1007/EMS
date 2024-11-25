import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DepartmentComponent from '../components/DepartmentComponent';
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock the services
jest.mock('../services/DepartmentService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DepartmentComponent', () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigate();
  });

  test('renders form and checks fields for a new department (no id)', async () => {
    render(
      <MemoryRouter initialEntries={['/add-department']}>
        <Routes>
          <Route path='/add-department' element={<DepartmentComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Check that the form inputs are present and empty initially
    expect(screen.getByLabelText('Department Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Department Description:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Department Name').value).toBe('');
    expect(screen.getByPlaceholderText('Enter Department Description').value).toBe('');
  });

  test('submits form to create a new department', async () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    // Mock createDepartment to return a resolved promise
    createDepartment.mockResolvedValue({
      data: { departmentName: 'HR', departmentDescription: 'Human Resources' },
    });

    render(
      <MemoryRouter>
        <DepartmentComponent />
      </MemoryRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Enter Department Name'), {
      target: { value: 'HR' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Department Description'), {
      target: { value: 'Human Resources' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the navigate function to be called
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/departments'));

    // Verify the API was called
    expect(createDepartment).toHaveBeenCalledWith({
      departmentName: 'HR',
      departmentDescription: 'Human Resources',
    });
  });

  test('submits form to update an existing department', async () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    // Mock getDepartmentById to return mock department data
    getDepartmentById.mockResolvedValue({
      data: { departmentName: 'HR', departmentDescription: 'Human Resources' },
    });

    // Mock updateDepartment to return a resolved promise
    updateDepartment.mockResolvedValue({
      data: { departmentName: 'HR', departmentDescription: 'Human Resources' },
    });

    render(
      <MemoryRouter initialEntries={['/edit-department/1']}>
        <Routes>
          <Route path='/edit-department/:id' element={<DepartmentComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for department data to load
    await waitFor(() => screen.getByDisplayValue('HR'));

    // Fill in the form with new values
    fireEvent.change(screen.getByPlaceholderText('Enter Department Name'), {
      target: { value: 'Finance' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Department Description'), {
      target: { value: 'Financial Department' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the navigate function to be called
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/departments'));

    // Verify the API was called
    expect(updateDepartment).toHaveBeenCalledWith('1', {
      departmentName: 'Finance',
      departmentDescription: 'Financial Department',
    });
  });

  test('handles error when creating a department fails', async () => {
    createDepartment.mockRejectedValue(new Error('Failed to create department'));

    render(
      <MemoryRouter initialEntries={['/add-department']}>
        <Routes>
          <Route path='/add-department' element={<DepartmentComponent />} />
        </Routes>
      </MemoryRouter>
    );

    const departmentNameInput = screen.getByPlaceholderText('Enter Department Name');
    const departmentDescriptionInput = screen.getByPlaceholderText('Enter Department Description');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(departmentNameInput, { target: { value: 'IT' } });
    fireEvent.change(departmentDescriptionInput, { target: { value: 'Information Technology' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // The function should fail silently or log an error
      expect(createDepartment).toHaveBeenCalledWith({
        departmentName: 'IT',
        departmentDescription: 'Information Technology',
      });
      // Check for error handling (this may be logged to the console or shown in an alert)
    });
  });
});
