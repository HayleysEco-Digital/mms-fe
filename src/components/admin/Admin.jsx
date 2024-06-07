import React from "react";
import { Link } from "react-router-dom";
import { FaUtensils, FaUsers, FaBuilding, FaSitemap } from 'react-icons/fa';
//test
const Admin = () => {
  return (
    <section className="container mt-5">
      <h2 className="text-center mb-4">Welcome to Admin Panel</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 mb-3">
          <Link to="/existing-meals" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaUtensils className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Manage Meals</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/existing-employees" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaUsers className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Manage Employees</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/existing-companies" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaBuilding className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Manage Companies</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/existing-departments" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaSitemap className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Manage Departments</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 mb-3">
          <Link to="/existing-divisions" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaSitemap className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Manage Divisions</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 mb-3">
          <Link to="/existing-contractors" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaSitemap className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Manage Contractors</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;