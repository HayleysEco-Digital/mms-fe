import React, { useEffect, useState } from "react";
import { deleteContractor, getAllContractors } from "../utils/ApiFunctions";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ExistingContractors = () => {
    const [contractors, setContractors] = useState([{ id: "", name: "" }]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contractorToDelete, setContractorToDelete] = useState(null);
    const [confirmText, setConfirmText] = useState("");

    useEffect(() => {
        fetchContractors();
    }, []);

    const fetchContractors = async () => {
        setIsLoading(true);
        try {
            const result = await getAllContractors();
            setContractors(result);
            setIsLoading(false);
        } catch (error) {
            toast.error(`Error fetching contractors: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (contractorId) => {
        setContractorToDelete(contractorId);
        setShowDeleteModal(true); // Open the modal
    };

    const handleConfirmDelete = async () => {
        if (confirmText === "DELETE") {
            try {
                const result = await deleteContractor(contractorToDelete);
                if (result === "") {
                    toast.success(`Contractor No ${contractorToDelete} was successfully deleted!`);
                    fetchContractors(); // Refresh the contractors list
                } else {
                    toast.error(`Error deleting contractor: ${result.message}`);
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
                <p>Loading existing contractors...</p>
            ) : (
                <section className="mt-5 mb-5 container">
                    <div className="d-flex justify-content-between mb-3 mt-5">
                        <h2>Existing Contractors</h2>
                    </div>

                    <Row>
                        <Col md={12} className="d-flex justify-content-end">
                            <Link to={"/add-contractor"}>
                                <FaPlus /> Add Contractor
                            </Link>
                        </Col>
                    </Row>

                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Contractor Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contractors.map((contractor) => (
                                <tr key={contractor.id} className="text-center">
                                    <td>{contractor.id}</td>
                                    <td>{contractor.name}</td>
                                    <td className="gap-2">
                                        <Link to={`/edit-contractor/${contractor.id}`} className="gap-2">
                                            <span className="btn btn-info btn-sm">
                                                <FaEye />
                                            </span>
                                            <span className="btn btn-warning btn-sm ml-5">
                                                <FaEdit />
                                            </span>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm ml-5"
                                            onClick={() => handleDeleteClick(contractor.id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Delete Confirmation Modal */}
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete Contractor No {contractorToDelete}?</p>
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
                </section>
            )}
        </>
    );
};

export default ExistingContractors;
