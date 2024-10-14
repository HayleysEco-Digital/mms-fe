import React, { useEffect, useState } from "react";
import { deleteMeal, getAllMeals } from "../utils/ApiFunctions";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ExistingMeals = () => {
    const [meals, setMeals] = useState([{ id: "", mealType: "", mealPrice: "" }]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [mealToDelete, setMealToDelete] = useState(null);
    const [confirmText, setConfirmText] = useState("");

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        setIsLoading(true);
        try {
            const result = await getAllMeals();
            setMeals(result);
            setIsLoading(false);
        } catch (error) {
            toast.error(`Error fetching meals: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (mealId) => {
        setMealToDelete(mealId);
        setShowDeleteModal(true); // Open the modal
    };

    const handleConfirmDelete = async () => {
        if (confirmText === "DELETE") {
            try {
                const result = await deleteMeal(mealToDelete);
                if (result === "") {
                    toast.success(`Meal No ${mealToDelete} was successfully deleted!`);
                    fetchMeals(); // Refresh the meals list
                } else {
                    toast.error(`Error deleting meal: ${result.message}`);
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
                <p>Loading existing meals...</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Meals</h2>
                        </div>

                        <Row>
                            <Col md={12} className="d-flex justify-content-end">
                                <Link to={"/add-meal"}>
                                    <FaPlus /> Add Meal
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Meal Type</th>
                                    <th>Meal Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {meals.map((meal) => (
                                    <tr key={meal.id} className="text-center">
                                        <td>{meal.id}</td>
                                        <td>{meal.mealType}</td>
                                        <td>{meal.mealPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-meal/${meal.id}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDeleteClick(meal.id)}
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
                    <p>Are you sure you want to delete Meal No {mealToDelete}?</p>
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

export default ExistingMeals;
