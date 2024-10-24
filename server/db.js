import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { MongoClient, ServerApiVersion } from "mongodb";

// Connect to MongoDB
const client = new MongoClient(process.env.ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
});
try {
    await client.connect();
    await client.db("test").command({ ping: 1});
    console.log("Pinged deployment. Successfully connected to MongoDB.");
} catch(err) {
    console.log(err);
}

let db = client.db("test");
/*
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("It worked, connected to Railway MongoDB")
    } catch (error) {
        console.log("I'm sorry, mongodb error:", error.message);
    }
}
*/ 
export default db;





