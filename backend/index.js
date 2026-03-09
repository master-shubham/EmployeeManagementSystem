const express= require('express');
const cors = require("cors");
const app=express();

require("dotenv").config();

const PORT=process.env.PORT || 8080;

require('./Models/db')

const EmployeeRouter = require('./Routes/EmployeeRoutes')
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Employee manage server is running")
})

app.use('/api/employees',EmployeeRouter)
app.listen(PORT,()=>{
    console.log(`Application running on ${PORT}`);
    
})