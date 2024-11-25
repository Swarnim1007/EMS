import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../components/LoginPage'; // Adjust the path to your LoginPage component

// Mock the Axios module to avoid actual HTTP requests
jest.mock('axios');

// Mock the `useNavigate` hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage Component', () => {
  const mockOnLogin = jest.fn(); // Mock function to simulate the onLogin callback

  beforeEach(() => {
    // Clear all mocks before each test to avoid conflicts
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    // Check if the form elements are present
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows an error if email or password is missing', async () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );
  
    // Access the form element using a CSS class name
    const form = screen.getByRole('form'); // If the form has a role assigned
  
    // If `role="form"` is not set on the form element, you can use the class or other attributes:
    // const form = screen.getByClassName('login-form');
    
    // Simulate form submission without email or password
    fireEvent.submit(form);
  
    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByText('All fields are required')).toBeInTheDocument()
    );
  });
  
  

  test('shows an error if email is invalid', async () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    // Simulate invalid email input
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'ValidPassword123!' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message about invalid email
    await waitFor(() =>
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    );
  });

  test('shows an error if password is weak', async () => {
    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    // Simulate weak password input
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'sk@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: '12345' }, // Weak password
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message about weak password
    await waitFor(() =>
      expect(
        screen.getByText(
          'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character'
        )
      ).toBeInTheDocument()
    );
  });

  test('calls the login API and handles successful login', async () => {
    // Mock a successful API response
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    // Simulate user typing email and password
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'ck@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'Chitransh07&' },
    });

    // Click the Login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the Axios request to resolve
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/auth/login', {
        username: 'ck@gmail.com',
        password: 'Chitransh07&',
      })
    );

    // Expect the onLogin callback to be called with true
    expect(mockOnLogin).toHaveBeenCalledWith(true);

    // Expect navigation to '/departments' after a successful login
    expect(mockNavigate).toHaveBeenCalledWith('/departments');
  });

  test('handles login failure', async () => {
    // Mock a failed API response
    axios.post.mockRejectedValueOnce(new Error('Login failed'));

    render(
      <BrowserRouter>
        <LoginPage onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    // Simulate user typing email and password
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'Chitransh07&' },
    });

    // Click the Login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByText('Login failed, please try again')).toBeInTheDocument()
    );

    // Ensure onLogin callback is not called
    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});
