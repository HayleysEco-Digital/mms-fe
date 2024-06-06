import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const RequireAdmin = ({ children }) => {
	const isAdmin = localStorage.getItem("userRole")
	console.log("isAdmin", isAdmin)
	const location = useLocation()
	if (isAdmin != 'ROLE_ADMIN') {
		return <Navigate to="/" state={{ path: location.pathname }} />
	}
	return children
}
export default RequireAdmin
