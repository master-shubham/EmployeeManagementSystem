const {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
  getEmployeeByEmail,
} = require("../Controllers/EmployeeController");
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');

const routes = require('express').Router();


routes.get('/',getAllEmployee)
routes.post('/',cloudinaryFileUploader.single('profileImage'),createEmployee)
routes.put(
  "/:id",
  cloudinaryFileUploader.single("profileImage"),
  updateEmployeeById,
);
routes.get('/:id',getEmployeeById)
routes.delete('/:id',deleteEmployeeById)
routes.get('/email/:email', getEmployeeByEmail);


module.exports = routes