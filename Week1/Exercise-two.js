
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

connection.connect();

//Names of countries with population greater than 8 million
const query1 = "SELECT Name FROM country WHERE Population > 8000000";
connection.query(query1, (error, results) => {
  if (error) throw error;
  console.log("Countries with population greater than 8 million:");
  console.log(results);
});

//Names of countries that have "land" in their names
const query2 = "SELECT Name FROM country WHERE Name LIKE '%land%'";
connection.query(query2, (error, results) => {
  if (error) throw error;
  console.log("Countries with 'land' in their names:");
  console.log(results);
});

//Names of the cities with population in between 500,000 and 1 million
const query3 = "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000";
connection.query(query3, (error, results) => {
  if (error) throw error;
  console.log("Cities with population between 500,000 and 1 million:");
  console.log(results);
});



connection.end();
