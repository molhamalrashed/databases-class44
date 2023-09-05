var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});

connection.connect();

connection.query(`USE transaction`);

function insertDataChanges(account_number, amount, remark){
const change_number = Math.floor(Math.random() * 10000000);
const change_date = new Date();
const insertDataChanges = `
INSERT INTO account_changes (change_number, account_number, amount, change_date, remark)
VALUES (?,?,?,?,?)
`;
connection.query(
    insertDataChanges,
    [change_number, account_number, amount, change_date, remark],
    (error) => {
      if (error) {
        console.log(`Error inserting data into account_changes: ${error}`);
      } else {
        console.log('Data has been inserted into the account_changes table');
      }
      connection.end();
    });
}

// the function to update the data in the account table
function subtractAmountQuery (account_number, amount){
    const subtractAmountQuery = `
    UPDATE account 
    SET balance = balance - ?
    WHERE account_number = ?
    `;
    connection.query(
        subtractAmountQuery,
        [amount, account_number],
        (error) => {
            if(error){
                console.log(`can't subtract ${amount} from account ${account_number} and the error is: ${error}`);
            }else {
                console.log(`${amount} has been subtracted from account ${account_number}`);
            }
            
        }
    )
}

function addAmountQuery (account_number, amount){
    const addAmountQuery = `
    UPDATE account 
    SET balance = balance + ?
    WHERE account_number = ?
    `;
    connection.query(
        addAmountQuery,
        [amount, account_number],
        (error) => {
            if(error){
                console.log(`can't add ${amount} to the account ${account_number} and the error is: ${error}`);
            }else {
                console.log(`${amount} has been added from account ${account_number}`);
            }
           
        }
    )
}

module.exports = {insertDataChanges, subtractAmountQuery, addAmountQuery};
