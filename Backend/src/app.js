const express = require("express");
const { connectMongoDb } = require("./config/database");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing if needed
const User = require("./models/User"); // Assuming you have a User model defined
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation if needed
const cookieParser = require("cookie-parser"); // Import cookie-parser for handling cookies
const authenticateUser = require("./middleware/userAuth"); // Import the user authentication middleware

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies from request headers

app.post("/signup", async (req, res) => {
  // Handle user signup logic here
  console.log("Received signup request:", req.body);
try {
    const {firstName, lastName, emailId, password, age, gender} = req.body

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: passwordHash, // Make sure to hash the password before saving
        age: age,
        gender: gender
    });

    user.save().then(() => {
        res.status(201).json({ message: "User signed up successfully!" });
      }).catch((error) => {
        console.error("Error signing up user:", error);
        res.status(500).json({ message: "Error signing up user."+error.message });
      });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ message: "Internal server error."+ error.message });
  }
});

app.post("/login", async (req, res) => {
  // Handle user login logic here
    try {
        const { emailId, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Compare the provided password with the stored hashed password
        // Note: bcrypt.compare expects the plain text password and the hashed password
        const passwordHash = await user.comparePassword(password);
        if(!passwordHash) {
            return res.status(401).json({ message: "Invalid credentials." });            
        }
        // If the password matches, return a success response
        const jwtToken = await user.getJWT();
        console.log("Generated JWT Token:", jwtToken); // Log the generated token for debugging
        res.cookie("token", jwtToken,{
            maxAge: 1 * 24 * 60 * 60 * 1000, // Set cookie expiration to 1 days
        });
        res.status(200).json({ message: "Login successful!"});
        
    }
    catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
});

app.get("/profile", authenticateUser, async (req, res) => {
    try{          

        res.status(200).json(req.user); // Return the user profile
       
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
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
