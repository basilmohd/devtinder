const mongoose = require('mongoose');
const connectionurl = process.env.MONGODB_URI;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(
      connectionurl
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = { connectMongoDb };


