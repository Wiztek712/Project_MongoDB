const connect = require('./connection');

const [client, database, collection_player, collection_team, collection_match] = await connect();

const playersAtLeast = [];

