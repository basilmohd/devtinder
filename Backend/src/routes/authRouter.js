const express = require("express")
const authRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
  // Handle user logout logic here
  try {
    res.clearCookie("token"); // Clear the token cookie
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error("Error in logout route:", error);
    res.status(500).json({ message: "Internal server error." + error.message });
  }
});

module.exports = authRouter;
