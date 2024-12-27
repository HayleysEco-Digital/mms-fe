import React, { useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../utils/ApiFunctions";
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaTrashAlt } from "react-icons/fa";
import RoomPaginator from "../common/RoomPaginator"; // Ensure this path is correct
import { Modal, Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [confirmText, setConfirmText] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const result = await getAllOrders();
            console.log(result);
            const updatedResult = result.map(order => {
                if (order.orderDate) {
                    const orderDateArray = order.orderDate;
                    const formattedDate = `${orderDateArray[0]}-${orderDateArray[1].toString().padStart(2, '0')}-${orderDateArray[2].toString().padStart(2, '0')}`;
                    order.orderDate = formattedDate;
                }
                if (order.issueDate) {
                    const issueDateArray = order.issueDate;
                    const formattedDate = `${issueDateArray[0]}-${issueDateArray[1].toString().padStart(2, '0')}-${issueDateArray[2].toString().padStart(2, '0')}`;
                    order.issueDate = formattedDate;
                }
                if (order.mealId === 1) {
                    order.mealId = "Lunch";
                } else if (order.mealId === 2) {
                    order.mealId = "Breakfast";
                } else if (order.mealId === 3) {
                    order.mealId = "Dinner";
                }
                return { ...order };
            });
            setOrders(updatedResult);
            setFilteredOrders(updatedResult); // Initially, set filteredOrders to the full list
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true); // Open the modal
    };

    const handleConfirmDelete = async () => {
        if (confirmText === "DELETE") {
            try {
                const result = await deleteOrder(orderToDelete.empId, orderToDelete.mealId, orderToDelete.orderDate);
                if (result === "") {
                    toast.success(`Order for Emp No ${orderToDelete.empId} was successfully deleted!`);
                    fetchOrders(); // Refresh the orders list
                } else {
                    toast.error(`Error deleting order: ${result.message}`);
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        } else {
            toast.error("You must type 'DELETE' to confirm.");
        }
        setShowDeleteModal(false); // Close the modal after the action
        setConfirmText(""); // Reset the confirmation text
    };

    const handleSearch = () => {
        let filtered = orders;

        if (searchQuery) {
            filtered = filtered.filter(order =>
                order.empId.toString().includes(searchQuery.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(order =>
                new Date(order.orderDate) >= new Date(startDate)
            );
        }

        if (endDate) {
            filtered = filtered.filter(order =>
                new Date(order.orderDate) <= new Date(endDate)
            );
        }

        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleReset = () => {
        setSearchQuery("");
        setStartDate("");
        setEndDate("");
        setFilteredOrders(orders); // Reset to full order list
        setCurrentPage(1); // Reset to first page
    };

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const calculateTotalPages = (itemsPerPage, items) => {
        const totalItems = items.length;
        return Math.ceil(totalItems / itemsPerPage);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredOrders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "orders.xlsx");
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} /> {/* Toaster for notifications */}

            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading all orders</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>All Orders</h2>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    placeholder="Search by Emp No"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="form-control"
                                    style={{ width: "150px", marginRight: "10px" }}
                                />
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="form-control"
                                    style={{ width: "150px", marginRight: "10px" }}
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="form-control"
                                    style={{ width: "150px", marginRight: "10px" }}
                                />
                                <button onClick={handleSearch} className="btn btn-primary" style={{ marginRight: "10px" }}>Search</button>
                                <button onClick={handleReset} className="btn btn-secondary">Reset</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <CSVLink data={filteredOrders} filename={"orders.csv"} className="btn btn-success" style={{ marginRight: "5px" }}>Export to CSV</CSVLink>
                            <button onClick={exportToExcel} className="btn btn-success">Export to Excel</button>
                        </div>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>Emp No</th>
                                    <th>Meal Type</th>
                                    <th>Order Date</th>
                                    <th>Issue Date</th>
                                    <th>Meal Order Status</th>
                                    <th>Meal Issue Status</th>
                                    <th>Qty</th>
                                    <th>Payment Status</th>
                                    <th>Amount Paid</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order.empId + order.mealId + order.orderDate} className="text-center">
                                        <td>{order.empId}</td>
                                        <td>{order.mealId}</td>
                                        <td>{order.orderDate}</td>
                                        <td>{order.issueDate == null ? "NIL" : order.issueDate}</td>
                                        <td>{order.isMealRequested ? "Ordered" : "Not Ordered"}</td>
                                        <td>{order.isMealIssued ? "Issued" : "Not Issued"}</td>
                                        <td>{order.qty}</td>
                                        <td>
                                            {order.isHalfPaid
                                                ? order.mealID === 2
                                                    ? "Full Paid"
                                                    : "Half Paid"
                                                : "Not Paid"}
                                        </td>
                                        <td>{order.amountPaid}</td>
                                        <td className="gap-2">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteClick(order)} // Trigger delete confirmation
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
                            itemsPerPage={ordersPerPage}
                            totalItems={filteredOrders.length}
                            onPageChange={handlePaginationClick}
                        />
                    </section>

                    {/* Delete Confirmation Modal */}
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Type "DELETE" to confirm deletion of order for Emp No {orderToDelete?.empId}. Make sure to delete orders which is not passed the order cancellation cut-off time.</p>
                            <Form.Control
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="Type 'DELETE' to confirm"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
};

export default AllOrders;
