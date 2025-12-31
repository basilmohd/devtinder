require('dotenv').config();
const express = require("express");
const { connectMongoDb } = require("./config/database");
const User = require("./models/User"); // Assuming you have a User model defined
const cookieParser = require("cookie-parser"); // Import cookie-parser for handling cookies
const authenticateUser = require("./middleware/userAuth"); // Import the user authentication middleware
const authRouter = require("./routes/authRouter"); // Import the authentication routes
const profileRouter = require("./routes/profileRouter"); // Import the profile routes
const connectionRouter = require("./routes/connectionRouter"); // Import the connection routes
const userRouter = require("./routes/userRouter"); // Import the user routes
const cors = require("cors");


const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies from request headers

app.use("/", authRouter); // Use the authentication routes
app.use("/profile", profileRouter); // Apply user authentication middleware to profile routes
app.use("/request", connectionRouter); // Apply user authentication middleware to connection routes
app.use("/user", userRouter); // Apply user authentication middleware to user routes





connectMongoDb()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
