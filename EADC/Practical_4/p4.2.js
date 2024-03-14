let express = require("express");
let bodyParser = require("body-parser");
let app = express();

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/ysl/employees", (req, res) => {
  res.send(emps);
});

app.get("/ysl/employees/get", (req, res) => {
  const emp = emps.find(({ id }) => id == req.query.id);

  if (!emp) res.status(404).send("Not found!");
  else res.send(emp);
});

app.post("/ysl/employees/add", (req, res) => {
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

app.post("/ysl/employees/change", (req, res) => {
  let emp = emps.find(({ id }) => id === req.body.id);
  if (!emp) res.status(404).send("Not found!");
  else {
    emp.name = req.body.name;
    emp.email = req.body.email;
    emp.phone = req.body.phone;
    emp.designation = req.body.designation;
    res.send(emp);
  }
});

app.post("/ysl/employees/delete", (req, res) => {
  const emp = emps.find(({ id }) => id === req.body.id);
  if (!emp) res.status(404).send("Not Found!");
  else {
    const index = emps.indexOf(emp);
    emps.splice(index, 1);
    res.send(emp);
  }
});

app.listen(port, () => {
  console.log(`\nThe server is running on port ${port}\n`);
});
