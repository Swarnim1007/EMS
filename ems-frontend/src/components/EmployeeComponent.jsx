import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee, getAllDepartments } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: '',
        birthdate: '',
        city: '',
        state: '',
        pincode: '',
        emergencyContact: '',
        employmentType: '',
        startDate: '',
        department: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                const data = response.data;
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setGender(data.gender);
                setPhoneNumber(data.phoneNumber);
                setBirthdate(data.birthdate);
                setCity(data.city);
                setState(data.state);
                setPincode(data.pincode);
                setEmergencyContact(data.emergencyContact);
                setEmploymentType(data.employmentType);
                setStartDate(data.startDate);
                setDepartmentId(data.departmentId);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = {
                firstName, lastName, email, gender, phoneNumber, birthdate, city,
                state, pincode, emergencyContact, employmentType, startDate, departmentId
            };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employee');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employee');
                }).catch(errors => {
                    console.error(errors);
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;
        const pincodePattern = /^[0-9]{6}$/;

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is Required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is Required';
            valid = false;
        }

        if (email.trim()) {
            if (emailPattern.test(email)) {
                errorsCopy.email = '';
            } else {
                errorsCopy.email = 'Email must contain "@" and "."';
                valid = false;
            }
        } else {
            errorsCopy.email = 'Email is Required';
            valid = false;
        }

        if (gender) {
            errorsCopy.gender = '';
        } else {
            errorsCopy.gender = 'Gender is Required';
            valid = false;
        }

        if (phoneNumber.trim()) {
            if (phonePattern.test(phoneNumber)) {
                errorsCopy.phoneNumber = '';
            } else {
                errorsCopy.phoneNumber = 'Phone Number must be 10 digits';
                valid = false;
            }
        } else {
            errorsCopy.phoneNumber = 'Phone Number is Required';
            valid = false;
        }

        if (birthdate) {
            errorsCopy.birthdate = '';
        } else {
            errorsCopy.birthdate = 'Birthdate is Required';
            valid = false;
        }

        if (city.trim()) {
            errorsCopy.city = '';
        } else {
            errorsCopy.city = 'City is Required';
            valid = false;
        }

        if (state.trim()) {
            errorsCopy.state = '';
        } else {
            errorsCopy.state = 'State is Required';
            valid = false;
        }

        if (pincode.trim()) {
            if (pincodePattern.test(pincode)) {
                errorsCopy.pincode = '';
            } else {
                errorsCopy.pincode = 'Pincode must be 6 digits';
                valid = false;
            }
        } else {
            errorsCopy.pincode = 'Pincode is Required';
            valid = false;
        }

        if (emergencyContact.trim()) {
            if (phonePattern.test(emergencyContact)) {
                errorsCopy.emergencyContact = '';
            } else {
                errorsCopy.emergencyContact = 'Emergency Contact must be 10 digits';
                valid = false;
            }
        } else {
            errorsCopy.emergencyContact = 'Emergency Contact is Required';
            valid = false;
        }

        if (employmentType.trim()) {
            errorsCopy.employmentType = '';
        } else {
            errorsCopy.employmentType = 'Employment Type is Required';
            valid = false;
        }

        if (startDate) {
            errorsCopy.startDate = '';
        } else {
            errorsCopy.startDate = 'Start Date is Required';
            valid = false;
        }

        if (departmentId) {
            errorsCopy.department = '';
        } else {
            errorsCopy.department = 'Department is Required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center'> Update Employees </h2>;
        } else {
            return <h2 className='text-center'> Add Employees </h2>;
        }
    };

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setFirstName)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setLastName)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input
                                    type='text'
                                    placeholder='Enter Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setEmail)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Gender</label>
                                <select
                                    data-testid="gender-select"
                                    className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                                    value={gender}
                                    onChange={(e) => handleChange(e, setGender)}
                                >
                                    <option value=''>Select Gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Other'>Other</option>
                                </select>
                                {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Phone Number</label>
                                <input
                                    type='text'
                                    placeholder='Enter Phone Number'
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setPhoneNumber)}
                                />
                                {errors.phoneNumber && <div className='invalid-feedback'>{errors.phoneNumber}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Birthdate</label>
                                <input
                                    data-testid="Birthdate"
                                    type='date'
                                    name='birthdate'
                                    value={birthdate}
                                    className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setBirthdate)}
                                />
                                {errors.birthdate && <div className='invalid-feedback'>{errors.birthdate}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>City</label>
                                <input
                                    type='text'
                                    placeholder='Enter City'
                                    name='city'
                                    value={city}
                                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setCity)}
                                />
                                {errors.city && <div className='invalid-feedback'>{errors.city}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>State</label>
                                <input
                                    type='text'
                                    placeholder='Enter State'
                                    name='state'
                                    value={state}
                                    className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setState)}
                                />
                                {errors.state && <div className='invalid-feedback'>{errors.state}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Pincode</label>
                                <input
                                    type='text'
                                    placeholder='Enter Pincode'
                                    name='pincode'
                                    value={pincode}
                                    className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setPincode)}
                                />
                                {errors.pincode && <div className='invalid-feedback'>{errors.pincode}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Emergency Contact Number</label>
                                <input
                                    type='text'
                                    placeholder='Enter Emergency Contact Number'
                                    name='emergencyContact'
                                    value={emergencyContact}
                                    className={`form-control ${errors.emergencyContact ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setEmergencyContact)}
                                />
                                {errors.emergencyContact && <div className='invalid-feedback'>{errors.emergencyContact}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Employment Type</label>
                                <select
                                    data-testid="Employment Type"
                                    className={`form-control ${errors.employmentType ? 'is-invalid' : ''}`}
                                    value={employmentType}
                                    onChange={(e) => handleChange(e, setEmploymentType)}
                                >
                                    <option value=''>Select Employment Type</option>
                                    <option value='Full-Time'>Full-Time</option>
                                    <option value='Part-Time'>Part-Time</option>
                                    <option value='Contract'>Contract</option>
                                </select>
                                {errors.employmentType && <div className='invalid-feedback'>{errors.employmentType}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Start Date (Month and Year)</label>
                                <input
                                    data-testid='Start Date (Month and Year)'
                                    type='month'
                                    name='startDate'
                                    value={startDate}
                                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleChange(e, setStartDate)}
                                />
                                {errors.startDate && <div className='invalid-feedback'>{errors.startDate}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Select Department</label>
                                <select
                                    data-testid="department-select" 
                                    id="department-select"  
                                    className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value=''>Select Department</option>
                                    {departments.map(department =>
                                        <option key={department.id} value={department.id}>
                                            {department.departmentName}
                                        </option>
                                    )}
                                </select>
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                            </div>

                            <button type="submit" className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
