import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GetEmployeeByEmailPassword } from "../components/Api";
import { notify } from "../../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify("Please enter email and password", "error");
      return;
    }

    try {
      if (email === "admin@gmail.com") {
        const adminUser = {
          id: 0,
          name: "Admin",
          email,
          role: "admin",
        };

        login(adminUser);
        navigate("/employee");
      } else {
        const emp = await GetEmployeeByEmailPassword(email);

        if (!emp) {
          notify("Employee not found", "error");
          return;
        }

        if (emp.password !== password) {
          notify("Incorrect password", "error");
          return;
        }

        const employeeUser = {
          id: emp._id,
          name: emp.name,
          email: emp.email,
          role: "employee",
        };

        login(employeeUser);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      notify("Login failed", "error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #ffffff, #ced7db)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3 position-relative">
            <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="email"
              className="form-control ps-5"
              placeholder="Enter your email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <i className="bi bi-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>

            <input
              type={showPass ? "text" : "password"}
              className="form-control ps-5 pe-5"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Button */}
          <button className="btn btn-dark w-100 py-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
