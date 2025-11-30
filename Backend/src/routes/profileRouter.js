const profileRouter = require("express").Router();
const authenticateUser = require("../middleware/userAuth");
const User = require("../models/User");
const bcrypt = require("bcrypt");

profileRouter.get("/view", authenticateUser, async (req, res) => {
  try {
    const { firstName, lastName, skills, age, gender, about, photoUrl, emailId } =
      req.user;
   
    
    res.status(200).json({ firstName, lastName, skills, age, gender, about, photoUrl, emailId }); // Return the user profile
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error." + error.message });
  }
});

profileRouter.patch("/update", authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    console.log("Update request body:", req.body); // Log the request body for debugging
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "skills",
      "age",
      "gender",
      "about",
      "photoUrl",
    ];

    const updates = Object.keys(req.body).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if(!updates){
        return res.status(400).json({ message: "Invalid update fields provided." });
    }

    const updatedUser =  await User.findByIdAndUpdate(user._id,req.body, {
      runValidators: true, // This will ensure that the update respects the schema validation
    });

    res.status(200).json({ 
      message: "User updated successfully!" ,
      data: req.body
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error." + error.message });
  }
});

profileRouter.patch("/resetPassword", authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required." });
    }

    // Check if the current password matches
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    // Update the password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });

  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error." + error.message });
  }
});

module.exports = profileRouter;
