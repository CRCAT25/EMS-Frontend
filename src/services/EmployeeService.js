import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => axios.get(`${REST_API_BASE_URL}/GetAllEmployees`);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployeeById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateEmployee = (employee) => axios.put(REST_API_BASE_URL, employee);

export const deleteEmployee = (id) => axios.delete(`${REST_API_BASE_URL}/DeleteEmployee`, { data: { id } });