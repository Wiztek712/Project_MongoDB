const connect = require('./connection');

const [client, database, collection_player, collection_team] = await connect();

collection_player.find({
    birthDate: {
      $lt: {
        $dateSubtract: {
          startDate: "$$NOW",  // Actual date
          unit: "year",  // We will substract years
          amount: 25  // We substract 25 years
        }
      }
    }
  , position : "attaquant"})
