
// var ibmdb = require("ibm_db");

// ///// Create Table
// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("CREATE TABLE yslcust( f_name VARCHAR(20), l_name VARCHAR(25), email_id VARCHAR(40), mobile_number VARCHAR(20))", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });







////INSERT SINGLE

// var ibmdb = require("ibm_db");

// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("INSERT INTO wqy86844.yslcust(f_name, l_name, email_id, mobile_number) VALUES('Ram','Raghav','sriram@ayodhya.dham','9876543210')", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });






// //Insert multiple

// var ibmdb = require("ibm_db");

//  ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("INSERT INTO wqy86844.yslcust (f_name, l_name, email_id, mobile_number) VALUES('Krishna','Yadav','krishna@vrindavan.dham','1234567890'),('Narsimha','Dev','narsimha@simhachalam.dham','1478523690')", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });












////Search by filter
// var ibmdb = require("ibm_db");

// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("SELECT * FROM wqy86844.yslcust WHERE f_name='Ram'", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });






////update any value

// var ibmdb = require("ibm_db");


// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("UPDATE wqy86844.yslcust SET f_name= 'SriRam', mobile_number= '7894561230' WHERE l_name='Raghav'", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });










///////////drop a particular reading

// var ibmdb = require("ibm_db");


// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("DELETE FROM wqy86844.yslcust WHERE f_name='Narsimha'", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });










////////////drop particular column

// var ibmdb = require("ibm_db");


// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("ALTER TABLE wqy86844.yslcust DROP COLUMN mobile_number", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });








////////////drop table

// var ibmdb = require("ibm_db");


// ibmdb.open("DRIVER={DB2};HOSTNAME=764264db-9824-4b7c-82df-40d1b13897c2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;UID=wqy86844;PWD=eZ9Ty8b5qzelVv1z;PORT=32536;DATABASE=bludb;PROTOCOL=TCPIP;SECURITY=SSL", function (err, conn){

//   if (err) return console.log(err);

//   conn.query("DROP TABLE wqy86844.yslcust", function (err, data) {

//     if (err) console.log(err);

//     console.log(data);

//     conn.close(function () {
//       console.log('done');
//     });

//   });

// });
