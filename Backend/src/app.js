const express = require("express");
const { connectMongoDb } = require("./config/database");
const User = require("./models/User"); // Assuming you have a User model defined

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", (req, res) => {
  // Handle user signup logic here
  console.log("Received signup request:", req.body);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    password: req.body.password, // Make sure to hash the password before saving
    age: req.body.age,
    gender: req.body.gender,
  });

  try {
    user
      .save()
      .then(() => {
        res.status(201).json({ message: "User signed up successfully!" });
      })
      .catch((error) => {
        console.error("Error signing up user:", error);
        res.status(500).json({ message: "Error signing up user."+error.message });
      });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ message: "Internal server error."+ error.message });
  }
});

app.post("/user",async (req, res) => {
  // Handle fetching user data logic here
  try{
  const userEmail = req.body.emailId; // Assuming emailId is passed as a query parameter
  const user =  await User.find({ emailId: userEmail })
   if(user.length > 0) {
      res.status(200).json(user[0]); // Return the first user found
    }
    else {
      res.status(404).json({ message: "User not found." });
    }
  }
  catch (error) {
    console.error("Error fetching user:", error);
  }
   
});

app.patch("/user/:userId", async (req, res) => {
  // Handle updating user data logic here
  try {
    const ALLOWED_UPDATES = [
      "lastName",
      "password",
      "skills",
      "gender",
      "about",
      "photoUrl",
    ];

    // Filter the request body to only include allowed updates
    const updates = Object.keys(req.body).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!updates) {
      throw new Error("Invalid update fields provided.");
    }

    const userId = req.params?.userId; // Assuming emailId is used to identify the user
    const user = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true, // This will ensure that the update respects the schema validation
    });
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Update failed." + error.message });
  }
});


connectMongoDb()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
