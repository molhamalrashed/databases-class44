require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");


const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const result = await client.db('databaseWeek3').collection('bob_ross_episodes').insertOne({
    EPISODE:'S09E13',
    TITLE: 'MOUNTAIN HIDE-AWAY',
    ElEMENTS: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
  })

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  
  const result = await client.db('databaseWeek3').collection('bob_ross_episodes').findOne({
    EPISODE:'S02E02'
  })
  const title = result? result.TITLE : "Episode is not found";
  console.log(
    `The title of episode 2 in season 2 is ${title}`
  );

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const season = await client.db('databaseWeek3').collection('bob_ross_episodes').findOne({
    TITLE:"BLACK RIVER"
  })
   const episode = season? season.EPISODE : "the episode is not found"
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${episode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  const cliffEpisodes = await client.db('databaseWeek3').collection('bob_ross_episodes').findMany({
    CLIFF:1
  }).toArray();
  console.log("The episodes that Bob Ross painted a CLIFF are:");
  cliffEpisodes.forEach(episode => {
  console.log(episode.EPISODE);
  });

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const  lightHouseEpisodes = await client.db('databaseWeek3').collection('bob_ross_episodes').findMany({
    CLIFF:1,
    LIGHTHOUSE : 1,
    NIGHT: 1
  }).toArray();
  console.log("The episodes that Bob Ross painted a CLIFF are:");
  lightHouseEpisodes.forEach(episode => {
  console.log(episode.EPISODE);
  });
}

async function updateEpisodeExercises(client) {
  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  const  result = await client.db('databaseWeek3').collection('bob_ross_episodes').updateOne(
    {EPISODE : "S30E13"},
    {$set :{TITLE:"BLUE RIDGE FALLS"}}
  )
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.EPISODE} episodes`
  );


  const  bush = await client.db('databaseWeek3').collection('bob_ross_episodes').updateMany(
    {BUSHES : {$exists: true}},
    {$rename : {"BUSHES":"BUSH"}}
  )

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${bush.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  
  const  result = await client.db('databaseWeek3').collection('bob_ross_episodes').deleteOne(
    {EPISODE:"S31E14"}
  )
  console.log(
    `Ran a command to delete episode and it deleted ${result.EPISODE} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
