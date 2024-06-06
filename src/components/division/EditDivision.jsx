import React, { useEffect, useState } from "react"
import { getDivisionById, updateDepartment, updateDivision} from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditDivision = () => {
	const [division, setDivision] = useState({
		name: "",
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { divisionId } = useParams()



	const handleInputChange = (event) => {
		const { name, value } = event.target
		setDivision({ ...division, [name]: value })
	}

	useEffect(() => {
		const fetchDivision = async () => {
			try {
                //console.log(divisionId)
				const divisionData = await getDivisionById(divisionId)
				setDivision(divisionData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchDivision()
	}, [divisionId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateDivision(divisionId, division)
			if (response.status === 200) {
				setSuccessMessage("division updated successfully!")
				const updatedDivisionData = await getDivisionById(divisionId)
				setDivision(updatedDivisionData)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating division")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Division</h3>
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
								Division Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={division.name}
								onChange={handleInputChange}
							/>
						</div>


						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-divisions"} className="btn btn-outline-info ml-5">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Division
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditDivision
