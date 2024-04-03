var ibmdb = require("ibm_db");

function createTable(conn) {
    conn.query("CREATE TABLE employees( EmployeeID int primary key not null, FirstName VARCHAR(25), LastName VARCHAR(25), Department VARCHAR(20), Salary decimal(10))",
        function (err, data) {
            if (err) console.log(err);
            console.log(data);
            if (data) console.log('\n\tEmployee Table created successfully!\n');
        });
}
// add function to get all current details stored in the table
function getEmployees(conn) {
    conn.query("SELECT * FROM employees",
        function (err, data) {
            if (err) console.log(err);
            console.log(data);
        });
}

function insertEmployee(conn, employee) {
    conn.query(`INSERT INTO employees (EmployeeID, FirstName, LastName, Department, Salary) VALUES (${employee.EmployeeID}, '${employee.FirstName}', '${employee.LastName}', '${employee.Department}', ${employee.Salary})`,
        function (err, data) {
            if (err) console.log(err);
            console.log(data);
        });
}

function updateSalary(conn, salary, employeeId) {
    conn.query(`UPDATE employees SET Salary = ${salary} WHERE EmployeeID = ${employeeId}`,
        function (err, data) {
            if (err) console.log(err);
            console.log(data);
        });
}

function deleteEmployee(conn, employeeId) {
    conn.query(`DELETE FROM employees WHERE EmployeeID = ${employeeId}`,
        function (err, data) {
            if (err) console.log(err);
            console.log(data);
        });
}

function dropEmployeesTable(conn) {
    conn.query("DROP TABLE employees",
        function (err, data) {
            if (err) console.log(err);
            console.log(data);
        });
}

ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn) {
    if (err) return console.log(err);

    // createTable(conn);
    // insertEmployee(conn, {EmployeeID: 1, FirstName: 'John', LastName: 'Doe', Department: 'Sales', Salary: 50000});
    // insertEmployee(conn, {EmployeeID: 2, FirstName: 'Jane', LastName: 'Doe', Department: 'Marketing', Salary: 60000});
    // insertEmployee(conn, {EmployeeID: 3, FirstName: 'Jim', LastName: 'Doe', Department: 'HR', Salary: 70000});
    // getEmployees(conn);
    // updateSalary(conn, 70000, 1);
    // deleteEmployee(conn, 3);
    // dropEmployeesTable(conn);
});