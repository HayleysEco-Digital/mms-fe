import axios from "axios"

export const api = axios.create({
	baseURL: "https://fd49-2402-4000-1200-b65c-6966-7902-b471-3db2.ngrok-free.app",
	headers: {
        "Content-Type": "application/json"
    }
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export const getHeader2 = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "multipart/form-data"
	}
}

/* This function adds a new room room to the database */
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

	const response = await api.post("/rooms/add/new-room", formData,{
		headers: getHeader2()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function adds a new meal to the database */
export async function addMeal(mealType, mealPrice) {
	const formData = new FormData()
	formData.append("mealType", mealType)
	formData.append("mealPrice", mealPrice)

	const response = await api.post("/meals/add/new-meal", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function adds a new meal to the database */
export async function addCompany(name) {
	const formData = new FormData()
	formData.append("name", name)

	const response = await api.post("/companies/add/new-company", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function adds a new meal to the database */
export async function addDepartment(name) {
	const formData = new FormData()
	formData.append("name", name)

	const response = await api.post("/departments/add/new-department", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

export async function addDivision(name) {
	const formData = new FormData()
	formData.append("name", name)

	const response = await api.post("/divisions/add/new-division", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

export async function addContractor(name) {
	const formData = new FormData()
	formData.append("name", name)

	const response = await api.post("/contractors/add/new-contractor", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function adds a new employee to the database */
export async function addEmployee(empNo, empFirstName, empLastName, empType, empContactNo, empCompany, empDepartment, empDivision, empStatus, photo, empContractor) {
	const formData = new FormData()
	// formData.append("empNo", empNo)
	// formData.append("empFirstName", empFirstName)
	// formData.append("empLastName", empLastName)
	// formData.append("empDOB", empDOB)
	// formData.append("empType", empType)
	// formData.append("empContactNo", empContactNo)
	// formData.append("empCompany", empCompany)
	// formData.append("empDepartment", empDepartment)
	// formData.append("empDivision", empDivision)
	// formData.append("empStatus", empStatus);
	// formData.append("photo", photo);

	const employeeDTO = {
        empNo: empNo,
        empFirstName: empFirstName,
        empLastName: empLastName,
        //empDOB: empDOB,
        empType: empType,
        empContactNo: empContactNo,
        empCompany: empCompany,
        empDepartment: empDepartment,
        empDivision: empDivision,
        empStatus: empStatus,
		empContractor: empContractor
    };



	formData.append("employeeDTO", new Blob([JSON.stringify(employeeDTO)], { type: "application/json" }));
    formData.append("photo", photo);


	console.log(photo);

	const response = await api.post("/employees/add/new-employee-new", formData,{
		headers: getHeader2()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function gets all room types from thee database */
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}
/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/all-rooms", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function gets all rooms from the database */
export async function getAllMeals() {
	try {
		const result = await api.get("/meals/all-meals", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error("Error fetching meals")	
	}
}

/* This function gets all rooms from the database */
export async function getAllCompanies() {
	try {
		const result = await api.get("/companies/all-companies", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error("Error fetching Companies")	
	}
}

/* This function gets all rooms from the database */
export async function getAllDepartments() {
	try {
		const result = await api.get("/departments/all-departments", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error("Error fetching Departments")	
	}
}

export async function getAllDivisions() {
	try {
		const result = await api.get("/divisions/all-divisions", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error("Error fetching Departments")	
	}
}

export async function getAllContractors() {
	try {
		const result = await api.get("/contractors/all-contractors", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error("Error fetching Contractors")	
	}
}

/* This function gets all employees from the database */
export async function getAllEmployees() {
	try {
		const result = await api.get("/employees/all-employees", {
			headers: getHeader()
		})
		console.log(result.data);
		return result.data
		
	} catch (error) {
		throw new Error("Error fetching Employees")
	}
}

export async function getAllOrders() {
	try {
		const result = await api.get("/orders/all-orders", {
			headers: getHeader()
		})
		console.log(result.data);
		return result.data
		
	} catch (error) {
		throw new Error("Error fetching Employees")
	}
}

export async function getMealCountByDate(date) {
	try {
		const result = await api.get("/orders/count-by-date", {
			params: {date},
			headers: getHeader()
		})
		console.log(result.data);
		return result.data
		
	} catch (error) {
		throw new Error("Error fetching Employees")
	}
}

export const getMealsByDateRange = async (startDate, endDate) => {
    const response = await api.get(`/orders/totalMealsByDateRange`, {
        params: {
            startDate,
            endDate
        },
		headers: getHeader()
    });
    return response.data;
};

export const getTotalMealsByContractorAndDateRange = async (startDate, endDate) => {
    const response = await api.get(`/orders/totalMealsByContractorAndDateRange`, {
        params: {
            startDate,
            endDate
        },
		headers: getHeader()
    });
    return response.data;
};
/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}

/* This function deletes a Employee by the Id */
export async function deleteEmployee(empId) {
	try {
		const result = await api.delete(`/employees/delete/employee/${empId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Employee ${error.message}`)
	}
}

export async function deleteOrder(empId, mealId, orderDate) {
	try {
		console.log(mealId);
		const result = await api.delete(`/orders/delete/${empId}/${mealId}/${orderDate}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Order ${error.message}`)
	}
}

/* This function deletes a Employee by the Id */
export async function deleteMeal(mealId) {
	try {
		const result = await api.delete(`/meals/delete/meal/${mealId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Meal ${error.message}`)
	}
}

/* This function deletes a company by the Id */
export async function deleteCompany(companyId) {
	try {
		const result = await api.delete(`/companies/delete/company/${companyId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Company ${error.message}`)
	}
}

/* This function deletes a department by the Id */
export async function deleteDepartment(departmentId) {
	try {
		const result = await api.delete(`/departments/delete/department/${departmentId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Department ${error.message}`)
	}
}

export async function deleteDivision(divisionId) {
	try {
		const result = await api.delete(`/divisions/delete/division/${divisionId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Division ${error.message}`)
	}
}

export async function deleteContractor(contractorId) {
	try {
		const result = await api.delete(`/contractors/delete/contractor/${contractorId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting Contractor ${error.message}`)
	}
}

/* This function update a room */
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	console.log(formData)
	const response = await api.put(`/rooms/update/${roomId}`, formData,{
		headers: getHeader2()
	})
	return response
}

/* This function update a meal */
export async function updateMeal(mealId, mealData) {
	const formData = new FormData()
	formData.append("mealType", mealData.mealType)
	formData.append("mealPrice", mealData.mealPrice)
	console.log(formData)
	const response = await api.put(`/meals/update/${mealId}`, formData,{
		headers: getHeader()
	})
	return response
}

/* This function update a meal */
export async function updateCompany(companyId, companyData) {
	const formData = new FormData()
	formData.append("name", companyData.name)
	console.log(formData)
	const response = await api.put(`/companies/update/${companyId}`, formData,{
		headers: getHeader()
	})
	return response
}

/* This function update a meal */
export async function updateDepartment(departmentId, departmentData) {
	const formData = new FormData()
	formData.append("name", departmentData.name)
	//console.log(formData)
	const response = await api.put(`/departments/update/${departmentId}`, formData,{
		headers: getHeader()
	})
	return response
}

export async function updateDivision(divisionId, divisionData) {
	const formData = new FormData()
	formData.append("name", divisionData.name)
	//console.log(formData)
	const response = await api.put(`/divisions/update/${divisionId}`, formData,{
		headers: getHeader()
	})
	return response
}

export async function updateContractor(contractorId, contractorData) {
	const formData = new FormData()
	formData.append("name", contractorData.name)
	//console.log(formData)
	const response = await api.put(`/contractors/update/${contractorId}`, formData,{
		headers: getHeader()
	})
	return response
}



/* This function update an employee */
export async function updateEmployee(empNo, employeeData) {
	const formData = new FormData()
	// formData.append("empFirstName", employeeData.empFirstName)
	// console.log(employeeData.empFirstName)
	// formData.append("empLastName", employeeData.empLastName)
	// console.log(employeeData.empLastName)
	// formData.append("empDOB", employeeData.empDOB)
	// formData.append("empType", employeeData.empType)
	// formData.append("empContactNo", employeeData.empContactNo)
	// formData.append("empCompany", employeeData.empCompany)
	// console.log(employeeData.empCompany)
	// formData.append("empDepartment", employeeData.empDepartment)
	// console.log(employeeData.empDepartment)
	// formData.append("empDivision", employeeData.empDivision)
	// console.log(employeeData.empDivision)

	console.log(employeeData.companyId);
	console.log(employeeData.departmentId);
	console.log(employeeData.divisionId);
	console.log(employeeData.contractorId);
	const employeeDTO = {
        empFirstName: employeeData.empFirstName,
        empLastName: employeeData.empLastName,
        //empDOB: empDOB,
        empType: employeeData.empType,
        empContactNo: employeeData.empContactNo,
        empCompany: employeeData.companyId,
        empDepartment: employeeData.departmentId,
        empDivision: employeeData.divisionId,
        empStatus: employeeData.empStatus,
		empContractor: employeeData.contractorId
    }; 

	formData.append("employeeDTO", new Blob([JSON.stringify(employeeDTO)], { type: "application/json" }));
    formData.append("photo", employeeData.photo);

	console.log(employeeData.photo);


	const response = await api.put(`/employees/update/${empNo}`, formData,{
		headers: getHeader2()
	})
	return response
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function gets a meal by the id */
export async function getMealById(mealId) {
	try {
		//console.log(mealId);
		const result = await api.get(`/meals/meal/${mealId}`, {headers: getHeader()})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching meal ${error.message}`)
	}
}

/* This function gets a meal by the id */
export async function getCompanyById(companyId) {
	try {
		//console.log(mealId);
		const result = await api.get(`/companies/company/${companyId}`, {headers: getHeader()})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Company ${error.message}`)
	}
}

/* This function gets a meal by the id */
export async function getDepartmentById(departmentId) {
	try {
		//console.log(mealId);
		const result = await api.get(`/departments/department/${departmentId}`, {headers: getHeader()})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Department ${error.message}`)
	}
}

export async function getDivisionById(divisionId) {
	try {
		//console.log(mealId);
		const result = await api.get(`/divisions/division/${divisionId}`, {headers: getHeader()})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Divisions ${error.message}`)
	}
}

export async function getContractorById(contractorId) {
	try {
		//console.log(mealId);
		const result = await api.get(`/contractors/contractor/${contractorId}`, {headers: getHeader()})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Contractors ${error.message}`)
	}
}

/* This funcction gets a employee by the id */
export async function getEmployeeById(empNo) {
	try {
		const result = await api.get(`/employees/employee/${empNo}`, {headers: getHeader()})
		console.log(result.data);
		return result.data
		
	} catch (error) {
		throw new Error(`Error fetching Employee ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}
