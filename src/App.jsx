import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from "./components/room/ExistingRooms"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import EditRoom from "./components/room/EditRoom"
import AddRoom from "./components/room/AddRoom"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/Checkout"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings"
import FindBooking from "./components/booking/FindBooking"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import RequireAdmin from "./components/auth/RequireAdmin";
import ExistingEmployees from "./components/employee/ExistingEmployees"
import EditEmployee from "./components/employee/EditEmployee"
import AddEmployee from "./components/employee/AddEmployee"
import ExistingMeals from "./components/meals/ExistingMeals"
import AddMeal from "./components/meals/AddMeal"
import EditMeal from "./components/meals/EditMeal"
import ExistingCompanies from "./components/company/ExistingCompanies"
import AddCompany from "./components/company/AddCompany"
import EditCompany from "./components/company/EditCompany"
import ExistingDepartments from "./components/department/ExistingDepartments"
import ExistingDivisions from "./components/division/ExistingDivisions"
import AddDepartment from "./components/department/AddDepartment"
import EditDepartment from "./components/department/EditDepartment"
import Report from "./components/Report/Report"
import AllOrders from "./components/order/AllOrders"
import MealCountByDate from "./components/order/MealCountByDate"
import AddDivision from "./components/division/AddDivision"
import EditDivision from "./components/division/EditDivision"
import ExistingContractors from "./components/contractor/ExistingContractors"
import AddContractor from "./components/contractor/AddContractor"
import EditContractor from "./components/contractor/EditContractor"
import MealsByDateRange from "./components/order/MealsByDateRange"
import MealsByContractorAndDateRange from "./components/order/MealsByContractorAndDateRange"
import RegistrationNew from "./components/auth/SelfRegister"
import SelfRegister from "./components/auth/SelfRegister"
import EditProfile from "./components/auth/EditProfile"

function App() {
	return (
		<AuthProvider>
			<main>
				<Router>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit-room/:roomId" element={<EditRoom />} />
						<Route path="/edit-meal/:mealId" element={<EditMeal />} />
						<Route path="/edit-company/:companyId" element={<EditCompany />} />
						<Route path="/edit-department/:departmentId" element={<EditDepartment />} />
						<Route path="/edit-division/:divisionId" element={<EditDivision />} />
						<Route path="/edit-contractor/:contractorId" element={<EditContractor />} />
						<Route path="/edit-employee/:empNo" element={<EditEmployee />} />
						<Route path="/edit-profile/:empNo" element={<EditProfile />} />
						<Route path="/existing-rooms" element={<ExistingRooms />} />
						<Route path="/existing-meals" element={<ExistingMeals />} />
						<Route path="/existing-employees" element={<ExistingEmployees />} />
						<Route path="/all-orders" element={<AllOrders />} />
						<Route path="/meal-count" element={<MealCountByDate />} />
						<Route path="/meal-by-daterange-emp" element={<MealsByDateRange />} />
						<Route path="/meal-by-daterange-cont" element={<MealsByContractorAndDateRange />} />					
						<Route path="/existing-companies" element={<ExistingCompanies />} />
						<Route path="/existing-departments" element={<ExistingDepartments />} />
						<Route path="/existing-divisions" element={<ExistingDivisions />} />
						<Route path="/existing-contractors" element={<ExistingContractors />} />
						<Route path="/add-room" element={<AddRoom />} />
						<Route path="/add-meal" element={<AddMeal />} />
						<Route path="/add-company" element={<AddCompany />} />
						<Route path="/add-department" element={<AddDepartment />} />
						<Route path="/add-division" element={<AddDivision />} />
						<Route path="/add-employee" element={<AddEmployee />} />
						<Route path="/add-contractor" element={<AddContractor />} />

						<Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>

						<Route path="/browse-all-rooms" element={<RoomListing />} />

						<Route
							path="/admin"
							element={
								<RequireAdmin>
									<Admin />
								</RequireAdmin>
							}
						/>

						<Route
							path="/report"
							element={
								<RequireAdmin>
									<Report />
								</RequireAdmin>
							}
						/>



						<Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/existing-bookings" element={<Bookings />} />
						<Route path="/find-booking" element={<FindBooking />} />

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />
						<Route path="/self-register" element={<SelfRegister />} />

						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<FindBooking />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App
