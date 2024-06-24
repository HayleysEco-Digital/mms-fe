import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api, getEmployeeById, getHeader } from '../utils/ApiFunctions';

const CompanyDropdown = ({ onChange, value }) => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    console.log(value);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await api.get('/companies/all-companies', {
                headers: {
                    ...getHeader(),
                    "ngrok-skip-browser-warning": "69420",
                }
            });
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };


    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
        console.log(selectedCompany)
        onChange(event.target.value);
    };

    return (
        <div>
            <select className='form-control' required id="company" value={value} onChange={handleCompanyChange}>
                <option value="">Select Company</option>
                {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                ))}
            </select>
        </div>
    );
};

export default CompanyDropdown;
