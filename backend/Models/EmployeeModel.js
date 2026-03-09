const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const EmployeeSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
    },
    salary:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    },
})

const EmployeeModel = mongoose.model('emp_manage',EmployeeSchema)

module.exports = EmployeeModel;