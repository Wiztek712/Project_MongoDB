const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";  // MongoDB connection string (for local development)

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();

    // Print a confirmation message
    console.log("Connected successfully to MongoDB server");

    // Choose a database (will create the database if it does not exist)
    const database = client.db("mydatabase");

    // Choose a collection (will create the collection if it does not exist)
    const collection = database.collection("mycollection");

    // Example: Insert a document into the collection
    const document = { name: "John Doe", age: 30, job: "Software Developer" };
    const result = await collection.insertOne(document);
    console.log(`Document inserted with _id: ${result.insertedId}`);

    // Example: Find a document in the collection
    const query = { name: "John Doe" };
    const foundDocument = await collection.findOne(query);
    console.log("Found document:", foundDocument);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
