const express = require("express");
const db = require("./db/dbinit");
const Employee = require("./models/Employee").default;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const result = await Employee.find({});
  console.log(result);
  console.log("hit");
  res.json(result);
});

app.post("/delete", async (req, res) => {
  await Employee.findByIdAndDelete(req.body.id);
  res.send("deleted");
});

app.post("/update", async (req, res) => {
  await Employee.findByIdAndUpdate(req.body.id, req.body);
  res.send("updated");
});

app.post("/", async (req, res) => {
  let employee = new Employee(req.body);
  try {
    await employee.save();
    res.send("new employee saved");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.listen(3000, () => console.log("Server listening on port 3000"));
