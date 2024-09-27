const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URI);
        console.log("It worked, connected to Railway MongoDB")
    } catch (error) {
        console.log("I'm sorry, mongodb error:", error.message);
    }
}

module.exports = connectDB;





