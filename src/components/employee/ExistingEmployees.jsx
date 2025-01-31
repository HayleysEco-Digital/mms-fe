// import React, { useEffect, useState } from "react";
// import { deleteEmployee, getPaginatedEmployees } from "../utils/ApiFunctions";
// import { Col, Row, Modal, Button } from "react-bootstrap";
// import RoomPaginator from "../common/RoomPaginator";
// import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast"; // Import toast

// const ExistingEmployees = () => {
//     const [employees, setEmployees] = useState([]);
//     const [filteredEmployees, setFilteredEmployees] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [employeesPerPage] = useState(10);
//     const [isLoading, setIsLoading] = useState(false);

//     const [showConfirm, setShowConfirm] = useState(false);
//     const [empIdToDelete, setEmpIdToDelete] = useState(null);
//     const [confirmationText, setConfirmationText] = useState("");

//     useEffect(() => {
//         fetchEmployees(currentPage);
//     }, [currentPage]);

//     const fetchEmployees = async (currentPage = 1, pageSize = 10) => {
//         setIsLoading(true);
//         try {
// const result = await getPaginatedEmployees(currentPage, pageSize);
// const updatedResult = result.map((employee) => ({ ...employee }));
// setEmployees(updatedResult);
// setFilteredEmployees(updatedResult);
// setIsLoading(false);
//         } catch (error) {
//             toast.error(`Error fetching employees: ${error.message}`);
//             setIsLoading(false);
//         }
//     };

//     const handleDeleteClick = (empId) => {
//         setEmpIdToDelete(empId);
//         setShowConfirm(true);
//     };

//     const confirmDelete = async () => {
//         if (confirmationText !== "DELETE") {
//             toast.error("Please type DELETE to confirm.");
//             return;
//         }

//         try {
//             const result = await deleteEmployee(empIdToDelete);
//             if (result === "") {
//                 toast.success(`Employee ${empIdToDelete} was successfully deleted!`);
//                 fetchEmployees(currentPage);
//             } else {
//                 toast.error(`Error deleting Employee: ${result.message}`);
//             }
//             setShowConfirm(false);
//         } catch (error) {
//             toast.error(`Error: ${error.message}`);
//         } finally {
//             setConfirmationText("");
//         }
//     };

//     const handleSearch = (e) => {
//         const query = e.target.value;
//         setSearchQuery(query);

//         if (query === "") {
//             setFilteredEmployees(employees);
//         } else {
//             const filtered = employees.filter(employee =>
//                 employee.empNo.toString().toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredEmployees(filtered);
//         }
//         setCurrentPage(1);
//     };

//     const handlePaginationClick = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const calculateTotalPages = (itemsPerPage, items) => {
//         const totalItems = items.length;
//         return Math.ceil(totalItems / itemsPerPage);
//     };

//     const indexOfLastEmployee = currentPage * employeesPerPage;
//     const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//     const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//     return (
//         <>
//             <Toaster position="top-right" reverseOrder={false} />

//             {isLoading ? (
//                 <p>Loading existing employees...</p>
//             ) : (
//                 <>
//                     <section className="mt-5 mb-5 container">
//                         <div className="d-flex justify-content-between mb-3 mt-5">
//                             <h2>Existing Employees</h2>
//                             <input
//                                 type="text"
//                                 placeholder="Search by Emp No"
//                                 value={searchQuery}
//                                 onChange={handleSearch}
//                                 className="form-control"
//                                 style={{ width: "250px" }}
//                             />
//                         </div>

//                         <Row>
//                             <Col md={6} className="d-flex justify-content-start mb-2">
//                                 <Link to={"/add-employee"}>
//                                     <FaPlus /> Add Employee
//                                 </Link>
//                             </Col>
//                         </Row>

//                         <table className="table table-bordered table-hover">
//                             <thead>
//                                 <tr className="text-center">
//                                     <th>Emp No</th>
//                                     <th>First Name</th>
//                                     <th>Last Name</th>
//                                     <th>Type</th>
//                                     <th>Employee Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {employees.map((employee) => (
//                                     <tr key={employee.empNo} className="text-center">
//                                         <td>{employee.empNo}</td>
//                                         <td>{employee.empFirstName}</td>
//                                         <td>{employee.empLastName}</td>
//                                         <td>{employee.empType}</td>
//                                         <td>{employee.empStatus ? "Active" : "Inactive"}</td>
//                                         <td className="gap-2">
//                                             <Link to={`/edit-employee/${employee.empNo}`} className="gap-2">
//                                                 <span className="btn btn-info btn-sm">
//                                                     <FaEye />
//                                                 </span>
//                                                 <span className="btn btn-warning btn-sm ml-5">
//                                                     <FaEdit />
//                                                 </span>
//                                             </Link>
//                                             <button
//                                                 className="btn btn-danger btn-sm ml-5"
//                                                 onClick={() => handleDeleteClick(employee.empNo)}>
//                                                 <FaTrashAlt />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <RoomPaginator
//                             currentPage={currentPage}
//                             totalPages={calculateTotalPages(employeesPerPage, filteredEmployees)}
//                             onPageChange={handlePaginationClick}
//                         />
//                     </section>
//                 </>
//             )}

