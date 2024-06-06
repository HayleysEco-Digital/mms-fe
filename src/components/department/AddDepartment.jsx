import React, { useState } from "react"
import { addDepartment, addEmployee, addMeal, addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"
import DatePicker from "../common/DatePickerComp"
import CompanyDropdown from "../common/CompanyDropDown"
import DeptDropdown from "../common/DeptDropDown"
import DivDropdown from "../common/DivDropDown"

const AddDepartment = () => {
    const [newDepartment, SetNewDepartment] = useState({
        name: "",
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');



    const handleDepartmentInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        //setNewEmployee({ ...newEmployee, [name]: value })

        //console.log(name, value);

        // If the input is for other fields, update the value using spread operator
        SetNewDepartment({ ...newDepartment, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addDepartment(newDepartment.name)
            if (success !== undefined) {
                setSuccessMessage("A new department was added successfully !")
                SetNewDepartment({
                    name: "",
                })
                setErrorMessage("")

            } else {
                setErrorMessage("Error adding new Department!")
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
                        <h2 className="mt-5 mb-2">Add a New Department</h2>
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
                                        value={newDepartment.mealId}
                                        onChange={handleMealInputChange}
                                    />
                                </div>
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Department Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={newDepartment.name}
                                    onChange={handleDepartmentInputChange}
                                />
                            </div>



                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-departments"} className="btn btn-outline-info">
                                    Existing Departments
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddDepartment
