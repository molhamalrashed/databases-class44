var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});

connection.connect();


// deleting the table every time we run the application so we can write it again
const deleteDatabase = `DROP DATABASE IF EXISTS transaction`;
connection.query(deleteDatabase, (error) => {
    if(error){
        console.log(`You have a problem deleting transaction database and the error is: ${error}`)
    } else {
    console.log("The database transaction has been deleted");
    }


// Creating the database publishing
const createDatabase = `CREATE DATABASE IF NOT EXISTS transaction`;
connection.query(createDatabase, (error) => {
    if(error){
        console.log(`You have a problem creating transaction database and the error is: ${error}`)
    } else {
    console.log("The database transaction has been created")
        }
    
    // Select the database publishing 
    connection.query(`USE transaction`);

    // creating account table 
    const createAccount = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT PRIMARY KEY,
        balance INT
    )`;
        connection.query(createAccount, (error) => {
            if(error) {
                console.log(`You have a problem creating account table and the error is: ${error}`)
            } else {
                console.log("The account table has been created")
            }

    // creating account_changes table 
    const createAccountChanges = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT,
        account_number INT,
        amount INT,
        change_date DATE,
        remark VARCHAR(250)
    )`;
        connection.query(createAccountChanges, (error) => {
            if(error) {
                console.log(`You have a problem creating account_changes table and the error is: ${error}`)
            } else {
                console.log("The account_changes table has been created")
            }

    
    const insertDataAccount = `
    INSERT INTO account (account_number, balance)
    VALUES 
     (101, 4300),
     (102, 5200),
     (103, 6200);
    `;
    connection.query(insertDataAccount,(error) => {
        if(error) {
            console.log(`You have a problem inserting account Data and the error is: ${error}`);
        }else{
            console.log("Data has been inserted to account table");
        }


    connection.end();
    });
   });
  });
 });
});