import React, { useEffect, useState } from "react"
import { getMealById, getRoomById, updateMeal, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditMeal = () => {
	const [meal, setMeal] = useState({
		mealType: "",
		mealPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { mealId } = useParams()



	const handleInputChange = (event) => {
		const { name, value } = event.target
		setMeal({ ...meal, [name]: value })
	}

	useEffect(() => {
		const fetchMeal = async () => {
			try {
                //console.log(mealId)
				const mealData = await getMealById(mealId)
				setMeal(mealData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchMeal()
	}, [mealId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateMeal(mealId, meal)
			if (response.status === 200) {
				setSuccessMessage("Meal updated successfully!")
				const updatedMealData = await getMealById(mealId)
				setMeal(updatedMealData)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating meal")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Meal</h3>
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
							<label htmlFor="mealType" className="form-label hotel-color">
								Meal Type
							</label>
							<input
								type="text"
								className="form-control"
								id="mealType"
								name="mealType"
								value={meal.mealType}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="mealPrice" className="form-label hotel-color">
								Meal Price
							</label>
							<input
								type="number"
								className="form-control"
								id="mealPrice"
								name="mealPrice"
								value={meal.mealPrice}
								onChange={handleInputChange}
							/>
						</div>

						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-meals"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Meal
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditMeal
