import React, { useState } from "react";
import EXIF from 'exif-js';
import { addEmployee, addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";
import DatePicker from "../common/DatePickerComp";
import CompanyDropdown from "../common/CompanyDropDown";
import DeptDropdown from "../common/DeptDropDown";
import DivDropdown from "../common/DivDropDown";
import ContDropdown from "../common/ContDropDown";
import toast, { Toaster } from "react-hot-toast";

const AddEmployee = () => {
    const [newEmployee, setNewEmployee] = useState({
        empNo: "",
        empFirstName: "",
        empLastName: "",
        empType: "",
        empCompany: "",
        empDepartment: "",
        empDivision: "",
        empContractor: "",
        empContactNo: "",
        empStatus: true,
        photo: null
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isChecked, setIsChecked] = useState(true);

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
        const selectedImage = e.target.files[0];

        // Read EXIF data and correct the orientation if necessary
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                EXIF.getData(img, function () {
                    const orientation = EXIF.getTag(this, 'Orientation');
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    switch (orientation) {
                        case 6: // 90 degrees
                            canvas.width = img.height;
                            canvas.height = img.width;
                            ctx.rotate(90 * Math.PI / 180);
                            ctx.drawImage(img, 0, -img.height);
                            break;
                        case 8: // -90 degrees
                            canvas.width = img.height;
                            canvas.height = img.width;
                            ctx.rotate(-90 * Math.PI / 180);
                            ctx.drawImage(img, -img.width, 0);
                            break;
                        case 3: // 180 degrees
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.rotate(180 * Math.PI / 180);
                            ctx.drawImage(img, -img.width, -img.height);
                            break;
                        default:
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0);
                    }

                    canvas.toBlob((blob) => {
                        setNewEmployee({ ...newEmployee, photo: blob });
                        setImagePreview(URL.createObjectURL(blob));
                    });
                });
            };
        };
        reader.readAsDataURL(selectedImage);
    };

    const handleDateSelect = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateString = `${year}-${month}-${day}`;
        setNewEmployee({ ...newEmployee, empDOB: dateString });
        setSelectedDate(date);
    };

    const handleCompanyChange = (companyId) => {
        setSelectedCompany(companyId);
        setNewEmployee({ ...newEmployee, empCompany: companyId });
    };

    const handleDepartmentChange = (departmentId) => {
        setSelectedDepartment(departmentId);
        setNewEmployee({ ...newEmployee, empDepartment: departmentId });
    };

    const handleDivisionChange = (divisionId) => {
        setSelectedDivision(divisionId);
        setNewEmployee({ ...newEmployee, empDivision: divisionId });
    };

    const handleContractorChange = (contractorId) => {
        setSelectedContractor(contractorId);
        setNewEmployee({ ...newEmployee, empContractor: contractorId });
    };

    const handleEmployeeInputChange = (e) => {
        const name = e.target.name;
        if (name === "empStatus") {
            const checked = e.target.checked;
            setNewEmployee((prev) => ({ ...prev, empStatus: checked }));
            setIsChecked(checked);
        } else if (name !== "empDOB") {
            setNewEmployee({ ...newEmployee, [name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addEmployee(newEmployee.empNo, newEmployee.empFirstName, newEmployee.empLastName, newEmployee.empType, newEmployee.empContactNo, newEmployee.empCompany, newEmployee.empDepartment, newEmployee.empDivision, newEmployee.empStatus, newEmployee.photo, newEmployee.empContractor);
            if (success !== undefined) {
                toast.success("New employee added successfully");
                setNewEmployee({
                    empNo: "",
                    empFirstName: "",
                    empLastName: "",
                    empType: "",
                    empCompany: "",
                    empDepartment: "",
                    empDivision: "",
                    empContactNo: "",
                    empStatus: true,
                    photo: null,
                    empContractor: ""
                });
                setErrorMessage("");
                setSelectedDate(null);
                setSelectedCompany('');
                setSelectedDepartment('');
                setSelectedDivision('');
                setSelectedContractor('');
                setImagePreview("");
            } else {
                toast.error("Error adding new Employee");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <Toaster />
                        <h2 className="mt-5 mb-2">Add a New Employee</h2>
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
                            <div className="mb-3">
                                <label htmlFor="empType" className="form-label">
                                    Type
                                </label>
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
                                <CompanyDropdown
                                    required
                                    className="form-control"
                                    id="empCompany"
                                    name="empCompany"
                                    value={newEmployee.empCompany}
                                    onChange={handleCompanyChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empDepartment" className="form-label">
                                    Department
                                </label>
                                <DeptDropdown
                                    required
                                    className="form-control"
                                    id="empDepartment"
                                    name="empDepartment"
                                    value={newEmployee.empDepartment}
                                    onChange={handleDepartmentChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empDivision" className="form-label">
                                    Division
                                </label>
                                <DivDropdown
                                    required
                                    className="form-control"
                                    id="empDivision"
                                    name="empDivision"
                                    value={newEmployee.empDivision}
                                    onChange={handleDivisionChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empContractor" className="form-label">
                                    Contractor
                                </label>
                                <ContDropdown
                                    required
                                    className="form-control"
                                    id="empContractor"
                                    name="empContractor"
                                    value={newEmployee.empContractor}
                                    onChange={handleContractorChange}
                                />
                            </div>
                            <div className="mb-3 checkbox-wrapper-6">
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
                                        className="mb-3"
                                    />
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
    );
};

export default AddEmployee;
