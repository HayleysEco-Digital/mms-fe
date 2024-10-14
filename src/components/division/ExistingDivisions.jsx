import React, { useEffect, useState } from "react";
import { deleteDivision, getAllDivisions } from "../utils/ApiFunctions";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ExistingDivisions = () => {
    const [divisions, setDivisions] = useState([{ id: "", name: "" }]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [divisionToDelete, setDivisionToDelete] = useState(null);
    const [confirmText, setConfirmText] = useState("");

    useEffect(() => {
        fetchDivisions();
    }, []);

    const fetchDivisions = async () => {
        setIsLoading(true);
        try {
            const result = await getAllDivisions();
            setDivisions(result);
            setIsLoading(false);
        } catch (error) {
            toast.error(`Error fetching divisions: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (divisionId) => {
        setDivisionToDelete(divisionId);
        setShowDeleteModal(true); // Open the modal
    };

    const handleConfirmDelete = async () => {
        if (confirmText === "DELETE") {
            try {
                const result = await deleteDivision(divisionToDelete);
                if (result === "") {
                    toast.success(`Division No ${divisionToDelete} was successfully deleted!`);
                    fetchDivisions(); // Refresh the divisions list
                } else {
                    toast.error(`Error deleting division: ${result.message}`);
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
                <p>Loading existing divisions...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Divisions</h2>
                        </div>

                        <Row>
                            <Col md={12} className="d-flex justify-content-end">
                                <Link to={"/add-division"}>
                                    <FaPlus /> Add Division
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Division Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {divisions.map((division) => (
                                    <tr key={division.id} className="text-center">
                                        <td>{division.id}</td>
                                        <td>{division.name}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-division/${division.id}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDeleteClick(division.id)}
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
                    <p>Are you sure you want to delete Division No {divisionToDelete}?</p>
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

export default ExistingDivisions;
