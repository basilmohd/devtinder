const mongoose = require('mongoose');

const connectMongoDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://basilmohd:Tg0AVfbjaZtMjQ9e@namastenode.xrtqyit.mongodb.net/devTinder"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = {connectMongoDb};


   