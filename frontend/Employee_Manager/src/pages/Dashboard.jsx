import { useEffect, useState } from "react";
import { Api } from "../components/Api";
import { notify } from "../../utils";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState({
      pagination: {
        totalEmployees: 0,
        currentPage: 1,
        totalPages: 1,
        pageSize: 5,
      },
    });
  
     const fetchEmployee = async (search = "", page = 1, limit = 5) => {
        try {
          const { data } = await Api(search, page, limit);
          
          setEmployeeData(data);
        } catch (error) {
           notify("Failed to fetch employee, try again later", "error");
        }
      };
 useEffect(() => {
    fetchEmployee("")
  }, []);
  console.log(employeeData)
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>

      <div className="row">
        {employeeData.pagination.totalEmployees && (
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h6>Total Employees</h6>
              <h4>{employeeData.pagination.totalEmployees}</h4>
            </div>
          </div>
        )}

        <div className="col-md-4">
          {employeeData.pagination.totalEmployees && (
            <div className="card shadow-sm p-3">
              <h6>Active Employees</h6>
              <h4>{employeeData.pagination.totalEmployees}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
