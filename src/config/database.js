const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/dybook'; // Change this URI according to your MongoDB setup

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('dybook');
        // You can now perform operations on your database
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


module.exports = { connectToMongoDB };
