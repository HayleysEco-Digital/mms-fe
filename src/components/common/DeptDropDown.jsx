import React, { useState, useEffect } from 'react';
import { api, getHeader } from '../utils/ApiFunctions';

const DeptDropdown = ({ onChange, value }) => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    console.log(value);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await api.get('/departments/all-departments', {
                headers: getHeader()
            });
            setDepartments(response.data);
            console.log(departments)
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };


    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        console.log(selectedDepartment)
        onChange(event.target.value);
    };

    return (
        <div>
            <select className='form-control' required id="department" value={value} onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                {departments.map(department => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                ))}
            </select>
        </div>
    );
};

export default DeptDropdown;
