import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { Api, DeleteEmployeeById } from "./Api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils";
import Swal from "sweetalert2";

const EmployeeManagementApp = () => {
  const [showModel, setShowModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateEmpObj, setUpdateEmpObj] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    pagination: {
      totalEmployees: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    },
  });

const handleModelShow = () => {
  setUpdateEmpObj(null); // reset update object
  setShowModel(true);
};

  const handleModelClose = () => setShowModel(false);

  const handleUpadateEmployee = (empObj) => {
    setUpdateEmpObj(empObj);
    setShowModel(true)
  };

  const handleDeleteEmployee = async (emp) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const { success, message } = await DeleteEmployeeById(emp._id);
        if (success) {
          notify(message, "success");
        } else {
          notify(message, "error");
        }
        fetchEmployee();
      }
    } catch (error) {
       notify("Failed to fetch employee, try again later", "error");
    }
  };

  const fetchEmployee = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await Api(search, page, limit);
      
      setEmployeeData(data);
    } catch (error) {
       notify("Failed to fetch employee, try again later", "error");
    }
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetchEmployee(searchTerm);
      } else {
        fetchEmployee(""); // fetch all employees
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center">Employee Management</h1>
      <div className="w-100 d-flex justify-content-center">
        <div
          className="border bg-light p-4 rounded-4 shadow-sm"
          style={{ maxWidth: "1100px", width: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-primary" onClick={handleModelShow}>
              Add
            </button>
            <input
              type="text"
              placeholder="Search Employee..."
              className="form-control w-50"
              onChange={handleInput}
            />
          </div>
          <EmployeeTable
            handleUpadateEmployee={handleUpadateEmployee}
            fetchEmployee={fetchEmployee}
            employees={employeeData.employees}
            pagination={employeeData.pagination}
            handleDeleteEmployee={handleDeleteEmployee}
          />

          <AddEmployee
            updateEmpObj={updateEmpObj}
            fetchEmployee={fetchEmployee}
            handleModelShow={handleModelShow}
            showModel={showModel}
            handleModelClose={handleModelClose}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
