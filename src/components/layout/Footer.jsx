import React from "react"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
	let today = new Date()
	return (
		<footer className="bg-dark text-light py-3 footer mt-lg-5">
			<Container>
				<Row>
					<Col xs={6} md={12}>	
						<p className="mb-0"> &copy; {today.getFullYear()} Meal Management System - Hayleys Eco Solution v1.0.1-31.01.2025 <img className="company-logo" src="/Public/company-logo.jpeg" alt="logo" /></p>
					</Col>

				</Row>
			</Container>
		</footer>
	)
}

export default Footer
