import React, { useState, useEffect } from 'react';
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import '@testing-library/jest-dom'; //Problem here//

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const { id } = useParams(); // Retrieves the id from the URL params (for edit)

  const navigate = useNavigate();

  useEffect(() => {
    // Only call getDepartmentById if an id exists (for editing)
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateDepartment = (e) => {
    e.preventDefault();

    const department = { departmentName, departmentDescription };

    if (id) {
      updateDepartment(id, department)
        .then((response) => {
          console.log(response.data);
          navigate('/departments');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createDepartment(department)
        .then((response) => {
          navigate('/departments');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className='text-center'>Update Department</h2>;
    } else {
      return <h2 className='text-center'>Add Department</h2>;
    }
  };

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form onSubmit={saveOrUpdateDepartment}> {/* Updated to use onSubmit */}
              <div className='form-group mb-2'>
                <label className='form-label' htmlFor='departmentName'>Department Name:</label>
                <input
                  type='text'
                  id='departmentName'
                  name='departmentName'
                  placeholder='Enter Department Name'
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className='form-control'
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label' htmlFor='departmentDescription'>Department Description:</label>
                <input
                  type='text'
                  id='departmentDescription'
                  name='departmentDescription'
                  placeholder='Enter Department Description'
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className='form-control'
                />
              </div>
              <button className='btn btn-success mb-2' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;

