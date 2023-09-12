const {MongoClient} = require('mongodb');

const myDbName = 'MyBank';

const accountsList = [
    {
        accountNumber: 101,
        balance: 3450
    },
    {
        accountNumber: 102,
        balance: 4500
    },
    {
        accountNumber: 103,
        balance: 7800
    }
];

// clearing the accounts collection
async function cleanUpAccounts(client){
    const cleanUpAccounts = await client.db(myDbName).collection("accounts").deleteMany({});
    console.log(`${cleanUpAccounts.deletedCount} has been deleted`);
}


// clearing the accountChange collection
async function cleanUpAccountChange(client){
    const cleanUpAccounts = await client.db(myDbName).collection("accountChange").deleteMany({});
    console.log(`${cleanUpAccounts.deletedCount} has been deleted`);
}


// adding the accounts to the accounts collection   
async function createAccounts(client){
    const createAccounts = await client.db(myDbName).collection("accounts").insertMany(accountsList);
    console.log(`${createAccounts.insertCount} has been added to the account collection`)
}


// Subtracting amount from the sender account 
async function subtractFromAmount(client, accountNum, amount){
    const result = await client.db(myDbName).collection("accounts").updateOne(
        {accountNumber:accountNum},
        {$inc: {balance : - amount}});
    console.log(`the amount${amount} has been deposited from account ${accountNum}`);
}


// adding amount to the receiver account
async function addToAmount(client, accountNum, amount){
    const addToAmount = await client.db(myDbName).collection("accounts").updateOne(
        {accountNumber:accountNum},
        {$set: {balance :   amount}}); 
    console.log(`the amount${amount} has been added  to account ${accountNum}`);
}


// Writing the changes to accountChange
async function updateAccountChange (client, amount, sender, receiver){
    const count = await client.db(myDbName).collection("accounts").countDocuments();
    const insertChange = await client.db(myDbName).collection("accountChange").insertOne({
        changeNumber: count + 1,
        amount: amount,
        changeDate: new Date(),
        remark : `the amount ${amount} has been transferred from ${sender} to ${receiver}`
    });
}


module.exports = {cleanUpAccounts, cleanUpAccountChange, createAccounts, subtractFromAmount, addToAmount, updateAccountChange};