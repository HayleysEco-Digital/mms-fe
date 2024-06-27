import React, { useEffect, useContext, useState } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { getUser } from "../utils/ApiFunctions"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const [isProfileCompleted, setIsProfileComplted] = useState(false);

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				console.log(userData);
				setIsProfileComplted(userData.isProfileCompleted);
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
		window.location.reload();
	}

	return (
		<>
			{isProfileCompleted ? (
							<li>
							<Link className="dropdown-item" to={"/profile"}>
								Profile
							</Link>
						</li>
			) : (			<li>
				<Link className="dropdown-item" to={"/self-register"}>
					Self Regsiter
				</Link>
			</li>)}


			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Logout
			</button>
		</>
	)
}

export default Logout
