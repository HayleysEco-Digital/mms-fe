import React from "react";
import { Link } from "react-router-dom";
import { FaUtensils, FaUsers, FaBuilding, FaSitemap } from 'react-icons/fa';

const Report = () => {
  return (
    <section className="container mt-5">
      <h2 className="text-center mb-4">Welcome to Reports</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 mb-3">
          <Link to="/all-orders" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaUtensils className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">All Orders</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/meal-count" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaUsers className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Meal Summary</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/meal-by-daterange-emp" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaBuilding className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Meals By Date Range - Employee Wise</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/meal-by-daterange-cont" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <FaSitemap className="me-3 text-primary" size={24} />
                <h5 className="card-title mb-0">Meals By Date Range - Contractor Wise</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Report;
