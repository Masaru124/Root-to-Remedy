const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/root_to_remedy';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected to database: ${mongoose.connection.host}`);
  } catch (err) {
    isMongoConnected = false;
    console.warn(`[MongoDB] Could not connect to MongoDB (${err.message}). Using in-memory database fallback.`);
  }
};

const getMongoStatus = () => isMongoConnected;

module.exports = { connectDB, getMongoStatus };
