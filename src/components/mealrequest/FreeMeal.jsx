import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RequestMeal.css';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { getCompanyById, getDepartmentById, getUser } from '../utils/ApiFunctions';
import CompanyDropdown from "../common/CompanyDropDown"
import DeptDropdown from "../common/DeptDropDown"
import DivDropdown from "../common/DivDropDown"
import ContDropdown from "../common/ContDropDown"

const FreeMeal = () => {
    const [orderDate, setOrderDate] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [mealList, setMealList] = useState([]);
    const [requesterName, setRequesterName] = useState('');
    const [company, setCompany] = useState('');
    const [department, setDepartment] = useState('');
    const [approver, setApprover] = useState('');
    const [empName, setEmpName] = useState('');

    const [newFreeMeal, setNewFreeMeal] = useState({
        empNo: "",
        empName: "",
        requestedDate: "",
        orderDate: "",
        empCompany: "",
        empDepartment: "",
        mealType: "",
        mealQty: 0,
        approver: '',
        approvedDate: null,
        status: 'Pending'
    })

    const mealOptions = [
        { id: 'breakfast', name: 'Breakfast' },
        { id: 'lunch', name: 'Lunch' },
        { id: 'dinner', name: 'Dinner' },
    ];

    const companyOptions = ['Company A', 'Company B', 'Company C'];
    const departmentOptions = ['Department A', 'Department B', 'Department C'];

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const curDate = `${year}-${month}-${day}`;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token)
                console.log(userData);
                setEmpName(userData.firstName + " " + userData.lastName);
                setNewFreeMeal({ ...newFreeMeal, empName: userData.firstName + " " + userData.lastName, empNo: userData.empNo, requestedDate: curDate });
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    }, [userId])

    const handleDateChange = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const orderDate = `${year}-${month}-${day}`;
        setOrderDate(orderDate);
        setNewFreeMeal({ ...newFreeMeal, orderDate: orderDate })
        console.log(orderDate);
    };

    const handleMealChange = (e) => {
        setSelectedMeal(e.target.value);
    };

    const handleQuantityChange = (e) => {
        const qty = e.target.value;
        setQuantity(parseInt(qty));
    };

    const handleCompanyChange = async (companyId) => {
        setCompany(companyId);
        //console.log(selectedCompany);
        console.log(companyId);

        const result = await getCompanyById(companyId);
        //console.log(result.name);
        setNewFreeMeal({ ...newFreeMeal, empCompany: result.name });
        // Do something with the selected company ID
        console.log(newFreeMeal);
    };

    const handleDepartmentChange = async (departmentId) => {
        setDepartment(departmentId);
        //console.log(selectedDepartment);
        console.log(departmentId);
        const result = await getDepartmentById(departmentId);
        setNewFreeMeal({ ...newFreeMeal, empDepartment: result.name });
        // Do something with the selected company ID
        //console.log(newEmployee);
    };

    const handleApproverChange = (e) => {
        setNewFreeMeal({ ...newFreeMeal, approver: e.target.value });
        // Do something with the selected company ID
        //console.log(newEmployee);
    };

    // const handleDivisionChange = (divisionId) => {
    //     setSelectedDivision(divisionId);
    //     console.log(selectedDivision);
    //     console.log(divisionId);
    //     setNewEmployee({ ...newEmployee, empDivision: divisionId });
    //     // Do something with the selected company ID
    //     console.log(newEmployee);
    // };

    const handleAddMeal = () => {
        if (selectedMeal && quantity > 0) {
            const mealName = mealOptions.find(meal => meal.id === selectedMeal).name;
            const newMeal = { meal: selectedMeal, mealName, quantity };
            setMealList([...mealList, newMeal]);
            setSelectedMeal('');
            setQuantity(1);
            console.log(mealList);
        } else {
            toast.error('Please select a meal and enter a valid quantity.');
        }
    };

    const handleDeleteMeal = (index) => {
        const updatedMealList = mealList.filter((_, i) => i !== index);
        setMealList(updatedMealList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!orderDate) {
            toast.error('Please select a valid date.');
            return;
        }

        const mealRequests = mealList.map(mealItem => ({
            ...newFreeMeal,
            mealType: mealItem.mealName,
            mealQty: mealItem.quantity
        }));


        console.log(mealRequests);






        setNewFreeMeal({ ...newFreeMeal, requestedDate: curDate })

        console.log(newFreeMeal);

        console.log(mealList);
        // Add your API call here to submit the meal requests

        toast.success('Meal requests submitted successfully.');
    };

    return (
        <div className="container2 mt-3 mb-5">
            <Toaster />
            <h2 className="mb-2">Request Free Meals</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Requester Name</label>
                    <input
                        disabled
                        type="text"
                        className="form-control"
                        value={newFreeMeal.empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Meal Requesting Date</label>
                    <DatePicker
                        selected={orderDate}
                        onChange={handleDateChange}
                        className="form-control datepicker"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company</label>
                    <CompanyDropdown
                        required
                        className="form-control"
                        id="empCompany"
                        name="empCompany"
                        value={newFreeMeal.companyId}
                        onChange={handleCompanyChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <DeptDropdown
                        required
                        className="form-control"
                        id="empDepartment"
                        name="empDepartment"
                        value={newFreeMeal.departmentId}
                        onChange={handleDepartmentChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Approver</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newFreeMeal.approver}
                        onChange={handleApproverChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Meal</label>
                    <div className="d-flex">
                        <select
                            className="form-control me-2"
                            value={selectedMeal}
                            onChange={handleMealChange}

                        >
                            <option value="">Select Meal</option>
                            {mealOptions.map((meal) => (
                                <option key={meal.id} value={meal.id}>
                                    {meal.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            className="form-control me-2"
                            value={quantity}
                            onChange={handleQuantityChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleAddMeal}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mealList.map((meal, index) => (
                            <tr key={index}>
                                <td>{meal.mealName}</td>
                                <td>{meal.quantity}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteMeal(index)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary">
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default FreeMeal;
