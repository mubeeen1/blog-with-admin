import { MongoClient } from 'mongodb';

const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

export async function connectToDatabase() {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db('your_database_name'); // Replace with your database name
}
