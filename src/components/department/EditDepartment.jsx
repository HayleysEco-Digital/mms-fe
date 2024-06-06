import React, { useEffect, useState } from "react"
import { getDepartmentById, updateDepartment} from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditDepartment = () => {
	const [department, setDepartment] = useState({
		name: "",
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { departmentId } = useParams()



	const handleInputChange = (event) => {
		const { name, value } = event.target
		setDepartment({ ...department, [name]: value })
	}

	useEffect(() => {
		const fetchDepartment = async () => {
			try {
                //console.log(departmentId)
				const departmentData = await getDepartmentById(departmentId)
				setDepartment(departmentData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchDepartment()
	}, [departmentId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateDepartment(departmentId, department)
			if (response.status === 200) {
				setSuccessMessage("department updated successfully!")
				const updatedCompanyData = await getDepartmentById(departmentId)
				setDepartment(updatedCompanyData)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating department")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Department</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label hotel-color">
								Department Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={department.name}
								onChange={handleInputChange}
							/>
						</div>


						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-departments"} className="btn btn-outline-info ml-5">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Department
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditDepartment
