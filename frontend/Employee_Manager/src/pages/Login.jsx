import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GetEmployeeByEmailPassword } from "../components/Api";
import { notify } from "../../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify("Please enter email and password","error");
      return;
    }

    try {
      // Admin login
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
        // Fetch employee
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
      alert("Login failed");
      notify("Login failed", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3">Login</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
