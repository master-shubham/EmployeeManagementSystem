import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CreateEmployee, UpdateEmployeeById } from "./Api";
import { notify } from "../../utils";

const AddEmployee = ({
  handleModelShow,
  showModel,
  handleModelClose,
  fetchEmployee,
  updateEmpObj,
}) => {
  const [employeeFormData, setEmployeeFormData] = useState({
    name: "",
    email: "",
    password:"",
    phone: "",
    department: "",
    salary: "",
    profileImage: "" || null,
  });

  const [updateMode,setUpdateMode]= useState(false)
useEffect(() => {
  if (updateEmpObj) {
    setUpdateMode(true);
    setEmployeeFormData(updateEmpObj);
  } else {
    setUpdateMode(false);
    resetEmployeeState();
  }
}, [updateEmpObj]);

  const resetEmployeeState = () => {
    setEmployeeFormData({
      name: "",
      email: "",
      password:"",
      phone: "",
      department: "",
      salary: "",
      profileImage: "" || null,
    });
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setEmployeeFormData({ ...employeeFormData, [name]: value });
  };
  const handleFormFileData = (e) => {
    setEmployeeFormData({
      ...employeeFormData,
      profileImage: e.target.files[0],
    });
  };

  console.log(updateMode)
  // Add employee
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { success, message } = updateMode
        ? await UpdateEmployeeById(employeeFormData, employeeFormData._id)
        : await CreateEmployee(employeeFormData);
      
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      resetEmployeeState();
      fetchEmployee();
    } catch (error) {
      notify("Failed to create employee, try again later", "error");
    }
  };
  return (
    <>
      <Modal
        show={showModel}
        onHide={handleModelClose}
        centered
        backdrop="static"
        contentClassName="custom-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            {updateMode ? "Update Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={employeeFormData.name}
                onChange={handleFormData}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={employeeFormData.email}
                onChange={handleFormData}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                autoComplete="new-password"
                value={employeeFormData.password}
                onChange={handleFormData}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={employeeFormData.phone}
                onChange={handleFormData}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={employeeFormData.department}
                onChange={handleFormData}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={employeeFormData.salary}
                onChange={handleFormData}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="profileImage"
                onChange={handleFormFileData}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleModelClose}>
              Cancel
            </Button>

            <Button variant="primary" type="submit" onClick={handleModelClose}>
              {updateMode ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddEmployee;
