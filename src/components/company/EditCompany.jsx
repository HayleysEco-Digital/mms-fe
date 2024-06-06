import React, { useEffect, useState } from "react"
import { getCompanyById, updateCompany} from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditCompany = () => {
	const [company, setCompany] = useState({
		companyType: "",
		companyPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { companyId } = useParams()



	const handleInputChange = (event) => {
		const { name, value } = event.target
		setCompany({ ...company, [name]: value })
	}

	useEffect(() => {
		const fetchCompany = async () => {
			try {
                //console.log(companyId)
				const companyData = await getCompanyById(companyId)
				setCompany(companyData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchCompany()
	}, [companyId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateCompany(companyId, company)
			if (response.status === 200) {
				setSuccessMessage("company updated successfully!")
				const updatedCompanyData = await getCompanyById(companyId)
				setCompany(updatedCompanyData)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating company")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Company</h3>
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
								Company Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={company.name}
								onChange={handleInputChange}
							/>
						</div>


						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-companies"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Company
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditCompany
