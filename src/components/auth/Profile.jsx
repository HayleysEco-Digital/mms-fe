import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getCompanyById, getDepartmentById, getDivisionById, getEmployeeById, getUser } from "../utils/ApiFunctions"
import { Link, useNavigate } from "react-router-dom"
import moment from "moment"
import { FaEdit, FaEye } from "react-icons/fa"

const Profile = () => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	const [employee, setEmployee] = useState({
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

	const [bookings, setBookings] = useState([
		{
			id: "",
			room: { id: "", roomType: "" },
			checkInDate: "",
			checkOutDate: "",
			bookingConfirmationCode: ""
		}
	])

	const [image, setImage] = useState(null);

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				console.log(userData);
				const employeeData = await getEmployeeById(userData.empNo);
				const companyData = await getCompanyById(employeeData.companyId);
				const departmentData = await getDepartmentById(employeeData.departmentId);
				const divisionData = await getDivisionById(employeeData.divisionId);

				console.log(employeeData);
				setUser(userData)
				setImage(employeeData.photo)
				setEmployee(employeeData);
				setEmployee({ ...employeeData, empCompany: companyData.name, empDepartment: departmentData.name, empDivision: divisionData.name })


			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token)
				setBookings(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}

		fetchBookings()
	}, [userId])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(userId)
				.then((response) => {
					setMessage(response.data)
					localStorage.removeItem("token")
					localStorage.removeItem("userId")
					localStorage.removeItem("userRole")
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

	return (
		<div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-danger">{message}</p>}
			{user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">Employee Information</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-2">
										<div className="d-flex justify-content-center align-items-center mb-4">
											<img
												src={`data:image/jpeg;base64,${image}`}
												alt="Profile"
												className="rounded-circle"
												style={{ width: "150px", height: "150px", objectFit: "cover" }}
											/>
										</div>
									</div>

									<div className="col-md-10">
										<div className="card-body">
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">EMP No:</label>
												<div className="col-md-10">
													<p className="card-text">{employee.empNo}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">First Name:</label>
												<div className="col-md-10">
													<p className="card-text">{employee.empFirstName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Last Name:</label>
												<div className="col-md-10">
													<p className="card-text">{employee.empLastName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Company:</label>
												<div className="col-md-10">
													<p className="card-text">{employee.empCompany}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Dept:</label>
												<div className="col-md-10">
													<p className="card-text">{employee.empDepartment}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Division:</label>
												<div className="col-md-10">
													<p className="card-text">{employee.empDivision}</p>
												</div>
											</div>
											<hr />
										</div>
									</div>
								</div>
							</div>

							{/* <h4 className="card-title text-center">Booking History</h4>

							{bookings.length > 0 ? (
								<table className="table table-bordered table-hover shadow">
									<thead>
										<tr>
											<th scope="col">Booking ID</th>
											<th scope="col">Room ID</th>
											<th scope="col">Room Type</th>
											<th scope="col">Check In Date</th>
											<th scope="col">Check Out Date</th>
											<th scope="col">Confirmation Code</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{bookings.map((booking, index) => (
											<tr key={index}>
												<td>{booking.id}</td>
												<td>{booking.room.id}</td>
												<td>{booking.room.roomType}</td>
												<td>
													{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
												</td>
												<td>
													{moment(booking.checkOutDate)
														.subtract(1, "month")
														.format("MMM Do, YYYY")}
												</td>
												<td>{booking.bookingConfirmationCode}</td>
												<td className="text-success">On-going</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>You have not made any bookings yet.</p>
							)} */}

							<div className="d-flex justify-content-center">
								<div className="mx-2">
									<Link to={`/edit-profile/${employee.empNo}`} className="gap-2">
										<span className="btn btn-info btn-sm">
										<FaEdit /> Edit Profile
										</span>
									</Link>
								</div>
								<div className="mx-2">
									<button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
										Close account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	)
}

export default Profile
