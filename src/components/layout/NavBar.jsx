import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"


const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const isLoggedIn = localStorage.getItem("token")
	console.log(isLoggedIn);
	const userRole = localStorage.getItem("userRole")
	console.log(userRole);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-0 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand">
					<img className="logo" src="/logo.png" alt="logo" />
					<span className="hotel-color logo-text">Meal Management System</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
							</li>
						)}

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/report"}>
									Reports
								</NavLink>
							</li>
						)}

						{isLoggedIn && (

							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/request-meal"}>
									Request Meals
								</NavLink>
							</li>
						)}

						{isLoggedIn && (

							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/request-free-meal"}>
									Request Free Meals
								</NavLink>
							</li>
						)}

					</ul>

					<ul className="d-flex navbar-nav">

						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
