const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token verification
const User = require("../models/User"); // Import the User model

async function authenticateUser(req, res, next) {
    const token = req.cookies.token; // Assuming the token is stored in cookies
    console.log("Token received:", token); // Log the token for debugging
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = await jwt.verify(token, "HelloNode@1234"); // Verify the token
        console.log("Decoded token:", decoded); // Log the decoded token for debugging
        const {_id} = decoded; // Extract user ID or other info from the decoded token
        const user = await User.findById(_id); // Find user by ID from the token
        if(!user) {
            throw new Error("Invalid token");
        }
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error); // Log the error for debugging
        return res.status(403).json({ message: "Invalid token"+error.message });
    }
}

module.exports = authenticateUser;