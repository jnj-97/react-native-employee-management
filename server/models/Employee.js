import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  image: String,
  designation: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
