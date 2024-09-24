const connect = require('./connection');

const [client, database, collection_player, collection_team] = await connect();

const playersAtLeast = [];

