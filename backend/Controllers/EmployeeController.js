    const EmployeeModel = require("../Models/EmployeeModel");

    const createEmployee = async (req,res)=>{
            try {
                const body = req.body
                body.profileImage=req.file? req.file.path : null;
                console.log(body);
                
                const emp=new EmployeeModel(body)
                await emp.save()
                res.status(201).json({
                message: "Employee created",
                success: true,
                });

            } catch (error) {
                res.status(500).json({
                    message:'Internal server error',
                    success:false,
                    error:error
                })
            }
    }

    const getAllEmployee = async (req,res)=>{
            try {
                let {page, limit,search} = req.query;

                page=parseInt(page) || 1;
                limit=parseInt(limit) || 5

                const skip = (page-1) * limit
                // page = 1 => (1-1) * 5 = 0 skip
                // page = 2 => (2-2) * 5 = 5 skip
                // page = 3 => (3-3) * 5 = 10 skip
                
                let searchCriteria = {};
                if(search){
                    searchCriteria={
                        name:{
                            $regex:search,
                            $options:'i' //case insencenctive
                        }
                    }
                }
                const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);


                const totalPages = Math.ceil(totalEmployees/limit)

                const emps = await EmployeeModel.find(searchCriteria).skip(skip).limit(limit).sort({updatedAt:-1})

                res.status(200).json({
                message: "All Employees",
                success: true,
                data:{
                    employees:emps,
                    pagination:{
                        totalEmployees,
                        currentPage:page,
                        totalPages,
                        pageSize:limit
                    }
                },
                });

            } catch (error) {
                res.status(500).json({
                    message:'Internal server error(Con)',
                    success:false,
                    error:error
                })
            }
    }

    const getEmployeeById = async (req, res) => {
      try {
        const {id} = req.params;
        const emp = await EmployeeModel.find({_id:id});
        res.status(200).json({
          message: "Get Employees Detail",
          success: true,
          data: emp,
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal server error(Con)",
          success: false,
          error: error,
        });
      }
    };

const getEmployeeByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const emp = await EmployeeModel.findOne({ email });

    res.status(200).json({
      message: "Get Employee Detail",
      success: true,
      data: emp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

// const getEmployeeByEmailPassword = async (req, res) => {
//   try {
//     const { email, password } = req.params;

//     const emp = await EmployeeModel.findOne({ email:email,password:password });

//     res.status(200).json({
//       message: "Get Employee Detail",
//       success: true,
//       data: emp,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//       error: error,
//     });
//   }
// };

    const updateEmployeeById = async (req, res) => {
      try {
        const {name,phone,email,salary,department}=req.body;
        const { id } = req.params;
       

        let updateData = {
          name,
          phone,
          email,
          salary,
          department,
          updatedAt: new Date(),
        };

        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,updateData,{new:true}
        );
        if (!updateEmployee) {
            return res.status(404).json({message:"Employee not found"})
        }

        res.status(200).json({
          message: "Employees Updated",
          success: true,
          data:updateEmployee
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal server error(Con)",
          success: false,
          error: error,
        });
      }
    };

    const deleteEmployeeById = async (req, res) => {
      try {
        const { id } = req.params;
        const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
        res.status(200).json({
          message: "Employees Deleted",
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal server error(Con)",
          success: false,
          error: error,
        });
      }
    };

    module.exports = {
      createEmployee,
      getAllEmployee,
      getEmployeeById,
      updateEmployeeById,
      deleteEmployeeById,
      getEmployeeByEmail
    };