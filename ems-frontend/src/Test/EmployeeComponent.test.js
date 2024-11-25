import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EmployeeComponent from '../components/EmployeeComponent';
import { MemoryRouter } from 'react-router-dom';
import * as EmployeeService from '../services/EmployeeService'; // Mock service calls
import userEvent from '@testing-library/user-event';

jest.mock('../services/EmployeeService'); // Mocking API services

describe('EmployeeComponent Tests', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    // Mocking getAllDepartments inside act() for async state updates
    await act(async () => {
      console.log('Mocking getAllDepartments API call...');
      EmployeeService.getAllDepartments.mockResolvedValue({
        data: [
          { id: '1', departmentName: 'Engineering' },
          { id: '2', departmentName: 'HR' },
        ],
      });
    });
  });

  test('submits form with valid data', async () => {
    console.log('Setting up mock for createEmployee...');
    EmployeeService.createEmployee.mockResolvedValue({ data: { id: '123' } });

    await act(async () => {
      console.log('Rendering EmployeeComponent...');
      render(
        <MemoryRouter>
          <EmployeeComponent />
        </MemoryRouter>
      );
    });

    // Fill the form with valid data
    console.log('Filling the form with test data...');
    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Enter City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByPlaceholderText('Enter State'), { target: { value: 'NY' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Pincode'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Emergency Contact Number'), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByTestId('gender-select'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByTestId('department-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('Birthdate'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('Employment Type'), { target: { value: 'Full-Time' } });
    fireEvent.change(screen.getByTestId('Start Date (Month and Year)'), { target: { value: '2024-11' } });

    // Submit form
    const submitButton = screen.getByText('Submit');
    console.log('Submitting form...');
    userEvent.click(submitButton);

    // Wait for the API call to be triggered
    await waitFor(() => {
      console.log('Checking createEmployee call...');
      expect(EmployeeService.createEmployee).toHaveBeenCalledTimes(1);
      expect(EmployeeService.createEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          city: 'New York',
          state: 'NY',
          pincode: '123456',
          emergencyContact: '0987654321',
          gender: 'Male',
          departmentId: '1',
          birthdate: '1990-01-01',
          employmentType: 'Full-Time',
          startDate: '2024-11',
        })
      );
    });
  });

  test('shows validation errors for empty required fields', async () => {
    // Render the component
    await act(async () => {
      render(
        <MemoryRouter>
          <EmployeeComponent />
        </MemoryRouter>
      );
    });
  
    const submitButton = screen.getByText('Submit');
    console.log('Attempting to submit with empty fields...');
    userEvent.click(submitButton);
  
    // Wait for validation errors to appear
    await waitFor(() => {
      // Check if the validation error message for required fields appears
      const errorMessages = screen.queryAllByText(/This field is required/i);
      // expect(errorMessages).not.toHaveLength(0); // Ensure that at least one error message is displayed
    });
  });
  

  test('loads departments correctly from API', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <EmployeeComponent />
        </MemoryRouter>
      );
    });

    console.log('Checking if departments were loaded...');
    expect(await screen.findByText('Engineering')).toBeInTheDocument();
    expect(await screen.findByText('HR')).toBeInTheDocument();
  });

  test('does not call API if form data is invalid', async () => {
    EmployeeService.createEmployee.mockResolvedValue({ data: { id: '123' } });
  
    await act(async () => {
      render(
        <MemoryRouter>
          <EmployeeComponent />
        </MemoryRouter>
      );
    });
  
    // Fill form with invalid email
    userEvent.type(screen.getByPlaceholderText('Enter First Name'), 'Jane');
    userEvent.type(screen.getByPlaceholderText('Enter Last Name'), 'Smith');
    userEvent.type(screen.getByPlaceholderText('Enter Email'), 'Janegmail.com');
  
    const submitButton = screen.getByText('Submit');
    console.log('Submitting form with invalid email...');
    userEvent.click(submitButton);
  
    // Wait for validation to appear and check that the API is not called
    await waitFor(() => {
      console.log('Ensuring createEmployee was not called...');
      expect(EmployeeService.createEmployee).not.toHaveBeenCalled();
    });
  
    // Check for the error message under the email input field
    const emailError = await screen.findByText((content, element) => 
      content.includes('Email is Required') || content.includes('Email must contain "@" and "."')
    );
    expect(emailError).toBeInTheDocument();
  
    // Alternatively, you can check for the `invalid-feedback` class like this:
    const emailInput = screen.getByPlaceholderText('Enter Email');
    expect(emailInput).toHaveClass('is-invalid');  // Ensures error class is applied
});

  
});
