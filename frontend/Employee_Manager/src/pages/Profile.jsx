import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GetEmployeeById } from "../components/Api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [empDetails, setEmpDetails] = useState(null);
    const handleBack = () => {
      navigate("/employee");
    };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data } = await GetEmployeeById(user.id);
        setEmpDetails(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">My Profile</h4>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        <div className="card-body p-4">
          <div className="row align-items-center">
            {empDetails && (
              <div className="row align-items-center">
                <div className="col-md-3 text-center p-5  ">
                  {empDetails.profileImage ? (
                    <img
                      src={empDetails.profileImage}
                      alt="Profile"
                      className="img-fluid rounded-4 shadow-sm"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="default-profile">
                      <h1>
                        {empDetails?.name?.charAt(0)?.toUpperCase() || "U"}
                      </h1>
                    </div>
                  )}
                </div>

                <div className="col-md-8">
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
                </div>
              </div>
            )}
          </div>

          <button
            className="btn btn-primary mt-3 px-4 rounded-pill"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
