import { Link } from "react-router-dom";

const TableRow = ({
  employee,
  handleUpadateEmployee,
  handleDeleteEmployee,
}) => {
  return (
    <tr className="table-row-hover">
      <td>
        <div className="d-flex align-items-center">
          <div className="avatar me-3">
            {employee.name?.charAt(0).toUpperCase()}
          </div>

          <Link
            to={`/employee/${employee._id}`}
            className="text-decoration-none fw-semibold text-dark"
          >
            {employee.name}
          </Link>
        </div>
      </td>

      <td className="text-muted">{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>

      <td className="text-center">
        <button
          className="btn btn-sm btn-light border me-2 action-btn"
          onClick={() => handleUpadateEmployee(employee)}
        >
          <i className="bi bi-pencil-fill text-warning"></i>
        </button>

        <button
          className="btn btn-sm btn-light border action-btn"
          onClick={() => handleDeleteEmployee(employee)}
        >
          <i className="bi bi-trash-fill text-danger"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
