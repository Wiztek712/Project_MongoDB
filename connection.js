async function connect() {
    const { MongoClient, ObjectId } = require('mongodb');

    const uri = "mongodb://localhost:27017";  // MongoDB connection string

    const client = new MongoClient(uri);

    try {
    // Connect to MongoDB
    await client.connect();

    // Print a confirmation message
    console.log("Connected successfully to MongoDB server");

    const database = client.db("project");
    const collection_player = database.collection("Players");
    const collection_team = database.collection("Teams");
    const collection_match = database.collection("Matches");

    return [client, database, collection_player, collection_team, collection_match]

    } catch (error) {
    console.error("Error occurred while connecting:", error);
    }
}

module.exports = connect;