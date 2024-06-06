import React, { useState } from 'react';
import { getMealsByDateRange } from '../utils/ApiFunctions';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const MealsByDateRange = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employeeNo, setEmployeeNo] = useState('');
    const [mealData, setMealData] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await getMealsByDateRange(startDate, endDate);
            setMealData(response);
            setIsDataFetched(true);
            console.log(response);
        } catch (error) {
            console.error('Error fetching meal data', error);
            setIsDataFetched(true);
        }
    };

    const filterData = () => {
        return mealData.filter(([empId]) => 
            employeeNo ? empId.toString().includes(employeeNo) : true
        );
    };

    const exportToExcel = () => {
        const filteredData = filterData();
        const worksheet = XLSX.utils.json_to_sheet(filteredData.map(([empId, empName, mealId, totalOrdered, totalIssued, halfPaidMeals, creditIssuedMeals]) => ({
            'Employee No': empId,
            'Employee Name': empName,
            'Meal Type': mealId === 1 ? 'Lunch' : mealId === 2 ? 'Breakfast' : mealId === 3 ? 'Dinner' : 'Unknown Meal',
            'Total Meals Ordered': totalOrdered,
            'Total Meals Issued': totalIssued,
            'Half Paid Meals': halfPaidMeals,
            'Credit Issued Meals': creditIssuedMeals
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Meals Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'meals_data.xlsx');
    };

    const csvHeaders = [
        { label: 'Employee No', key: 'empId' },
        { label: 'Employee Name', key: 'empName' },
        { label: 'Meal Type', key: 'mealType' },
        { label: 'Total Meals Ordered', key: 'totalOrdered' },
        { label: 'Total Meals Issued', key: 'totalIssued' },
        { label: 'Half Paid Meals', key: 'halfPaidMeals' },
        { label: 'Credit Issued Meals', key: 'creditIssuedMeals' }
    ];

    const csvData = filterData().map(([empId, empName, mealId, totalOrdered, totalIssued, halfPaidMeals, creditIssuedMeals]) => ({
        empId,
        empName,
        mealType: mealId === 1 ? 'Lunch' : mealId === 2 ? 'Breakfast' : mealId === 3 ? 'Dinner' : 'Unknown Meal',
        totalOrdered,
        totalIssued,
        halfPaidMeals,
        creditIssuedMeals
    }));

    return (
        <div className="container mt-5">
            <h2>Meals Ordered and Issued By Date Range</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="startDate" className="col-form-label">Start Date:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="date"
                            id="startDate"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="endDate" className="col-form-label">End Date:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="date"
                            id="endDate"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="employeeNo" className="col-form-label">Employee No:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            id="employeeNo"
                            className="form-control"
                            value={employeeNo}
                            onChange={(e) => setEmployeeNo(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Get Meals Data</button>
                    </div>
                </div>
            </form>

            {isDataFetched && mealData.length === 0 ? (
                <div className="alert alert-info">No meals data found for the selected date range.</div>
            ) : (
                <>
                    <div className="mb-3">
                        <button onClick={exportToExcel} className="btn btn-success mr-2">Export to Excel</button>
                        <CSVLink data={csvData} headers={csvHeaders} filename={"meals_data.csv"} className="btn btn-primary">
                            Export to CSV
                        </CSVLink>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Employee No</th>
                                <th>Employee Name</th>
                                <th>Meal Type</th>
                                <th>Total Meals Ordered</th>
                                <th>Total Meals Issued</th>
                                <th>Half Paid Meals</th>
                                <th>Credit Issued Meals</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData().map(([empId, empName, mealId, totalOrdered, totalIssued, halfPaidMeals, creditIssuedMeals], index) => (
                                <tr key={index}>
                                    <td>{empId}</td>
                                    <td>{empName}</td>
                                    <td>{mealId === 1 ? "Lunch" : mealId === 2 ? "Breakfast" : mealId === 3 ? "Dinner" : "Unknown Meal"}</td>
                                    <td>{totalOrdered}</td>
                                    <td>{totalIssued}</td>
                                    <td>{halfPaidMeals}</td>
                                    <td>{creditIssuedMeals}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default MealsByDateRange;
