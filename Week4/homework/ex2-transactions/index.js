const {MongoClient} = require('mongodb');
const dataBaseFunction = require('./setup.js');

const myURL = 'mongodb+srv://molhamdatabase:1235812@databaseweek3.on73sc9.mongodb.net/';

async function main(){ 
    const client  = new MongoClient(myURL);
    try {
        await client.connect();
        await dataBaseFunction.cleanUpAccounts(client);
        await dataBaseFunction.cleanUpAccountChange(client);
        await dataBaseFunction.createAccounts(client);
    } catch(error) {
        console.error(error);
    } finally {
        client.close();
    }
}

async function transfer(fromAccount, toAccount, amount) {
    const client = new MongoClient(myURL);
  
    try {
      await client.connect();
  
      // Start a MongoDB transaction
      const session = client.startSession();
      session.startTransaction();
      
      
      await dataBaseFunction.subtractFromAmount(session, fromAccount, amount);
      await dataBaseFunction.addToAmount(session, toAccount, amount);
      await dataBaseFunction.updateAccountChange(session, amount, fromAccount, toAccount);
  
      // Commit the transaction
      await session.commitTransaction();
    } catch(error) {
        console.error(error);
    } finally {
        client.close();
    }
}
  
  
main().catch(console.error);
transfer(101,102,1000).catch(console.error);