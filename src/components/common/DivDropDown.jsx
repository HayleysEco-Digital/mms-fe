import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api, getEmployeeById, getHeader } from '../utils/ApiFunctions';

const DivDropdown = ({ onChange, value }) => {
    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    console.log(value);

    useEffect(() => {
        fetchDivisions();
    }, []);

    const fetchDivisions = async () => {
        try {
            const response = await api.get('/divisions/all-divisions', {
                headers: getHeader()
            });
            setDivisions(response.data);
        } catch (error) {
            console.error('Error fetching divisions:', error);
        }
    };


    const handleDivisionChange = (event) => {
        setSelectedDivision(event.target.value);
        console.log(selectedDivision)
        onChange(event.target.value);
    };

    return (
        <div>
            <select className='form-control' required id="division" value={value} onChange={handleDivisionChange}>
                <option value="">Select Division/Section</option>
                {divisions.map(division => (
                    <option key={division.id} value={division.id}>{division.name}</option>
                ))}
            </select>
        </div>
    );
};

export default DivDropdown;