//             <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Deletion</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>To delete this employee, type 'DELETE' below and Confirm. NOTE that you cannot UNDO this operation!</p>
//                     <input
//                         type="text"
//                         value={confirmationText}
//                         onChange={(e) => setConfirmationText(e.target.value)}
//                         className="form-control"
//                         placeholder="Type DELETE to confirm"
//                     />
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowConfirm(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="danger" onClick={confirmDelete}>
//                         Confirm
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default ExistingEmployees;

import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployeeById, getPaginatedEmployees } from "../utils/ApiFunctions";
import { Col, Row, Modal, Button } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ExistingEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);
    const [empIdToDelete, setEmpIdToDelete] = useState(null);
    const [confirmationText, setConfirmationText] = useState("");

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    const fetchEmployees = async (currentPage, pageSize = 10) => {
        setIsLoading(true);
        try {
            const result = await getPaginatedEmployees(currentPage, pageSize);
            const updatedResult = result.map((employee) => ({ ...employee }));
            setEmployees(updatedResult);
            //setFilteredEmployees(updatedResult);
            setIsLoading(false);
        } catch (error) {
            toast.error(`Error fetching employees: ${error.message}`);
            setIsLoading(false);
        }
    };

    const loadSearchedEmployees = async (searchQuery) => {
        if (!searchQuery) {
            toast.error('Emp No is empty. Type the employee no and search again!!');
            return;
        }
        setIsLoading(true);
        try {
            const result = await getEmployeeById(searchQuery); // Call the API with the search query
            console.log(result);
            if (result) {
                // Check if the result is valid and map the response
                const updatedResult = Array.isArray(result)
                    ? result.map((employee) => ({ ...employee }))
                    : [result]; // Ensure it's an array for uniform handling
                setEmployees(updatedResult); // Update the employees state
                setIsLoading(false);
            }
        } catch (error) {
            if(error.message === "Employee number not found in the database"){
                toast.error('Employee number not found in the database');
                setIsLoading(false);
            }
            else{
                toast.error(`Error fetching employees: ${error.message}`);
                setIsLoading(false);
            }
            
        }
    }

    const handleDeleteClick = (empId) => {
        setEmpIdToDelete(empId);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (confirmationText !== "DELETE") {
            toast.error("Please type DELETE to confirm.");
            return;
        }

        try {
            const result = await deleteEmployee(empIdToDelete);
            if (result === "") {
                toast.success(`Employee ${empIdToDelete} was successfully deleted!`);
                fetchEmployees(currentPage); // Refresh current page after deletion
            } else {
                toast.error(`Error deleting Employee: ${result.message}`);
            }
            setShowConfirm(false);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setConfirmationText("");
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // setCurrentPage(1); // Reset to the first page when searching
        // fetchEmployees(1, query);
    };

    const handlePaginationClick = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
    };

    const handleBackPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage)); // Decrement, but not below 1
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            {isLoading ? (
                <p>Loading existing employees...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Employees</h2>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    placeholder="Search by Emp No"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="form-control"
                                    style={{ width: "250px" }}
                                />
                                <button type="button" className="btn btn-primary" onClick={() => loadSearchedEmployees(searchQuery)}>
                                    Search
                                </button>
                                <button type="button" className="btn btn-outline-primary" onClick={() => fetchEmployees(1,10)}>
                                    Reset
                                </button>
                            </div>

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
                                {employees.map((employee) => (
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
                                                onClick={() => handleDeleteClick(employee.empNo)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            onNext={handleNextPage}
                            onBack={handleBackPage}
                        />
                    </section>
                </>
            )}

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>To delete this employee, type 'DELETE' below and Confirm. NOTE that you cannot UNDO this operation!</p>
                    <input
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="form-control"
                        placeholder="Type DELETE to confirm"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExistingEmployees;
