import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import toast from "react-hot-toast"

const Registration = () => {
	const [registration, setRegistration] = useState({
		empNo: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		isProfileCompleted: false,
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/login"

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			toast.success("New employee added and profile completed successfully");

			setTimeout(() => {
				navigate(redirectUrl, { replace: true });
			}, 3000); 
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ empNo: "", firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			{successMessage && <p className="alert alert-success">{successMessage}</p>}

			<h2>Register</h2>
			<form onSubmit={handleRegistration}>

			<div className="mb-3 row">
					<label htmlFor="empNo" className="col-sm-2 col-form-label">
						EMP No
					</label>
					<div className="col-sm-10">
						<input
							required
							id="empNo"
							name="empNo"
							type="number"
							className="form-control"
							value={registration.empNo}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="firstName" className="col-sm-2 col-form-label">
						First Name
					</label>
					<div className="col-sm-10">
						<input
							required
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={registration.firstName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="lastName" className="col-sm-2 col-form-label">
						Last Name
					</label>
					<div className="col-sm-10">
						<input
							required
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={registration.lastName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input
							required
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input
							required
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-3">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Register
					</button>
					<span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/login"}>Login</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Registration
