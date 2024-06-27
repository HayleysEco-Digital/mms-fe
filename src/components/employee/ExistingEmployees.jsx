import React, { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const result = await getAllEmployees();
			console.log(result);
            const updatedResult = result.map(employee => ({
                ...employee
            }));
            setEmployees(updatedResult);
            setFilteredEmployees(updatedResult); // Initially, set filteredEmployees to the full list
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const handleDelete = async (empId) => {
        try {
            const result = await deleteEmployee(empId);
            if (result === "") {
                setSuccessMessage(`Employee ${empId} was deleted`);
                fetchEmployees();
            } else {
                console.error(`Error deleting Employee : ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
	
		if (query === "") {
			setFilteredEmployees(employees);
			//console.log(employees);
		} else {
			const filtered = employees.filter(employee =>
				employee.empNo.toString().toLowerCase().includes(query.toLowerCase())
			);
			setFilteredEmployees(filtered);
		}
		setCurrentPage(1); // Reset to first page on new search
	};
	

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const calculateTotalPages = (itemsPerPage, items) => {
        const totalItems = items.length;
        return Math.ceil(totalItems / itemsPerPage);
    };

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading existing employees</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Employees</h2>
                            <input
                                type="text"
                                placeholder="Search by Emp No"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="form-control"
                                style={{ width: "250px" }}
                            />
                        </div>

                        <Row>
                            <Col md={6} className="d-flex justify-content-start mb-2">
                                <Link to={"/add-employee"}>
                                    <FaPlus /> Add Employee
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>Emp No</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Type</th>
                                    <th>Employee Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((employee) => (
                                    <tr key={employee.empNo} className="text-center">
                                        <td>{employee.empNo}</td>
                                        <td>{employee.empFirstName}</td>
                                        <td>{employee.empLastName}</td>
                                        <td>{employee.empType}</td>
                                        <td>{employee.empStatus ? "Active" : "Inactive"}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-employee/${employee.empNo}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDelete(employee.empNo)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(employeesPerPage, filteredEmployees)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingEmployees;
