const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let port = process.env.PORT || 3000;
let emps = [
  {
    id: "1",
    name: "Madhav",
    email: "madhav@haribol.com",
    phone: "1234567890",
    designation: "CEO",
  },
  {
    id: "2",
    name: "Gopal",
    email: "gopal@haribol.com",
    phone: "0123456789",
    designation: "HR",
  },
  {
    id: "3",
    name: "Damodar",
    email: "damodar@haribol.com",
    phone: "9876543210",
    designation: "Finance",
  },
  {
    id: "4",
    name: "Keshav",
    email: "keshav@haribol.com",
    phone: "9630147852",
    designation: "HR",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to YSL Company REST API!");
});

app.get("/ysl/employees", (req, res) => {
  res.send(emps);
});

app.get("/ysl/employees/:id", (req, res) => {
  const emp = emps.find(({ id }) => id === req.params.id);

  if (!emp) res.status(404).send("Not found!");
  res.send(emp);
});

app.post("/ysl/employees", (req, res) => {
  let emp = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dept: req.body.dept,
  };
  emps.push(emp);
  res.send(emp);
});

app.put("/ysl/employees/:id", (req, res) => {
  let emp = emps.find(({ id }) => id === req.params.id);
  if (!emp) res.status(404).send("Not found!");
  emp.id = req.body.id;
  emp.name = req.body.name;
  emp.email = req.body.email;
  emp.ln = req.body.ln;
  emp.phone = req.body.phone;
  emp.designation = req.body.designation;
  res.send(emp);
});

app.delete("/ysl/employees/:id", (req, res) => {
  const emp = emps.find(({ id }) => id === req.params.id);
  if (!emp) res.status(404).send("Not found!");

  const index = emps.indexOf(emp);
  emps.splice(index, 1);

  res.send(emp);
});

app.listen(port, () => {
  console.log(`\nThe server is running on port ${port}\n`);
});
