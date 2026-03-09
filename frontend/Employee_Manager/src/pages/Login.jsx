import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GetEmployeeByEmail } from "../components/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

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
        // Fetch employee data from API
        const { data } = await GetEmployeeByEmail(email);
        console.log(data)
        if (!data) {
          alert("Employee not found");
          return;
        }

        const emp = data;

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
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
