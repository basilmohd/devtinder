const mongoose = require('mongoose');

const connectMongoDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@namastenode.xrtqyit.mongodb.net/devTinder"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = {connectMongoDb};


   