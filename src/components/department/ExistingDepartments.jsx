import React, { useEffect, useState } from "react";
import { deleteDepartment, getAllDepartments } from "../utils/ApiFunctions";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ExistingDepartments = () => {
    const [departments, setDepartments] = useState([{ id: "", name: "" }]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);
    const [confirmText, setConfirmText] = useState("");

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setIsLoading(true);
        try {
            const result = await getAllDepartments();
            setDepartments(result);
            setIsLoading(false);
        } catch (error) {
            toast.error(`Error fetching departments: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (departmentId) => {
        setDepartmentToDelete(departmentId);
        setShowDeleteModal(true); // Open the modal
    };

    const handleConfirmDelete = async () => {
        if (confirmText === "DELETE") {
            try {
                const result = await deleteDepartment(departmentToDelete);
                if (result === "") {
                    toast.success(`Department No ${departmentToDelete} was successfully deleted!`);
                    fetchDepartments(); // Refresh the departments list
                } else {
                    toast.error(`Error deleting department: ${result.message}`);
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

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} /> {/* Toaster for notifications */}

            {isLoading ? (
                <p>Loading existing departments...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Departments</h2>
                        </div>

                        <Row>
                            <Col md={12} className="d-flex justify-content-end">
                                <Link to={"/add-department"}>
                                    <FaPlus /> Add Department
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Department Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {departments.map((department) => (
                                    <tr key={department.id} className="text-center">
                                        <td>{department.id}</td>
                                        <td>{department.name}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-department/${department.id}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDeleteClick(department.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete Department No {departmentToDelete}?</p>
                    <p>
                        Type <strong>DELETE</strong> to confirm.
                    </p>
                    <Form.Control
                        type="text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder="Type DELETE to confirm"
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
    );
};

export default ExistingDepartments;
