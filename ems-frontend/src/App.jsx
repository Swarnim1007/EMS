import './App.css';
import { useState } from 'react';
import DepartmentComponent from './components/DepartmentComponent';
import EmployeeComponent from './components/EmployeeComponent';
import { FooterComponent } from './components/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent';
import ListDepartmentComponent from './components/ListDepartmentComponent';
import ListEmployeeComponents from './components/ListEmployeeComponents';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login - called by LoginPage component
  const handleLogin = (isValid) => {
    setIsAuthenticated(isValid);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Protected Route component to guard private pages
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {/* Ensure the Header is visible, regardless of authentication status */}
      <HeaderComponent isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          {/* Public route for login */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={<PrivateRoute element={<ListEmployeeComponents />} />}
          />
          <Route
            path="/employee"
            element={<PrivateRoute element={<ListEmployeeComponents />} />}
          />
          <Route
            path="/add-employee"
            element={<PrivateRoute element={<EmployeeComponent />} />}
          />
          <Route
            path="/edit-employee/:id"
            element={<PrivateRoute element={<EmployeeComponent />} />}
          />
          <Route
            path="/departments"
            element={<PrivateRoute element={<ListDepartmentComponent />} />}
          />
          <Route
            path="/add-department"
            element={<PrivateRoute element={<DepartmentComponent />} />}
          />
          <Route
            path="/edit-department/:id"
            element={<PrivateRoute element={<DepartmentComponent />} />}
          />
        </Routes>
      </div>
      {/* Ensure the Footer is visible, regardless of authentication status */}
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
