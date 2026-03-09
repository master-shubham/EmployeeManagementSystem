import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../utils";
import { GetEmployeeById } from "./Api";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empDetails, setEmpDetails] = useState({});
  const fetchEmployeeById = async () => {
    try {
      const { data } = await GetEmployeeById(id);
      setEmpDetails(data[0]);
      
    } catch (error) {
      notify("Failed to fetch employee, try again later", "error");
    }
  };

  const handleBack = () => {
    navigate("/employee");
  };

  useEffect(() => {
    fetchEmployeeById();
  }, [id]);
console.log(empDetails);
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-white border-0">
          <h2 className="fw-bold mb-0">Employee Detail</h2>
        </div>

        <div className="card-body p-4">
          <div className="row align-items-center">
            {/* Profile Section */}
            <div className="col-md-3 text-center mb-3 mb-md-0">
              {empDetails.profileImage ? (
                <img
                  src={empDetails.profileImage}
                  alt="Profile"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
              ) : (
                <div className="default-profile">
                  <h1>{empDetails?.name?.charAt(0)?.toUpperCase() || "U"}</h1>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="col-md-9">
              <h3 className="fw-bold text-capitalize mb-3">
                {empDetails.name}
              </h3>

              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <span className="text-muted">{empDetails.email}</span>
              </p>

              <p className="mb-2">
                <strong>Phone:</strong>{" "}
                <span className="text-muted">{empDetails.phone}</span>
              </p>

              <p className="mb-2">
                <strong>Department:</strong>{" "}
                <span className="text-muted">{empDetails.department}</span>
              </p>

              <p className="mb-2">
                <strong>Salary:</strong>{" "}
                <span className="fw-semibold text-success">
                  ₹ {empDetails.salary}
                </span>
              </p>

              <button
                className="btn btn-primary mt-3 px-4 rounded-pill"
                onClick={handleBack}
              >
                ← Back
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EmployeeDetails;
