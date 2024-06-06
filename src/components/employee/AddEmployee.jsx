import React, { useState } from "react"
import { addEmployee, addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"
import DatePicker from "../common/DatePickerComp"
import CompanyDropdown from "../common/CompanyDropDown"
import DeptDropdown from "../common/DeptDropDown"
import DivDropdown from "../common/DivDropDown"
import ContDropdown from "../common/ContDropDown"
import toast, { Toaster } from "react-hot-toast"

const AddEmployee = () => {
    const [newEmployee, setNewEmployee] = useState({
        empNo: "",
        empFirstName: "",
        empLastName: "",
        //empDOB: "",
        empType: "",
        empCompany: "",
        empDepartment: "",
        empDivision: "",
        empContractor: "",
        empContactNo: "",
        empStatus: true,
        photo: null
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isChecked, setIsChecked] = useState(true)

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedContractor, setSelectedContractor] = useState('');
    const [imagePreview, setImagePreview] = useState("");

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewEmployee({ ...newEmployee, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

    const handleDateSelect = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero if necessary
        const day = ('0' + date.getDate()).slice(-2); // Adding leading zero if necessary
        const dateString = `${year}-${month}-${day}`;
        //setSelectedDate(date); // Receive the selected date from DatePickerComp and update the state
        setNewEmployee({ ...newEmployee, empDOB: dateString });
        setSelectedDate(date);
    };

    const handleCompanyChange = (companyId) => {
        setSelectedCompany(companyId);
        console.log(selectedCompany);
        console.log(companyId);
        setNewEmployee({ ...newEmployee, empCompany: companyId });
        // Do something with the selected company ID
        console.log(newEmployee);
    };

    const handleDepartmentChange = (departmentId) => {
        setSelectedDepartment(departmentId);
        console.log(selectedDepartment);
        console.log(departmentId);
        setNewEmployee({ ...newEmployee, empDepartment: departmentId });
        // Do something with the selected company ID
        console.log(newEmployee);
    };

    const handleDivisionChange = (divisionId) => {
        setSelectedDivision(divisionId);
        console.log(selectedDivision);
        console.log(divisionId);
        setNewEmployee({ ...newEmployee, empDivision: divisionId });
        // Do something with the selected company ID
        console.log(newEmployee);
    };

    const handleContractorChange = (contractorId) => {
        setSelectedContractor(contractorId);
        console.log(selectedContractor);
        console.log(contractorId);
        setNewEmployee({ ...newEmployee, empContractor: contractorId });
        // Do something with the selected company ID
        console.log(newEmployee);
    };

    const handleEmployeeInputChange = (e) => {
        const name = e.target.name
        //setNewEmployee({ ...newEmployee, [name]: value })

       // console.log(name, value);
        if (name === "empStatus") {
            const checked = e.target.checked;
            setNewEmployee((prev) => ({ ...prev, empStatus: checked }));
            setIsChecked(checked);
            console.log("Emp status in employee: ", checked);
        }
        // Check if the input is for the date picker component
        else if (name === "empDOB") {
            // If the input is for the date picker, update the value directly
            //setNewEmployee({ ...newEmployee, empDOB: selectedDate });
        } else {
            // If the input is for other fields, update the value using spread operator
            setNewEmployee({ ...newEmployee, [name]: e.target.value });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addEmployee(newEmployee.empNo, newEmployee.empFirstName, newEmployee.empLastName, newEmployee.empType, newEmployee.empContactNo, newEmployee.empCompany, newEmployee.empDepartment, newEmployee.empDivision, newEmployee.empStatus, newEmployee.photo, newEmployee.empContractor)
            if (success !== undefined) {
                //setSuccessMessage("A new employee was  added successfully !")
                toast.success("New employee added successfully");
                setNewEmployee({
                    empNo: "",
                    empFirstName: "",
                    empLastName: "",
                    //empDOB: "",
                    empType: "",
                    empCompany: "",
                    empDepartment: "",
                    empDivision: "",
                    empContactNo: "",
                    empStatus: "",
                    photo: null,
                    empContractor: ""
                })
                setErrorMessage("")
                setSelectedDate(null);
                setSelectedCompany('');
                setSelectedDepartment('');
                setSelectedDivision('');
                setSelectedContractor('');
                setImagePreview("");

            } else {
                //setErrorMessage("Error adding new Employee")
                toast.error("Error adding new Employee")
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
                        <Toaster/>
                        <h2 className="mt-5 mb-2">Add a New Employee</h2>
                        {/* {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>} */}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="empNo" className="form-label">
                                    Emp No
                                </label>
                                <div>
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        id="empNo"
                                        name="empNo"
                                        value={newEmployee.empNo}
                                        onChange={handleEmployeeInputChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empFirstName" className="form-label">
                                    First Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empFirstName"
                                    name="empFirstName"
                                    value={newEmployee.empFirstName}
                                    onChange={handleEmployeeInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="empLastName" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empLastName"
                                    name="empLastName"
                                    value={newEmployee.empLastName}
                                    onChange={handleEmployeeInputChange}
                                />
                            </div>

                            {/* <div className="mb-3">
                                <label htmlFor="empDOB" className="form-label">
                                    DOB
                                </label>
                                <br />
        
                                <DatePicker
                                    className="form-control"
                                    id="empDOB"
                                    name="empDOB"
                                    value={newEmployee.empDOB}
                                    onChange={handleDateSelect}
                                    onDateSelect={handleDateSelect}
                                />
                            </div> */}

                            <div className="mb-3">
                                <label htmlFor="empType" className="form-label">
                                    Type
                                </label>
                                {/* <input
									 required
                                     type="text"
                                     className="form-control"
                                     id="empType"
                                     name="empType"
                                     value={newEmployee.empType}
                                     onChange={handleEmployeeInputChange}
								/> */}
                                <select
                                    required
                                    className="form-control"
                                    id="empType"
                                    name="empType"
                                    value={newEmployee.empType}
                                    onChange={handleEmployeeInputChange}
                                >
                                    <option value="">Select Employee Type</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="empCompany" className="form-label">
                                    Company
                                </label>
                                {/* <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empCompany"
                                    name="empContactNo"
                                    value={newEmployee.empContactNo}
                                    onChange={handleEmployeeInputChange}
                                /> */}
                                <CompanyDropdown
                                    required
                                    className="form-control"
                                    id="empCompany"
                                    name="empCompany"
                                    value={newEmployee.empCompany}
                                    onChange={handleCompanyChange} />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="empDepartment" className="form-label">
                                    Department
                                </label>
                                {/* <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empCompany"
                                    name="empContactNo"
                                    value={newEmployee.empContactNo}
                                    onChange={handleEmployeeInputChange}
                                /> */}
                                <DeptDropdown
                                    required
                                    className="form-control"
                                    id="empDepartment"
                                    name="empDepartment"
                                    value={newEmployee.empDepartment}
                                    onChange={handleDepartmentChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="empDivision" className="form-label">
                                    Division
                                </label>
                                {/* <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empCompany"
                                    name="empContactNo"
                                    value={newEmployee.empContactNo}
                                    onChange={handleEmployeeInputChange}
                                /> */}
                                <DivDropdown
                                    required
                                    className="form-control"
                                    id="empDivision"
                                    name="empDivision"
                                    value={newEmployee.empDivision}
                                    onChange={handleDivisionChange} />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="empContractor" className="form-label">
                                    Contractor
                                </label>
                                {/* <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empCompany"
                                    name="empContactNo"
                                    value={newEmployee.empContactNo}
                                    onChange={handleEmployeeInputChange}
                                /> */}
                                <ContDropdown
                                    required
                                    className="form-control"
                                    id="empContractor"
                                    name="empContractor"
                                    value={newEmployee.empContractor}
                                    onChange={handleContractorChange} />

                            </div>

                            <div className="mb-3 checkbox-wrapper-6">
                                {/* <label htmlFor="empDivision" className="form-label">
                                <input
                                    required
                                    type="checkbox"
                                    //  className="form-control"
                                    id="empStatus"
                                    name="empStatus"
                                    value={newEmployee.empStatus}
                                    onChange={handleEmployeeInputChange}
                                />
                                    Status
                                </label> */}

                                <label className="tgl-btn" htmlFor="empStatus">Status</label>
                                <input className="tgl tgl-light" id="empStatus" name="empStatus" type="checkbox" checked={isChecked} onChange={handleEmployeeInputChange} />
                                <label className="tgl-btn" htmlFor="empStatus"></label>

                            </div>

                            <div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Employee Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview Employee Photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
							</div>
                            

                            <div className="mb-3">
                                <label htmlFor="empContactNo" className="form-label">
                                    Contact No
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="empContactNo"
                                    name="empContactNo"
                                    value={newEmployee.empContactNo}
                                    onChange={handleEmployeeInputChange}
                                />
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-employees"} className="btn btn-outline-info">
                                    Existing Employees
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddEmployee
