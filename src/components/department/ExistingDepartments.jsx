import React, { useEffect, useState } from "react"
import { deleteDepartment, deleteMeal, deleteRoom, getAllDepartments, getAllMeals, getAllRooms } from "../utils/ApiFunctions"
import { Col, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingDepartments = () => {
	const [departments, setDepartments] = useState([{ id: "", name: ""}])
	const [currentPage, setCurrentPage] = useState(1)
	const [mealsPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredMeals, setFilteredMeals] = useState([{ id: "", mealType: "", mealPrice: "" }])
	const [selectedMealType, setSelectedMealType] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	useEffect(() => {
		fetchDepartments();
	}, [])

	const fetchDepartments = async () => {
		setIsLoading(true)
		try {
			const result = await getAllDepartments()
            console.log(result)
            setDepartments(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error.message)
			setIsLoading(false)
		}
	}

	// useEffect(() => {
	// 	if (selectedMealType === "") {
	// 		setFilteredRooms(rooms)
	// 	} else {
	// 		const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType)
	// 		setFilteredRooms(filteredRooms)
	// 	}
	// 	setCurrentPage(1)
	// }, [rooms, selectedRoomType])

	// const handlePaginationClick = (pageNumber) => {
	// 	setCurrentPage(pageNumber)
	// }

	const handleDelete = async (departmentId) => {
		try {
			const result = await deleteDepartment(departmentId)
			if (result === "") {
				setSuccessMessage(`Department No ${departmentId} was deleted`)
				fetchDepartments()
			} else {
				console.error(`Error deleting Department : ${result.message}`)
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	// const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
	// 	const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
	// 	return Math.ceil(totalRooms / roomsPerPage)
	// }


	// const indexOfLastRoom = currentPage * roomsPerPage
	// const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
	// const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

	return (
		<>
			<div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>

			{isLoading ? (
				<p>Loading existing departments</p>
			) : (
				<>
					<section className="mt-5 mb-5 container">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h2>Existing Departments</h2>
						</div>

						<Row>
							{/* <Col md={6} className="mb-2 md-mb-0">
								<RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
							</Col> */}

							<Col md={12} className="d-flex justify-content-end">
								<Link to={"/add-department"}>
									<FaPlus /> Add Department
								</Link>
							</Col>
						</Row>

						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Department Name</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{departments.map((department) => (
									<tr key={department.id} className="text-center">
										<td>{department.id}</td>
										<td>{department.name}</td>
										<td className="gap-2">
											<Link to={`/edit-department/${department.id}`} className="gap-2">
												<span className="btn btn-info btn-sm">
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm ml-5">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(department.id)}>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* <RoomPaginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
							onPageChange={handlePaginationClick}
						/> */}
					</section>
				</>
			)}
		</>
	)
}

export default ExistingDepartments
