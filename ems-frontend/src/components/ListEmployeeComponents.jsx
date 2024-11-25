// import React, { useEffect, useState, useCallback } from 'react';
// import { deleteEmployee, listEmployees } from '../services/EmployeeService';
// import { useNavigate } from 'react-router-dom';

// const ListEmployeeComponents = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true); // New loading state
//   const navigator = useNavigate();

//   useEffect(() => {
//     getAllEmployees();
//   }, []);

//   // Fetch all employees
//   const getAllEmployees = useCallback(() => {
//     setLoading(true); // Start loading
//     listEmployees()
//       .then((response) => {
//         setEmployees(response.data);
//         setLoading(false); // Done loading
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false); // Done loading
//         alert('Failed to load employees');
//       });
//   }, []);

//   // Add a new employee
//   const addNewEmployee = useCallback(() => {
//     navigator('/add-employee');
//   }, [navigator]);

//   // Update an employee
//   const updateEmployee = useCallback((id) => {
//     navigator(`/edit-employee/${id}`);
//   }, [navigator]);

//   // Remove an employee
//   const removeEmployee = useCallback((id) => {
//     deleteEmployee(id)
//       .then(() => {
//         getAllEmployees(); // Refresh the list after deletion
//       })
//       .catch((error) => {
//         console.error(error);
//         alert('Failed to delete employee');
//       });
//   }, [getAllEmployees]);

//   return (
//     <div className="container">
//       <h2 className="text-center">List Of Employees</h2>
//       <button className="btn btn-primary mb-3" onClick={addNewEmployee}>
//         Add Employee
//       </button>

//       {loading ? (
//         <p>Loading...</p> // Show loading message when fetching data
//       ) : employees.length === 0 ? (
//         <p>No employees found</p> // Show message if no employees
//       ) : (
//         <table className="table table-striped table-bordered table-hover">
//           <thead>
//             <tr>
//               <th>Employee_id</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.id}>
//                 <td>{employee.id}</td>
//                 <td>{employee.firstName}</td>
//                 <td>{employee.lastName}</td>
//                 <td>{employee.email}</td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => updateEmployee(employee.id)}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => removeEmployee(employee.id)}
//                     style={{ marginLeft: '10px' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ListEmployeeComponents;
import React, { useEffect, useState, useCallback } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponents = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  // Fetch all employees
  const getAllEmployees = useCallback(() => {
    setLoading(true); // Start loading
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false); // Done loading
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Done loading
        alert('Failed to load employees');
      });
  }, []);

  // Add a new employee
  const addNewEmployee = useCallback(() => {
    navigator('/add-employee');
  }, [navigator]);

  // Update an employee
  const updateEmployee = useCallback((id) => {
    navigator(`/edit-employee/${id}`);
  }, [navigator]);

  // Remove an employee
  const removeEmployee = useCallback((id) => {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to delete employee');
      });
  }, [getAllEmployees]);

  // Logout handler
  const handleLogout = () => {
    // Perform any logout actions here (like clearing session tokens)
    // Redirect to the login page
    navigator('/login');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="text-center">List Of Employees</h2>
        {/* Flex container for Add Employee and Logout Button */}
        <div className="d-flex">
          <button
            className="btn btn-primary mb-3 me-2"
            onClick={addNewEmployee}
          >
            Add Employee
          </button>
          <button
            className="btn btn-danger mb-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p> // Show loading message when fetching data
      ) : employees.length === 0 ? (
        <p>No employees found</p> // Show message if no employees
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Employee_id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    className="btn btn-primary mb-2 me-2"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger mb-2 me-2"
                    onClick={() => removeEmployee(employee.id)}
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListEmployeeComponents;

