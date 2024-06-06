import React, { useState } from "react"
import { addEmployee, addMeal, addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"
import DatePicker from "../common/DatePickerComp"
import CompanyDropdown from "../common/CompanyDropDown"
import DeptDropdown from "../common/DeptDropDown"
import DivDropdown from "../common/DivDropDown"

const AddMeal = () => {
    const [newMeal, setNewMeal] = useState({
        mealType: "",
        mealPrice: "",
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');



    const handleMealInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        //setNewEmployee({ ...newEmployee, [name]: value })

        //console.log(name, value);

        // If the input is for other fields, update the value using spread operator
        setNewMeal({ ...newMeal, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addMeal(newMeal.mealType, newMeal.mealPrice)
            if (success !== undefined) {
                setSuccessMessage("A new meal was added successfully !")
                setNewMeal({
                    mealType: "",
                    mealPrice: "",
                })
                setErrorMessage("")

            } else {
                setErrorMessage("Error adding new Meal")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Meal</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            {/* <div className="mb-3">
                                <label htmlFor="mealId" className="form-label">
                                    Meal ID
                                </label>
                                <div>
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        id="mealId"
                                        name="mealId"
                                        value={newMeal.mealId}
                                        onChange={handleMealInputChange}
                                    />
                                </div>
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="mealType" className="form-label">
                                    Meal Type
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="mealType"
                                    name="mealType"
                                    value={newMeal.mealType}
                                    onChange={handleMealInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mealPrice" className="form-label">
                                    Meal Price
                                </label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="mealPrice"
                                    name="mealPrice"
                                    value={newMeal.mealPrice}
                                    onChange={handleMealInputChange}
                                />
                            </div>


                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-meals"} className="btn btn-outline-info">
                                    Existing Meals
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save Meal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddMeal
