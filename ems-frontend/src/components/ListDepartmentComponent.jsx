// import React, { useEffect, useState } from 'react';
// import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
// import { Link, useNavigate } from 'react-router-dom';

// const ListDepartmentComponent = () => {
//   const [departments, setDepartments] = useState([]);

//   const navigator = useNavigate();

//   useEffect(() => {
//     listOfDepartment();
//   }, []);

//   // Function to fetch all departments
//   function listOfDepartment() {
//     getAllDepartments()
//       .then((response) => {
//         console.log(response.data);
//         setDepartments(response.data); // Set the departments state
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   // Function to navigate to the edit department page
//   function updateDepartment(id) {
//     navigator(`/edit-department/${id}`);
//   }

//   // Function to delete a department and update the list
//   function removeDepartment(id) {
//     deleteDepartment(id)
//       .then((response) => {
//         console.log(response.data);
//         // After deleting, refresh the department list
//         setDepartments((prevDepartments) => 
//           prevDepartments.filter((department) => department.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   return (
//     <div className="container">
//       <h2 className="text-center">List Of Departments</h2>
//       <Link to="/add-department" className="btn btn-primary mb-2">
//         Add Department
//       </Link>
//       <table className="table table-striped table-bordered table-hover">
//         <thead>
//           <tr>
//             <th>Department Id</th>
//             <th>Department Name</th>
//             <th>Department Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map((department) => (
//             <tr key={department.id}>
//               <td>{department.id}</td>
//               <td>{department.departmentName}</td>
//               <td>{department.departmentDescription}</td>
//               <td>
//                 <button
//                   onClick={() => updateDepartment(department.id)}
//                   className="btn btn-primary"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => removeDepartment(department.id)}
//                   className="btn btn-danger"
//                   style={{ marginLeft: '10px' }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListDepartmentComponent;
import React, { useEffect, useState } from 'react';
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listOfDepartment();
  }, []);

  // Function to fetch all departments
  function listOfDepartment() {
    getAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data); // Set the departments state
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Function to navigate to the edit department page
  function updateDepartment(id) {
    navigate(`/edit-department/${id}`);
  }

  // Function to delete a department and update the list
  function removeDepartment(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        // After deleting, refresh the department list
        setDepartments((prevDepartments) =>
          prevDepartments.filter((department) => department.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Logout handler
  const handleLogout = () => {
    // Perform any logout actions here (like clearing session tokens)
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="text-center">List Of Departments</h2>
        {/* Flex container for Add Department and Logout Button */}
        <div className="d-flex">
          <Link to="/add-department" className="btn btn-primary mb-2 me-2">
            Add Department
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-danger mb-2 me-2"
          >
            Logout
          </button>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  onClick={() => updateDepartment(department.id)}
                  className="btn btn-primary mb-2 me-2"
                >
                  Update
                </button>
                {/* Added margin-right for padding between buttons */}
                <button
                  onClick={() => removeDepartment(department.id)}
                  className="btn btn-danger mb-2 me-2" // 'ms-2' gives a left margin (spacing between buttons)
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
