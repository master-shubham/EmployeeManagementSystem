import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <div className="d-flex ">
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="p-3">
          <h5 className="text-center mb-4">Admin Panel</h5>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : "text-white"}`
                }
              >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/employee"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : "text-white"}`
                }
              >
                <i className="bi bi-people me-2"></i>
                Employees
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-light bg-light shadow-sm px-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-dark me-3"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </button>

            <span className="navbar-brand mb-0 h5">Employee Manager</span>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <i className="bi bi-toggle-on p-2"></i>
              ) : (
                <i className="bi bi-toggle-off p-2"></i>
              )}
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
