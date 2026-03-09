import TableRow from "./TableRow";

const EmployeeTable = ({
  employees,
  pagination,
  fetchEmployee,
  handleUpadateEmployee,
  handleDeleteEmployee,
}) => {
  const headers = ["Name", "Email", "Phone", "Department"];
  const { currentPage, totalPages } = pagination;

  const handlePagination = (page) => {
    fetchEmployee("", page, 5);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3">
     
        <table className="table align-middle modern-table mb-0">
          <thead className="table-light">
            <tr>
              {headers.map((header) => (
                <th key={header} className="fw-semibold text-secondary">
                  {header}
                </th>
              ))}
              <th className="text-center fw-semibold text-secondary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <TableRow
                key={emp._id}
                employee={emp}
                handleUpadateEmployee={handleUpadateEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            ))}
          </tbody>
        </table>
      

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="text-muted small">
          Page {currentPage} of {totalPages}
        </span>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePagination(page)}
              className={`btn btn-sm me-1 ${
                currentPage === page ? "btn-primary" : "btn-outline-secondary"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
