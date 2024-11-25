import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example: clear the authentication token or any stored session data
    localStorage.removeItem('authToken'); // Remove auth token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        margin: '10px',
        padding: '8px 12px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
