const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const myURL = 'mongodb+srv://molhamdatabase:1235812@databaseweek3.on73sc9.mongodb.net/';
const myDbName = 'Countries';
const myDbCollection = 'PopulationOverTime';

async function transferData(csvFilePath) {
  const client = new MongoClient(myURL);

  try {
    await client.connect(); 

    const collection = client.db(myDbName).collection(myDbCollection);

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        const documentation = {
          Country: row.Country,
          Year: parseInt(row.Year),
          Age: row.Age,
          M: parseInt(row.M),
          F: parseInt(row.F),
        };

        await collection.insertOne(documentation);
      })
      .on('end', async () => {
        console.log("Data importing completed");
        await client.close();
      })
  } catch (error) {
    console.error(`Error: ${error}`);
  } 
}


async function totalPopulation(countryName) {
    const client = new MongoClient(myURL);
  
    try {
      await client.connect();
      const collection = client.db(myDbName).collection(myDbCollection);
  
      const pipeline = [
        {
          $match: { Country: countryName }
        },
        {
          $group: {
            _id: '$Year',
            totalPopulation: {
              $sum: { $add: ['$M', '$F'] }
            }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ];
      
      const result = await collection.aggregate(pipeline).toArray();
      return result;
    } catch (error) {
      console.error(`Error: ${error}`);
      return [];
    } finally {
      await client.close();
    }
  }

  async function continentPopulation(year, age) {
    const client = new MongoClient(myURL);
  
    try {
      await client.connect();
      const collection = client.db(myDbName).collection(myDbCollection);
  
      const pipeline = [
        {
          $match: {
            Year: year,
            Age: age
          }
        },
        {
          $group: {
            _id: '$Continent',
            TotalPopulation: {
              $sum: { $add: ['$M', '$F'] }
            },
            Info: {
              $push: {
                Country: '$Country',
                M: '$M',
                F: '$F'
              }
            }
          }
        }
      ];
  
      const result = await collection.aggregate(pipeline).toArray();
      return result;
    } catch (error) {
      console.error(`Error: ${error}`);
      return [];
    } finally {
      await client.close();
    }
  }

// calling the function transferData 
const csvFilePath = './population_pyramid_1950-2022.csv';
transferData(csvFilePath);


// calling the function totalPopulation
totalPopulation('Netherlands')
.then((result)=>{
    console.log(result)
}).catch((err)=> {
    console.error(`Error: ${err}`);
});

// calling the function continentPopulation
continentPopulation(2020,'100+')
.then((result)=>{
    console.log(result)
}).catch((err)=> {
    console.error(`Error: ${err}`);
});