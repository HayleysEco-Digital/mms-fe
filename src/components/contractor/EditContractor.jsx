import React, { useEffect, useState } from "react"
import { getContractorById, updateContractor, updateDepartment, updateDivision} from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditContractor = () => {
	const [contractor, setContractor] = useState({
		name: "",
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { contractorId } = useParams()



	const handleInputChange = (event) => {
		const { name, value } = event.target
		setContractor({ ...contractor, [name]: value })
	}

	useEffect(() => {
		const fetchContractor = async () => {
			try {
                //console.log(contractorId)
				const contractorData = await getContractorById(contractorId)
				setContractor(contractorData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchContractor()
	}, [contractorId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateContractor(contractorId, contractor)
			if (response.status === 200) {
				setSuccessMessage("contractor updated successfully!")
				const updatedContractorData = await getContractorById(contractorId)
				setContractor(updatedContractorData)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating contractor")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Contractor</h3>
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
								Contractor Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={contractor.name}
								onChange={handleInputChange}
							/>
						</div>


						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-contractors"} className="btn btn-outline-info ml-5">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Contractor
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditContractor
