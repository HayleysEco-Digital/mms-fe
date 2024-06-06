import React, { useEffect, useState } from "react"
import { getEmployeeById, getRoomById, updateEmployee, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"
import CompanyDropdown from "../common/CompanyDropDown"
import DeptDropdown from "../common/DeptDropDown"
import DivDropdown from "../common/DivDropDown"
import ContDropdown from "../common/ContDropDown"
import toast, { Toaster } from "react-hot-toast"

const EditEmployee = () => {
	const [employee, setEmployee] = useState({
		empFirstName: "",
		empLastName: "",
		//empDOB: "",
		empType: "",
		empCompany: "",
		empDepartment: "",
		empDivision: "",
		empContactNo: "",
		empStatus: null,
		photo: null,
		empContractor: ""
	});

	//setEmployee(employee);

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { empNo } = useParams()
	const [selectedCompany, setSelectedCompany] = useState();
	const [selectedDepartment, setSelectedDepartment] = useState();
	const [selectedDivision, setSelectedDivision] = useState();
	const [selectedContractor, setSelectedContractor] = useState();
	const [formattedDob, setFormattedDob] = useState('');
	const [imagePreview, setImagePreview] = useState("");
	const [isChecked, setIsChecked] = useState();


	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		//const photostr = "data:image/jpeg;base64," + selectedImage;
		setEmployee({ ...employee, photo: selectedImage })
		console.log(selectedImage);
		
		setImagePreview(URL.createObjectURL(selectedImage));
		console.log(imagePreview);
		//setImagePreview(selectedImage);
	}

	// const handleImageChange = (e) => {
	//     const selectedImage = e.target.files[0];
	//     if (selectedImage) {
	//         setEmployee(prevState => ({
	//             ...prevState,
	//             photo: selectedImage
	//         }));
	//         setImagePreview(URL.createObjectURL(selectedImage));
	//     }
	// };

	const handleInputChange = (event) => {

		const { name, value } = event.target

		if (name === "empStatus") {

			const checked = event.target.checked;

			if (checked) {
				setEmployee({ ...employee, empStatus: true });
			}
			else {
				setEmployee({ ...employee, empStatus: false });
			}
			setIsChecked(checked);
			console.log("Emp status in employee: ", checked);
		}


		setEmployee({ ...employee, [name]: value })
		//setEmployee({ ...employee, empCompany:  empCompany.value});
	}

	const handleCheckboxChange = (event) => {
		setIsChecked(!isChecked);
		console.log(isChecked);
		console.log(event.target.checked);
	};

	const handleCompanyChange = (companyId) => {
		setSelectedCompany(companyId);
		console.log(selectedCompany);
		console.log(companyId);
		setEmployee((prev) => ({ ...employee, companyId: companyId }));
		// Do something with the selected company ID
		console.log(employee);
	};

	const handleDepartmentChange = (departmentId) => {
		setSelectedDepartment(departmentId);
		console.log(selectedDepartment);
		console.log(departmentId);
		setEmployee({ ...employee, departmentId: departmentId });
		// Do something with the selected company ID
		console.log(employee);
	};

	const handleDivisionChange = (divisionId) => {
		setSelectedDivision(divisionId);
		console.log(selectedDivision);
		console.log(divisionId);
		setEmployee({ ...employee, divisionId: divisionId });
		// Do something with the selected company ID
		console.log(employee);
	};

	const handleContractorChange = (contractorId) => {
		setSelectedContractor(contractorId);
		console.log(selectedContractor);
		console.log(contractorId);
		setEmployee({ ...employee, contractorId: contractorId });
		// Do something with the selected company ID
		console.log(employee);
	};


	// const handleInputChange = (event) => {
	// 	const { name, value } = event.target;
	// 	setEmployee((prevEmployee) => ({
	// 	  ...prevEmployee,
	// 	  [name]: value,
	// 	}));

	//   };

	//   const handleDropdownChange = (event) => {
	// 	const { name, value } = event.target;
	// 	setEmployee((prevEmployee) => ({
	// 	  ...prevEmployee,
	// 	  [name]: value,
	// 	}));
	// 	// Set corresponding selected values if needed (optional)
	// 	if (name === "empCompany") {
	// 	  setSelectedCompany(value);
	// 	} else if (name === "empDepartment") {
	// 	  setSelectedDepartment(value);
	// 	} else if (name === "empDivision") {
	// 	  setSelectedDivision(value);
	// 	}
	//   };

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				const employeeData = await getEmployeeById(empNo)


				// if(employeeData.empDOB){
				// 	const dobArray = employeeData.empDOB;
				// 	const formattedDate = `${dobArray[0]}-${dobArray[1].toString().padStart(2, '0')}-${dobArray[2].toString().padStart(2, '0')}`;
				// 	employeeData.empDOB = formattedDate;
				// }
				setSelectedCompany(employeeData.companyId);
				setSelectedDepartment(employeeData.departmentId);
				setSelectedDivision(employeeData.divisionId);
				setSelectedContractor(employeeData.contractorId);

				

				console.log(employee);

				console.log(employeeData)
				console.log(employeeData.photo);
				setImagePreview(employeeData.photo);
				setIsChecked(employeeData.empStatus);
				console.log(employeeData.empStatus);
				//const blob = await fetch(employeeData.photo).then(r => r.blob());
				const file = await fetch(employeeData.photo).then(r => r.blob()).then(blobFile => new File([blobFile], "photo", { type: "image/png" }));
				//const photostr = "data:image/jpeg;base64," + employeeData.photo;
				setEmployee(employeeData);
				setEmployee({ ...employee, photo: file });
				console.log(file);
				console.log(employeeData.departmentId)
				console.log(selectedCompany);
				console.log(employee);
			} catch (error) {
				console.error(error)
			}
		}

		fetchEmployee()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(employee);

		try {
			const response = await updateEmployee(empNo, employee)
			if (response.status === 200) {
				setSuccessMessage("Employee updated successfully!")
				const updatedEmployeeData = await getEmployeeById(empNo)
				setEmployee(updatedEmployeeData)
				//setErrorMessage("")
				toast.success("Employee updated successfully!")
			} else {
				//setErrorMessage("Error updating employee")
				toast.error("Error updating employee")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Employee</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{/* {successMessage && (
						// <div className="alert alert-success" role="alert">
						// 	{successMessage}
						// </div>
						<Toaster/>
					)}
					{errorMessage && (
						// <div className="alert alert-danger" role="alert">
						// 	{errorMessage}
						// </div>
						<Toaster/>
					)} */}
					<Toaster/>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="empNo" className="form-label hotel-color">
								Emp No
							</label>
							<input
								required
								readOnly
								disabled
								type="text"
								className="form-control"
								id="empNo"
								name="empNo"
								value={employee.empNo}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="empFirstName" className="form-label hotel-color">
								First Name
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="empFirstName"
								name="empFirstName"
								value={employee.empFirstName}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="empLastName" className="form-label hotel-color">
								Last Name
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="empLastName"
								name="empLastName"
								value={employee.empLastName}
								onChange={handleInputChange}
							/>
						</div>

						{/* <div className="mb-3">
							<label htmlFor="empDOB" className="form-label hotel-color">
								DOB
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="empDOB"
								name="empDOB"
								value={employee.empDOB}
								onChange={handleInputChange}
							/>
						</div> */}

						<div className="mb-3">
							<label htmlFor="empType" className="form-label hotel-color">
								Employee Type
							</label>
							{/* <input
                                required
								type="text"
								className="form-control"
								id="empType"
								name="empType"
                                value={employee.empType}
								onChange={handleInputChange}
							/> */}
							<select
								required
								className="form-control"
								id="empType"
								name="empType"
								value={employee.empType}
								onChange={handleInputChange}
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
								value={selectedCompany}
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
								value={selectedDepartment}
								onChange={handleDepartmentChange} />

						</div>

						<div className="mb-3">
							<label htmlFor="empDivision" className="form-label">
								Division/Section
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
								value={selectedDivision}
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
								value={selectedContractor}
								onChange={handleContractorChange} />

						</div>

						{/* <div className="mb-3 checkbox-wrapper-6">
                                <label htmlFor="empDivision" className="form-label">
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
                                </label>

                                <label className="tgl-btn" htmlFor="empStatus">Status</label>
                                <input className="tgl tgl-light" id="empStatus" name="empStatus" type="checkbox" checked={isChecked} onChange={handleInputChange} />
                                <label className="tgl-btn" htmlFor="empStatus"></label>

                            </div> */}

						<div className="mb-3">
							<label htmlFor="empStatus" className="form-label hotel-color">
								Employee Status
							</label>
							{/* <input
                                required
								type="text"
								className="form-control"
								id="empType"
								name="empType"
                                value={employee.empType}
								onChange={handleInputChange}
							/> */}
							<select
								required
								className="form-control"
								id="empStatus"
								name="empStatus"
								value={employee.empStatus}
								onChange={handleInputChange}
							>
								<option value="">Select Employee Status</option>
								<option value={true}>Active</option>
								<option value={false}>Inactive</option>
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label hotel-color">
								Photo
							</label>
							<input
								//required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								//src={`data:image/jpeg;base64,${imagePreview}`}
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Employee preview"
									style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
									className="mt-3"
								/>
							)}
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Employee preview"
									style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
									className="mt-3"
								/>
							)}
						</div>

						<div className="mb-3">
							<label htmlFor="empContactNo" className="form-label hotel-color">
								Contact No
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="empContactNo"
								name="empContactNo"
								value={employee.empContactNo}
								onChange={handleInputChange}
							/>
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-employees"} className="btn btn-outline-info ml-5">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Employee
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditEmployee