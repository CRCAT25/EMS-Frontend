import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch((error) => {
            console.error("Error fetching employee data", error);
        })
    })

    function addNewEmployee() {
        navigator('/add-employee');
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Last Name</th>
                        <th>Fisrt Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent
