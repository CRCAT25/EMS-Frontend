import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    function addEmployee() {
        const employee = { firstName, lastName, email };

        createEmployee(employee).then((response) => {
            console.log("Employee added successfully", response.data);
            navigate('/employees');
        }
        ).catch((error) => {
            console.error("Error adding employee", error);
        })

        // Reset the form fields after submission
        setFirstName('');
        setLastName('');
        setEmail('');
    }

    function editEmployee() {
        const employee = { id, firstName, lastName, email };

        updateEmployee(employee).then((response) => {
            console.log("Employee updated successfully", response.data);
            navigate('/employees');
        }
        ).catch((error) => {
            console.error("Error updating employee", error);
        })

        // Reset the form fields after submission
        setFirstName('');
        setLastName('');
        setEmail('');
    }

    function validateForm() {
        let isValid = true;
        const errors = {
            firstName: '',
            lastName: '',
            email: ''
        };

        if (!firstName.trim()) {
            errors.firstName = 'First name is required';
            isValid = false;
        }
        if (!lastName.trim()) {
            errors.lastName = 'Last name is required';
            isValid = false;
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        }

        setError(errors);
        return isValid;
    }

    // Subemit form
    function handleSubmit(e) {
        e.preventDefault();

        if (validateForm()) {
            if(!id){
                addEmployee();
            }
            else{
                editEmployee();
            }
        }
    }

    function getTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>;
        } else {
            return <h2 className='text-center'>Add Employee</h2>;
        }
    }

    function backToList() {
        navigate('/employees');
    }

    useEffect(() => {
        if (id) {
            // Fetch employee data by ID and set it to state
            getEmployeeById(id).then((response) => {
                const employee = response.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmail(employee.email);
            }).catch((error) => {
                console.error("Error fetching employee data", error);
            });
        }
    }, [id]);

    return (
        <div className='container'>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {getTitle()}
                    <form>
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">First Name:</label>
                            <input
                                type="text"
                                className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                placeholder='Enter first name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                name='firstName'
                            />
                            {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                placeholder='Enter last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                name='lastName'
                            />
                            {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Email:</label>
                            <input
                                type="text"
                                className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                            />
                            {error.email && <div className="invalid-feedback">{error.email}</div>}
                        </div>

                        <div className="container">
                            <div className="row">
                                <button className='btn btn-success mb-1' type='submit' onClick={handleSubmit}>Save</button>
                                <button className="btn btn-secondary mb-2" onClick={backToList}>Back to list</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent
