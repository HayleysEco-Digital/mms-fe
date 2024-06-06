import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api, getEmployeeById, getHeader } from '../utils/ApiFunctions';

const ContDropdown = ({ onChange, value }) => {
    const [contractors, setContractors] = useState([]);
    const [selectedContractor, setSelectedContractor] = useState('');
    console.log(value);

    useEffect(() => {
        fetchContractors();
    }, []);

    const fetchContractors = async () => {
        try {
            const response = await api.get('/contractors/all-contractors', {
                headers: getHeader()
            });
            setContractors(response.data);
        } catch (error) {
            console.error('Error fetching contractors:', error);
        }
    };


    const handleContractorChange = (event) => {
        setSelectedContractor(event.target.value);
        console.log(selectedContractor)
        onChange(event.target.value);
    };

    return (
        <div>
            <select className='form-control' required id="contractor" value={value} onChange={handleContractorChange}>
                <option value="">Select Contractor</option>
                {contractors.map(contractor => (
                    <option key={contractor.id} value={contractor.id}>{contractor.name}</option>
                ))}
            </select>
        </div>
    );
};

export default ContDropdown;
