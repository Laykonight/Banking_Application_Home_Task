const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to the database');

    const database = client.db(dbName);
    const collection = database.collection('documents');

    // Insert a document
    await collection.insertOne({ _id: '12345', name: 'John', age: 300 });
    // await collection.insertOne({ name: 'John', age: 15 });

    // Find documents
    const query = { name: 'John' };
    const result = await collection.findOne(query);
    console.log("result: ", result);

  } finally {
    // Close the connection when you're done
    await client.close();
  }
}

main().catch(console.error);
