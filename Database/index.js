import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
// MongoDB connection string
const uri = process.env.URI;
console.log(uri);

// Create a new MongoClient instance
const client = new MongoClient(uri);

const connectToMongoDB = async () => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Export the client for use in controllers
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectToMongoDB;