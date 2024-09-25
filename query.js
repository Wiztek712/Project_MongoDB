// Query for finding players depending on their position and their birthdate

const connect = require('./connection');

async function findPlayerByAgeAndPosition(age_, position_){
  const [client, database, collection_player, collection_team, collection_match] = await connect();

  try {
    const currentDate = new Date();
    const birthDate_ = new Date(currentDate.setFullYear(currentDate.getFullYear() - age_)); // get the maximum birthdate to allow depending on the age

    const result = await collection_player.find({
      birthDate: { $gte: birthDate_ },
      position: position_
    }).toArray();

    console.log(result);
  } catch (error) {
    console.error("Error occurred while querying database:", error);
  } finally {
    await client.close();
  }
}

module.exports = findPlayerByAgeAndPosition;