const dataBaseFunction = require('./transactions-insert-values');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});
connection.connect();

function transferMoney(depositingAccount, receivingAccount, amount, remark){
    connection.beginTransaction((error) => {
        if(error){
            console.log(`we couldn't connect the database because ${error}`);
        }
        try{
        dataBaseFunction.subtractAmountQuery(depositingAccount,amount);
        dataBaseFunction.addAmountQuery(receivingAccount, amount);
        dataBaseFunction.insertDataChanges(receivingAccount, amount, remark);
        

        connection.commit((err)=> {
            if(err){
                connection.rollback((err)=> {throw err;})
            }else{
                console.log(`Transaction with the amount${amount} has been made to account ${receivingAccount}`);
            }
        });
    }catch(err){
        connection.rollback((err)=> {
            console.log(`transaction failed: ${err}`);
        });
    }
    connection.end();
    });
}


transferMoney(101, 102, 1000, 'deposit');